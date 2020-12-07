const express = require('express');
const cors = require('cors');
const app = express();
const ws = require('express-ws')(app);
const wsHandler = require('./ws/handlers');
const { getContext } = require('./utils');
const { refreshDrawer } = require('./ws/handlers/flow');
const ctx = ws.getWss('/ws');

app.use(cors());

app.ws('/ws', wsHandler(ctx));

app.get('/context', async (req, res) => {
  res.json(await getContext());
});

app.use('*', (req, res) => {
  res.json({ message: '존재하지 않는 API입니다.' });
});

module.exports = app;

setInterval(refreshDrawer(ctx), 25000);
