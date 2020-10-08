const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config/config.json');
const cors = require('cors');
const PORT = config.port;
const api = require('./routes/api');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', api);

app.get('/', function(req, res){
	res.send('Hello from server');
});
app.listen(PORT, () => {
	console.log('server running on the port: ' + PORT);
});
