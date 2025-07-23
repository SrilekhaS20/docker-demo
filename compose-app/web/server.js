const os = require('os');
const express = require('express');
const app = express();
const redis = require('redis');
const redisClient = redis.createClient({
  host: 'redis',
  post: 6379
});

app.get('/', function(req, res) {
    redisClient.get('numVisits', function(err, numVisits) {
	numVisitsToDisplay = parseInt(numVisits) + 1;
	if (isNaN(numVisitsToDisplay)) {
	    numVisitsToDisplay = 1;
        }
	res.send(os.hostname() +': Number of visits is: ' + numVisitsToDisplay);
	 numVisits++;
	 redisClient.set('numVisits', numVisits);
    });
});

app.get('/health', (req, res) => res.sendStatus(200));

const delay = os.hostname().includes('web2') ? 15000 : 0;

setTimeout(() => {
  app.listen(5000, () =>
    console.log('Service ready on port 5000'));
}, delay);
