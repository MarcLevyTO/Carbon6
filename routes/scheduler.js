const express = require('express');
const router = express.Router();

const { 
  fetchAllUnloadedOrders, 
  setDepartureId,
  getCountOrdersByDepartureIds,
} = require('../services/orders');

const { fetchAllDepartures } = require('../services/departures');

const MAX_LOAD_SIZE = 25;

// POST /scheduleOrders
router.post('/', async (req, res) => {
  const unloadedOrders = await fetchAllUnloadedOrders();
  let loadedCount = 0;

  // Sort orders by location
  const ordersByLocation = {};
  unloadedOrders.forEach((order) => {
    if (ordersByLocation[order.destination]) {
      ordersByLocation[order.destination].push(order);
    } else {
      ordersByLocation[order.destination] = [order];
    }
  });

  // Get all valid departures
  const departures = await fetchAllDepartures();

  // Get count of how many orders are already loaded into each departure
  const countByDepartures = await getCountOrdersByDepartureIds(departures.map((departure) => departure.id));
  
  // Set remaining orders that can be loaded to each departure
  countByDepartures.forEach((countByDeparture) => {
    const departure = departures.find((departure) => departure.id === countByDeparture.departure_id);
    departure.count = countByDeparture.count;
  });

  // For each location
  for(const location of Object.keys(ordersByLocation)) {
    const departuresByLocation = departures.filter((departure) => departure.arrival_location === location);

    // Fetch count of orders already loaded for each departure
    departuresByLocation.forEach((departure) => {
      const { count } = departure;
      const remaining = MAX_LOAD_SIZE - count;

      // Set aside orders to load into a specific departure
      const toLoad = ordersByLocation[location].slice(0, remaining);

      // Remove orders from the list
      ordersByLocation[location].splice(0, remaining);
      
      // Update the orders with the departure ID
      toLoad.forEach((order) => {
        // Update the database with the departure ID
        setDepartureId(order.id, departure.id);
        order.departure_id = departure.id;
        loadedCount++;
      });
    });
  };

  res.send({ loaded: loadedCount, remaining: unloadedOrders.length - loadedCount });
});

module.exports = router;
