const express = require('express');
const router = express.Router();

const { fetchAllOrders, fetchAllUnloadedOrders } = require('../services/orders');

// GET /orders
router.get('/', async (req, res) => {
  const orders = await fetchAllOrders();
  res.json(orders);
});

// GET /orders/unloaded
router.get('/unloaded', async (req, res) => {
  const unloadedOrders = await fetchAllUnloadedOrders();
  res.send(unloadedOrders);
});

module.exports = router;
