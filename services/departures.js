const connection = require('../db');

// Delete all departures from the database
const clearAllDepartures = () => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM departures';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error clearing departures:', error.stack);
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};

// Fetch all departures from the database
const fetchAllDepartures = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM departures ORDER BY day';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching departures:', error.stack);
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};

// Fetch a specific departure from the database
const fetchDeparture = (departureId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM departures where id = ?';
    const values = [departureId];
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error fetching departures:', error.stack);
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};

// Add a new departure to the database
const addNewDeparture = (departingLocation, arrivalLocation, day) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO departures (departing_location, arrival_location, day) VALUES (?, ?, ?)';
    const values = [departingLocation, arrivalLocation, day];

    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error adding departure:', error.stack);
        reject(error);
        return;
      }
      resolve(results);
    });
  });
};

module.exports = {
  clearAllDepartures,
  fetchAllDepartures,
  fetchDeparture,
  addNewDeparture
};