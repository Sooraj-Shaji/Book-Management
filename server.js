const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
const path = require('path');

dotenv.config();

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());



mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

app.use('/api', bookRoutes);
app.use('/',(req,res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
})


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
