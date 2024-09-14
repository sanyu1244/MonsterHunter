const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');

// Configuración global de oracledb
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;
oracledb.fetchAsString = [oracledb.CLOB];

const app = express();
const port = 5000;

app.use(cors());

// Configuración de la base de datos
const dbConfig = {
  user: 'MonsterHunter',
  password: '123',
  connectString: 'localhost:1521/XE'
};

// Función para manejar referencias circulares en JSON
function manejarReferenciasCirculares() {
  const cache = new WeakSet();
  return (key, value) => {
    if (value === null) return null;
    if (typeof value === "object" && value !== null) {
      if (cache.has(value)) {
        return;
      }
      cache.add(value);
    }
    return value;
  };
}

// Función para procesar los resultados de la consulta

async function procesarResultados(datos) {
  return datos.map(row => {
    const newRow = {};
    for (let key in row) {
      if (row[key] && typeof row[key] === 'object' && row[key].constructor.name === 'Lob') {
        // Para CLOBs
        newRow[key] = row[key].toString();
      } else {
        newRow[key] = row[key];
      }
    }
    return newRow;
  });
}

// Ruta para obtener los monstruos
app.get('/api/monstruos', async (req, res) => {
  let connection;
  try {
    // Establecer conexión con la base de datos
    connection = await oracledb.getConnection(dbConfig);
    console.log('Conexión establecida:', dbConfig);

    // Ejecutar la consulta SQL modificada
    const result = await connection.execute(`
      SELECT 
         m.id_monstruo,
         m.nombre AS nombre_monstruo,
         tm.nombre_tipo AS tipo_monstruo,
         m.tamaño,
         m.nivel_amenaza,
         m.debilidades,
         m.estados,
         m.rango,
         l.nombre AS localizacion,
         e_resistencia.nombre_elemento AS elemento_resistencia,
         mat.nombre AS material,
         CASE 
           WHEN im.img_monstruo IS NOT NULL THEN 
             CASE 
               WHEN DBMS_LOB.FILEEXISTS(im.img_monstruo) = 1 THEN 'Existe'
               ELSE 'No existe'
             END
           ELSE 'No hay imagen'
         END AS img_estado,
         DBMS_LOB.GETLENGTH(im.img_monstruo) AS img_tamaño,
         TO_CHAR(m.descripcion) AS descripcion_monstruo
      FROM 
        monstruos m
      LEFT JOIN tipos_monstruo tm ON m.id_tipo = tm.id_tipo
      LEFT JOIN monstruos_localizaciones ml ON m.id_monstruo = ml.id_monstruo
      LEFT JOIN localizaciones l ON ml.id_localizacion = l.id_localizacion
      LEFT JOIN monstruos_elementos me_resistencia ON m.id_monstruo = me_resistencia.id_monstruo AND me_resistencia.tipo_relacion = 'resistencia'
      LEFT JOIN elementos e_resistencia ON me_resistencia.id_elemento = e_resistencia.id_elemento
      LEFT JOIN monstruos_materiales mm ON m.id_monstruo = mm.id_monstruo
      LEFT JOIN materiales mat ON mm.id_material = mat.id_material
      LEFT JOIN img_monstruos im ON m.id_img = im.id_img
      ORDER BY m.nombre
    `);
    console.log('Consulta ejecutada');

    // Procesar los resultados
    const datos = await procesarResultados(result.rows);
    console.log('Datos procesados');

    // Enviar la respuesta JSON
    res.json(JSON.parse(JSON.stringify(datos, manejarReferenciasCirculares())));

  } catch (err) {
    console.error('Error:', err);
    
    // Manejo de errores
    if (err && err.errorNum) {
      if (err.errorNum === 12541) {
        res.status(503).json({ error: 'Error de conexión a la base de datos', details: err.message });
      } else {
        res.status(500).json({ error: 'Error en la consulta de la base de datos', details: err.message });
      }
    } else {
      res.status(500).json({ error: 'Error interno del servidor', details: err.message });
    }
  } finally {
    // Cerrar la conexión
    if (connection) {
      try {
        await connection.close();
        console.log('Conexión cerrada');
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
});

// Ruta para obtener la imagen de un monstruo específico
app.get('/api/monstruos/:id/imagen', async (req, res) => {
  console.log(`Solicitando imagen para el monstruo ID: ${req.params.id}`);
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    
    const result = await connection.execute(`
      DECLARE
        l_bfile BFILE;
        l_blob BLOB;
      BEGIN
        SELECT im.img_monstruo INTO l_bfile
        FROM img_monstruos im
        JOIN monstruos m ON m.id_img = im.id_img
        WHERE m.id_monstruo = :id;
        
        DBMS_LOB.CREATETEMPORARY(l_blob, TRUE);
        DBMS_LOB.FILEOPEN(l_bfile, DBMS_LOB.FILE_READONLY);
        DBMS_LOB.LOADFROMFILE(l_blob, l_bfile, DBMS_LOB.GETLENGTH(l_bfile));
        DBMS_LOB.FILECLOSE(l_bfile);
        
        :blob := l_blob;
      END;
    `, {
      id: req.params.id,
      blob: { type: oracledb.BLOB, dir: oracledb.BIND_OUT }
    }, { autoCommit: true });

    if (result.outBinds.blob) {
      console.log('Imagen encontrada, enviando...');
      const imageBuffer = await result.outBinds.blob.getData();
      res.contentType('image/png'); // Ajusta según el tipo real de tu imagen
      res.send(imageBuffer);
    } else {
      console.log('Imagen no encontrada en la base de datos');
      res.status(404).send('Imagen no encontrada');
    }
  } catch (err) {
    console.error('Error al obtener la imagen:', err);
    res.status(500).json({ error: 'Error al obtener la imagen', details: err.message });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});