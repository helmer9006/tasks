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
const PORT = process.env.PORT || 8000;

//IMPORTANDO RUTAS

app.use('/api/usuarios', require('./routes/usuarios'));

//AUTENTICACION
app.use('/api/auth', require('./routes/auth'));

//PROYECTOS
app.use('/api/proyectos', require('./routes/proyectos'));

//TAREAS
app.use('/api/tareas', require('./routes/tareas'));


//#region INICIALIZACION DE SERVER - PUERTO

app.listen(PORT, () => {
  console.log(`server iniciado, en el puerto...${PORT}`);
});

//#endregion
