const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const configurations = require('./config');

app.use(cors());

app.use(express.json({ extended: false }));

app.get('/api/health', async (req, res) => {
  res.send(`Node app is running on ${configurations.NODE_ENV} environment`);
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const PORT = configurations.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Server started on PORT ${PORT}`);
});
