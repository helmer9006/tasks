const mongoose = require("mongoose");

const ProyectoSquema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    trim: true,
  },
  creador: {
    type: mongoose.Schema.Types.ObjectId, //para relacion con id del modelo usuario - creador
    ref: "Usuario",
  },
  fecha_reg: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Proyecto", ProyectoSquema);
