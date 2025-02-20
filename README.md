# Carbon6

## API Endpoints

### Orders
- `GET /orders` - Get all orders
- `GET /orders/unloaded` - Get all unloaded orders

### Departures
- `GET /departures` - Get all scheduled departures
- `GET /departures/:departureId` - Get a scheduled departure and all orders for it

### Schedule Orders
- `POST /scheduleOrders` - Schedule all unloaded orders into possible departures

## Getting Started

### Install dependencies
```bash
npm install
```

### Run the project
To start the server:
```bash
npm start
```

To start the server with `nodemon` for automatic restarts:
```bash
npm run dev
```

### Database Setup
Run these commands in MySQL to fix authentication:
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
FLUSH PRIVILEGES;
```

Then create the database:
```sql
CREATE DATABASE IF NOT EXISTS Carbon6;
```