const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();
const port = process.env.port;

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.use((req, res, next) => {
    console.log('incoming request')
    next();
})

const videoRoutes = require('./routes/videos');
app.use('/videos', videoRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})