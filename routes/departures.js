const express = require('express');
const router = express.Router();

const { fetchAllDepartures, fetchDeparture } = require('../services/departures');
const { fetchOrdersByDepartureId } = require('../services/orders');

// GET /departures
router.get('/', async (req, res) => {
  const departures = await fetchAllDepartures();
  res.json(departures);
});

// GET /departures/:departureId
router.get('/:departureId', async (req, res) => {
  const departures = await fetchDeparture(req.params.departureId);
  if (departures.length === 0) {
    return res.status(404).json({ message: 'Departure not found' });
  }

  const departure = departures[0];
  const orders = await fetchOrdersByDepartureId(req.params.departureId);
  departure.orders = orders;
  res.json(departure);
});

module.exports = router;
