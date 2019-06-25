const express = require('express');
const api = express.Router();

const controller = require('../controllers/player');

// - Endpoints -
// CRUD
api.post('/player', controller.Create);
api.put('/player/:id', controller.Update);
api.delete('/player/:id', controller.Delete);
api.get('/player', controller.GetAll);
api.get('/player/:id', controller.GetById);

// Queries Misc

module.exports = api;