const express = require("express");
const conectarDB = require("./config/db");
const cors = require('cors');

//crear el servidor
const app = express();

//conectar a la base de datos
conectarDB();

//habilitar cors 
app.use(cors());

//habilitar express.json
app.use(express.json({extended: true}))


//Puerto de la app
const port = process.env.port || 8000;

//IMPORTANDO RUTAS

app.use('/api/usuarios', require('./routes/usuarios'));

//AUTENTICACION
app.use('/api/auth', require('./routes/auth'));

//PROYECTOS
app.use('/api/proyectos', require('./routes/proyectos'));

//TAREAS
app.use('/api/tareas', require('./routes/tareas'));


//#region INICIALIZACION DE SERVER - PUERTO
//0.0.0.0 para que el dominio lo asigne heroku
app.listen(port, '0.0.0.0', () => {
  console.log(`server iniciado, en el puerto...${port}`);
});

//#endregion
