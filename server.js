const express = require("express");
const app = express();
const Persona = require('./Persona');
const db = require('./db');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { response } = require("express");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.post('/login', (req, res) => {
    // Aquí verificaríamos las credenciales del usuario y si son válidas:
    const { user, password } = req.body;
    const usuario = { user: 'juan', passwd: '12345' };
    if (user == usuario.user && password == usuario.passwd) {
        const token = jwt.sign(usuario, 'secreto');
        res.json({ token });
    } else {
        error = 'credenciales invalidas'
        res.json({ error });
    }
});

function verificaToken(req, res, next) {
    // Verificar si se envió un token en el header
    const token = req.headers.authorization;

    // Verificar si el token es válido
    jwt.verify(token, 'secreto', (error, decoded) => {
        if (error) {
            return res.status(401).json({ mensaje: 'Token inválido' });
        } else {
            req.usuario = decoded.usuario;
            next();
        }
    });
}


app.post("/registro", verificaToken, async function (req, res) {
    const { nombres, apellidos, cedula, correo, edad, genero, ciudad, pais, cursos, telefono, fecha_registro } = req.body;
    const persona = new Persona(null, nombres, apellidos, cedula, correo, edad, genero, ciudad, pais, cursos, telefono, fecha_registro);
    console.log(persona);
    try {
        var response = await db.insertarPersona(persona);
        console.log(response);
        res.json({ response });
        res.status(200);

    } catch (error) {
        var response = "Error al insertar registro"
        res.json({ response });
        res.status(409);

    }

});

app.get("/leads", verificaToken, async function (req, res) {
    try {
        const personas = await db.consultarPersonas();
        if (personas != null) {
            res.json(personas);
            res.status(200);
            personas=  res.json(personas);
        }
    } catch (error) {
        var response = "Error al consultar registros"
        res.json({ response });
        res.status(409);

    }


});

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000')
})
