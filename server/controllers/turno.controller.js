const { TurnosModel, DetallesModel } = require("../models/turno.model");

//Encuentra todos los turnos
module.exports.findAllTurnos = (req, res) => {
    TurnosModel.find()
        .then(allDaTurno => res.json({ turnos: allDaTurno }))
        .catch(err => res.status(500).json({ message: "Something went wrong with turnos", error: err }));
};

//Encuentra todos los detalles que tiene un codigo
module.exports.findDetallesForTurno = (req, res) => {
    TurnosModel.findById(req.params.id)
        .then(turno => {
            if (!turno) {
                return res.status(404).json({ message: "Turno not found" });
            }
            return res.json({ detalles: turno.detalles });
        })
        .catch(err => res.status(500).json({ message: "Something went wrong with turnos", error: err }));
};

//Crea un nuevo turno
module.exports.createNewTurno = (req, res) => {
    TurnosModel.create(req.body)
        .then(newlyCreatedTurno => res.status(201).json({ turno: newlyCreatedTurno }))
        .catch(err => res.status(500).json({ message: "Something went wrong with turnos", error: err }));
};


//Crea detalles para un turno en espescifico 
module.exports.createNewDetalleForTurno = (req, res) => {
    TurnosModel.findById(req.params.id)
        .then(turno => {
            if (!turno) {
                return res.status(404).json({ message: "Turno not found" });
            }
            const detalle = new DetallesModel(req.body);
            turno.detalles.push(detalle);
            return turno.save();
        })
        .then(savedTurno => res.status(201).json({ turno: savedTurno }))
        .catch(err => res.status(500).json({ message: "Something went wrong with turnos", error: err }));
};

//Agrega el id del usuario que adquirio el turno (ARREGLAR)
module.exports.updateDetalleForTurno = (req, res) => {
    TurnosModel.findOneAndUpdate(
        { _id: req.params.turnoId, "detalles._id": req.params.detalleId },
        { $set: { "detalles.$.user": req.body.user } },
        { new: true }
    )
        .then(updatedTurno => {
            if (!updatedTurno) {
                return res.status(404).json({ message: "Turno or Detalle not found" });
            }
            return res.json({ turno: updatedTurno });
        })
        .catch(err => res.status(500).json({ message: "Something went wrong with turnos", error: err }));
};

//Elimina el turno
module.exports.deleteAnExistingTurno = (req, res) => {
    TurnosModel.findByIdAndDelete(req.params.id)
        .then(result => {
            if (!result) {
                return res.status(404).json({ message: "Turno not found" });
            }
            return res.json({ result: "Turno deleted successfully" });
        })
        .catch(err => res.status(500).json({ message: "Something went wrong with turnos", error: err }));
};
