const express = require('express');
const router = express.Router();

const orders = require('./orders');
const departures = require('./departures');
const scheduler = require('./scheduler');

router.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

router.use('/orders', orders);
router.use('/departures', departures);
router.use('/scheduleOrders', scheduler);

module.exports = router;
