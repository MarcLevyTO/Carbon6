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