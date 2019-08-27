const express = require('express');
const { setup } = require('radiks-server');
const app = express();
const path = require('path');
var cors = require('cors')

app.use(cors())


setup({
  mongoDBUrl: 'mongodb://localhost:27017/plaiv-test',
}).then(RadiksController => {
  const db = RadiksController.DB
  const radiksData = db.collection('radiks-server-data')

  app.use('/radiks', RadiksController);
  app.get('/', (req, res) => {
    res.send('working ish')
  })
});

const PORT = process.env.PORT || 5000;

app.listen((PORT), () => {
  console.log('listening on port ' + PORT);
});
