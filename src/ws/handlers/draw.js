const redis = require('../../redis');
const { broadcast } = require('../utils');

const handler = async (ctx, ws, event, payload = {}) => {
  if (ws.key !== await redis.get('drawer')) return;
  await broadcast(ctx, {
    type: 'draw',
    event,
    payload,
  }, ws.key);
};

module.exports = handler;
