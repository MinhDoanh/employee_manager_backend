const express = require('express');
const bodyParser = require('body-parser');

const db = require('./config/sql');
const route = require('./routes/index.route');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

route(app)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

});
