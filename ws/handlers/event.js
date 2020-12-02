const { v4: uuid } = require('uuid');
const redis = require('../../redis');
const { broadcast } = require('../utils');

const handler = async (ctx, ws, event, payload) => {
  switch (event) {
    case 'userJoin':
      const userKey = uuid();
      ws.key = userKey;

      const redisPayload = {
        name: payload.userName,
        score: 0,
      };
      await redis._hmset('users', userKey, redisPayload);
      await ws._send({
        type: 'event',
        event: 'setUserKey',
        payload: userKey,
      });
      await broadcast(ctx, {
        type: 'event',
        event: 'needRefresh',
      });
    default:
      break;
  }
};

module.exports = handler;
