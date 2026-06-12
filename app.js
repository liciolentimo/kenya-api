const express = require('express');
const path = require('path');
const countiesRouter = require('./routes/counties');
const holidaysRouter = require('./routes/holidays');
const populationRouter = require('./routes/population');
const exchangeRatesRouter = require('./routes/exchangeRates');
const institutionsRouter = require('./routes/institutions');
const constituenciesRouter = require('./routes/constituencies');
const ministriesRouter = require('./routes/ministries');
const postalCodesRouter = require('./routes/postal-codes');
const searchRouter = require('./routes/search');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/counties', countiesRouter);
app.use('/api/v1/holidays', holidaysRouter);
app.use('/api/v1/population', populationRouter);
app.use('/api/v1/exchange-rates', exchangeRatesRouter);
app.use('/api/v1/institutions', institutionsRouter);
app.use('/api/v1/constituencies', constituenciesRouter);
app.use('/api/v1/ministries', ministriesRouter);
app.use('/api/v1/postal-codes', postalCodesRouter);
app.use('/api/v1/search', searchRouter);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'docs.html'));
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;
