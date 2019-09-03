const express = require('express')
const {setup} = require('radiks-server')
const app = express()
const cors = require('cors')
// const cool = require('cool-ascii-faces')

app.use(cors())

app.use((req, res, next) => {
	// Website you wish to allow to connect
	// res.setHeader('Access-Control-Allow-Origin', 'https://plaiv.netlify.com');
  
	// Request methods you wish to allow
	// res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
	// Request headers you wish to allow
	// res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	// res.setHeader('Access-Control-Allow-Credentials', true);
  
	// Pass to next layer of middleware
	res.setHeader("Content-Security-Policy", "default-src 'self'; script-src https://static.ads-twitter.com https://www.google-analytics.com 'sha256-q2sY7jlDS4SrxBg6oq/NBYk9XVSwDsterXWpH99SAn0='; img-src 'self' https://s3.amazonaws.com https://twitter.com https://pbs.twimg.com; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com; frame-ancestors 'none'"
	);

	next();
  });
//'mongodb://localhost:27017/plaiv-test'
mongoDBUrl = 'mongodb://localhost:27017/plaiv-test'
setup({
	mongoDBUrl: mongoDBUrl
	
}).then((RadiksController) => {
	const db = RadiksController.DB
	const radiksData = db.collection('radiks-server-data')
	console.log("mongo uri"+mongoDBUrl)

	app.use('/radiks', RadiksController)
	app.get('/', (req, res) => {
		res.send('<p>go on plaiv.netlify.com to plan your day</p>')
	})
	app.get('/cool', (req, res) => res.send(cool()))
})

const PORT = process.env.PORT || 5000

app.listen((PORT), () => {
	console.log('listening on port ' + PORT)
})
