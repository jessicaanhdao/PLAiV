const express = require('express')
const {setup} = require('radiks-server')
const app = express()
const cors = require('cors')
// const cool = require('cool-ascii-faces')
const webpush = require('web-push')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(cors())

app.use((req, res, next) => {
	
	// Pass to next layer of middleware
	res.setHeader("Content-Security-Policy", "default-src 'self'; script-src https://static.ads-twitter.com https://www.google-analytics.com 'sha256-q2sY7jlDS4SrxBg6oq/NBYk9XVSwDsterXWpH99SAn0='; img-src 'self' https://s3.amazonaws.com https://twitter.com https://pbs.twimg.com; font-src 'self' https://fonts.gstatic.com; style-src 'self' https://fonts.googleapis.com; frame-ancestors 'none'"
	);

	next();
  });

const vapidKeys = {
	"publicKey":"BDIgSI3mEOj_oLkpJcMINqVhKqFNfZ0gI9Eg7J7pDQeaA9aYWY_BO4ZUKjf9BcmHXyMRoeWPClLtUY46OFV7qrA",
	"privateKey":"M_K7ToRhjNKurXKUhLO9eNZrP-T8WwdMoxAHJHWDfgc"
};

webpush.setVapidDetails(
	'mailto:jessicadao97@gmail.com',
	vapidKeys.publicKey,
	vapidKeys.privateKey
);
//'mongodb://localhost:27017/plaiv-test'
mongoDBUrl = 'mongodb://localhost:27017/plaiv-test'
app.get('/subscribe', (req, res) => {
	res.send("hiiii")
})

app.post('/subscribe', (req, res) => {
	let sub = req.body;
	// res.setHeader('Content type','application/json');
	console.log("HELLLO")
	let payload = JSON.stringify({
		'notification' : {
			'title' : 'PLAiV Planner',
			'body' : 'HI ITS BOOLOO FROM PLAIV',
			'icon' : '/assets/photos/plaiv_icon.png'
		}
	});
	// sub = {"endpoint":"https://fcm.googleapis.com/fcm/send/cIwwktXh2ZM:APA91bGLc_Oi0dC4hJh8U4gG2FgC3bUP_mpZ8isCedGpYkiNp2Ga8bULqFhMSsZ--KkN36faZM2NwW_QAPoNG76eMkKV3AlGyUc-2u7AKorDAs1Mj-bo6QNEMiDTajRYewND_Jo8XR7-","expirationTime":null,"keys":{"p256dh":"BJbh6kr4Yql03VOdg_N9QbRgpqsErva5rviGkrQ34NMScJA0F8Rj69cU5NPTKbkRLeKZAINnMx-_xN9Hn4ZsVk0","auth":"9LM0KtJXqqY1slU-yovB1Q"}};
	Promise.resolve(webpush.sendNotification(sub,payload))
	.then(()=>{res.status(200).json({
		'message':'Notification sent'
	})
	console.log("yes no maybe so")
	})
	.catch(err => {
		console.log("error pushing "+err.message);
		res.sendStatus(500)
	})
})
setup({
	mongoDBUrl: mongoDBUrl
	
}).then((RadiksController) => {
	const db = RadiksController.DB
	const radiksData = db.collection('radiks-server-data')
	console.log("mongo uri"+mongoDBUrl)

	app.use('/radiks', RadiksController)
	// app.use('/', function (req, res, next) {
	// 	console.log('Request Url:' + req.url);
	// 	next();
	// });
	app.get('/', (req, res) => {
		res.send('<p>go on plaiv.netlify.com to plan your day</p>')
	})
	
	app.get('/cool', (req, res) => res.send(cool()))
	
})

const PORT = process.env.PORT || 5000

app.listen((PORT), () => {
	console.log('listening on port ' + PORT)
})
