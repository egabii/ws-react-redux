const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const btcCurrencyService = require('./services/btcCurrencyService.js');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/btc/currencies', (req, res) => {
  btcCurrencyService.getCurrencies()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.send(err);
  })
})

io.on('connection', (socket) => {
  socket.on('fetch_currency', ({currency, value}, callback) => {
    console.log('We are talking!');
    btcCurrencyService.getRateOfCurrency(currency, value)
    .then(data => {
      callback({data, status: 'success'});
    })
    .catch(data => {
      callback({data: null, message: 'cannot reach btc currency api', status: 'failed'});
    })
  });

  socket.on('disconnect', () => {
    socket.disconnect();
    console.log('disconnecting socket');
  });
});

http.listen(4000, () => {
  console.log('listening on *:4000');
});