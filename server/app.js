const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3000;

app.use('/api', require('./routes/api'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});