const mongoose = require("mongoose");

const TareaSquema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    trim: true,
  },
  estado: {
    type: Boolean,
    default: false,
  },
  fecha_reg: {
    type: Date,
    default: Date.now(),
  },

  proyecto: {
    type: mongoose.Schema.Types.ObjectId, //para relacion con id del modelo proyecto relacionado id
    ref: "Proyecto",
  },
});

module.exports = mongoose.model("Tarea", TareaSquema);
