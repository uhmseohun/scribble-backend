const express = require('express');
const app = express();
const ws = require('express-ws')(app);
const wsHandler = require('./ws/handlers');
const ctx = ws.getWss('/ws');

app.ws('/ws', wsHandler(ctx));

app.get('/context', async (req, res) => {
  res.json({});
});

app.use('*', (req, res) => {
  res.json({ message: '존재하지 않는 API입니다.' });
});

module.exports = app;
