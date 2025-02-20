const connection = require('../db');

// Deletes all orders from the database
const clearAllOrders = async () => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM orders';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error clearing orders:', error.stack);
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};

// Fetches all orders from the database
const fetchAllOrders = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM orders';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching orders:', error.stack);
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};

// Fetches all orders from the database where departure_id is defined
const fetchOrdersByDepartureId = (departureId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM orders where departure_id = ?';
    const values = [departureId];
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error fetching orders:', error.stack);
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};

// Fetches all orders that have not been loaded onto a departure
const fetchAllUnloadedOrders = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM orders where departure_id IS NULL';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching orders:', error.stack);
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};

// Adds a new order to the database
const addNewOrder = (orderNumber, destination) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO orders (order_number, destination) VALUES (?, ?)';
    const values = [orderNumber, destination];

    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error adding order:', error.stack);
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};

// Sets the departure ID for an order
const setDepartureId = (orderId, departureId) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE orders SET departure_id = ? WHERE id = ?';
    const values = [departureId, orderId];

    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error setting departure ID:', error.stack);
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

// Fetches the count of orders for each departure ID
const getCountOrdersByDepartureIds = (departureIds) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        t.departure_id,
        COUNT(o.departure_id) as count
      FROM (
        ${departureIds.map(id => `SELECT ${id} as departure_id`).join(' UNION ALL ')}
      ) t
      LEFT JOIN orders o ON t.departure_id = o.departure_id
      GROUP BY t.departure_id`;
    connection.query(query, [departureIds], (error, results) => {
      if (error) {
        console.error('Error fetching order count:', error.stack);
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};

module.exports = {
  clearAllOrders,
  fetchAllOrders,
  fetchAllUnloadedOrders,
  fetchOrdersByDepartureId,
  addNewOrder,
  setDepartureId,
  getCountOrdersByDepartureIds,
};