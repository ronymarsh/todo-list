// Required External Modules
const express = require('express');
const cors = require('cors');

// App Variables
const app = express();
const PORT = process.env.PORT || 5000;

// App Configuration
app.use(cors());

// Routes Definitions
app.get('/', (req, res) => {
  res.status(200).send('Todo List Server!');
});

// Server Activation
app.listen(5000, () => {
  console.log('Listening on port 5000!');
});
