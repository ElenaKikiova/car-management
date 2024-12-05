const express = require('express');
const cors = require('cors');
const { initDb } = require('./data/db.js');
const carController = require('./controllers/carController');

const app = express();
const PORT = 8088;

// CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Enable CORS with the defined options
app.use(cors(corsOptions));

app.use(express.json());
initDb();


app.get('/', (req, res) => {
    res.send(`Car management server on port ${PORT}. Frontend is on port 3000`);
});

app.use('/cars', carController);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
