const { query } = require('express');
const mysql = require('mysql');
const Persona = require('./Persona');

require('dotenv').config();
const conexionConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
}
async function insertarPersona(persona) {
  const { idpersona, nombres, apellidos, cedula, correo, edad, genero, ciudad, pais, cursos, telefono, fecha_registro } = persona;
  const pNew = new Persona(idpersona, nombres, apellidos, cedula, correo, edad, genero, ciudad, pais, cursos, telefono, fecha_registro);
  queryEj = 'INSERT INTO persona (idpersona,nombre, apellidos, cedula, correo, edad, genero, ciudad, pais, cursos, telefono, fecha_registro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)';
  values = [pNew.idpersona, pNew.nombres, pNew.apellidos, pNew.cedula, pNew.correo, pNew.edad, pNew.genero, pNew.ciudad, pNew.pais, pNew.cursos, pNew.telefono, pNew.fecha_registro]
  var response = await ejecutarQueryDB(queryEj, values);
  return response;

}
const consultarPersonas = async () => {
  var queryEj = 'SELECT * FROM persona';
  var resultados = await ejecutarQueryConsultaDB(queryEj);
  console.log(resultados);

  return resultados;
}

const ejecutarQueryConsultaDB = async (query) => {
  return new Promise((resolve, reject) => {
    const conexion = mysql.createConnection(conexionConfig);
    conexion.connect();
    conexion.query(query, (error, results, fields) => {
      if (error) {
        console.error('Error al ejecutar la consulta: ' + error.stack);
        reject('Error al ejecutar la consulta');
      }
      const personas = [];
      for (const row of results) {
        const person = new Persona(row.idpersona, row.nombre, row.apellidos, row.cedula, row.correo, row.edad, row.genero, row.ciudad, row.pais, row.cursos, row.telefono, row.fecha_registro);
        personas.push(person);
      }
      resolve(personas);
      conexion.end();
    });
  });
}

async function ejecutarQueryDB(query, datos) {
  return new Promise((resolve, reject) => {
    const conexion = mysql.createConnection(conexionConfig);
    conexion.connect();
    conexion.query(query, datos, (error, resultados, campos) => {
      if (error) {
        console.error('Error al insertar un nueva persona: ' + error.stack);
        reject('Error al insertar una nueva persona');
      }
      console.log('Nueva persona insertado con éxito');
      resolve('Nueva persona insertado con éxito');
      conexion.end();
    });
  });


}
module.exports = { insertarPersona, consultarPersonas };
