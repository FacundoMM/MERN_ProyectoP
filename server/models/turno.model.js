const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const DetallesSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    hour: {
        type: String,
        required: true
    },
    user: {
        type: String,
        default: ""
    } 
});

const TurnosSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: [3, 'Debe tener al menos 3 caracteres']
    },
    area: {
        type: String,
        minlength: [3, 'Debe tener al menos 3 caracteres'],
        required: true 
    },
    detalles: [DetallesSchema]
});

TurnosSchema.plugin(uniqueValidator);
DetallesSchema.plugin(uniqueValidator)

const TurnosModel = mongoose.model("Turnos", TurnosSchema);
const DetallesModel= mongoose.model("Detalles", DetallesSchema)

module.exports = {TurnosModel, DetallesModel};
