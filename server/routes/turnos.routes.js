const TurnosController = require('../controllers/turno.controller');

module.exports = app => {

  //rutas para el user
  app.get('/api/turnos', TurnosController.findAllTurnos);
  app.get('/api/turnos/:id/detalles', TurnosController.findDetallesForTurno);
  app.put('/api/turnos/:turnoId/detalles/:detalleId', TurnosController.updateDetalleForTurno);

  //rutas para el owner
  app.post('/api/turnos', TurnosController.createNewTurno);
  app.post('/api/turnos/:id/detalles', TurnosController.createNewDetalleForTurno);
  app.delete('/api/turnos/:id', TurnosController.deleteAnExistingTurno);
};