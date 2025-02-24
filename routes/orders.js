const express = require('express');
const router = express.Router();

const { fetchAllOrders, fetchAllUnloadedOrders } = require('../services/orders');

// GET /orders
router.get('/', async (req, res) => {
  const orders = await fetchAllOrders().catch((error) => {
    console.error('Error fetching orders:', error.stack);
    res.status(500).json({ message: 'Error fetching orders' });
  });
  res.json(orders);
});

// GET /orders/unloaded
router.get('/unloaded', async (req, res) => {
  const unloadedOrders = await fetchAllUnloadedOrders().catch((error) => {
    console.error('Error fetching unloaded orders:', error.stack);
    res.status(500).json({ message: 'Error fetching unloaded orders' });
  });
  res.send(unloadedOrders);
});

module.exports = router;
