const fs = require('fs');
const path = require('path');

const readJsonFile = (filePath) => {
  try {
    const data = fs.readFileSync(path.resolve(filePath), 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading JSON file:', err);
    return null;
  }
}

module.exports = {
  readJsonFile
};
