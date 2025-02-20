# Carbon6

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
