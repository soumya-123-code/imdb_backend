const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/actors', require('./routes/actor'));
app.use('/producers', require('./routes/producer'));
app.use('/movies', require('./routes/movie'));

app.get('/', (req, res) => res.send('IMDb backend is working!'));

sequelize.sync({ alter: true }).then(() => {
  app.listen(5000, () => console.log('Server running at http://localhost:5000'));
});
