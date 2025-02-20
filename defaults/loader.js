const { readJsonFile } = require('../utils/fileReader');
const { clearAllDepartures, addNewDeparture } = require('../services/departures');
const { clearAllOrders, addNewOrder } = require('../services/orders');

// Read data from JSON files
const defaultOrders = 'defaults/PES_Ordes.json';
const defaultSchedules = 'defaults/PES_FreightSchedule.json';

// Get orders and schedules
const ordersJson = readJsonFile(defaultOrders);
const schedulesJson = readJsonFile(defaultSchedules);

// Clear all orders and departures
clearAllOrders();
clearAllDepartures();

// Load into DB orders and departures
ordersJson.forEach((order) => {
  const { OrderNumber, Destination } = order;
  addNewOrder(OrderNumber, Destination);
});

schedulesJson.forEach((schedule) => {
  const { DepartingLocation, ArrivalLocation, Day } = schedule;
  addNewDeparture(DepartingLocation, ArrivalLocation, Day);
});

module.exports = () => {
  console.log('Data loaded successfully.');
}