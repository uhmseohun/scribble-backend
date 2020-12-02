const eventHandler = require('./event');
const messageHandler = require('./message');
const drawHandler = require('./draw');
const { broadcast } = require('../utils');

const handler = (ctx, ws) => (
  (message) => {
    message = JSON.parse(message);
    const { type, payload, event } = message;

    switch (type) {
      case 'event':
        eventHandler(ctx, ws, event, payload);
        break;
      case 'message':
        messageHandler(ctx, ws, payload);
        break;
      case 'draw':
        drawHandler(ctx, ws, payload);
        break;
      default:
        break;
    }
  }
);

module.exports = (ctx) => (
  (ws, req) => {
    broadcast(ctx, {
      type: 'event',
      event: 'needRefresh',
    });
    ws._send = (payload) => {
      ws.send(JSON.stringify(payload));
    };
    ws.on('message', handler(ctx, ws));
    ws.on('close', async () => {});
  }
);
