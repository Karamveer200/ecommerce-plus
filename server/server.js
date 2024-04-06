const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const configurations = require('./config/index');
const { initializePgConnection, loadBatisMappers, closePool } = require('./utils/database/database');

loadBatisMappers();
initializePgConnection();

app.use(cors());

app.use(express.json({ extended: false }));

app.get('/api/health', async (req, res) => {
  res.send(`Node app is running on ${configurations.NODE_ENV} environment`);
});

app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

const PORT = configurations.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Server started on PORT ${PORT}`);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await closePool();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  await closePool();
  process.exit(0);
});
