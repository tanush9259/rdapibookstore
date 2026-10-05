const express = require('express');
const AvailabilityController = require('../controllers/AvailabilityController');

const route = express.Router();

route.post('/add/availability', (req, res) => {
    AvailabilityController.createAvailability(req, res);
});

route.get('/availability', (req, res) => {
    AvailabilityController.getAvailability(req, res);
});

route.post('/add/all/availability', (req, res) => {
    AvailabilityController.createAllAvailability(req, res);
});

route.delete('/delete/availability/:id', (req, res) => {
    AvailabilityController.deleteAvailability(req, res);
});

route.get('/availability/for/edit/:id', (req, res) => {
    AvailabilityController.getAvailabilityForEdit(req, res);
});

route.put('/edit/availability/:id', (req, res) => {
    AvailabilityController.editAvailability(req, res);
});

module.exports = route;