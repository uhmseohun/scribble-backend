const redis = require('../../redis');
const { getUserByKey } = require('../../utils');
const { broadcast } = require('../utils');

const handler = async (ctx, ws, payload) => {
  const answer = await redis.get('answer');
  const sender = await getUserByKey(ws.key);
  const drawer = await redis.get('drawer');
  if (payload === answer) {
    if (drawer !== ws.key) {
      sender.score += 10;
      await redis._hmset('users', ws.key, sender);
      await broadcast(ctx, {
        type: 'event',
        event: 'needRefresh',
      });
      await ws._send({
        type: 'event',
        event: 'alert',
        payload: '맞췄네요!',
      });
    } else {
      await ws._send({
        type: 'event',
        event: 'alert',
        payload: '자기가 그림을 그릴 때는 맞출 수 없어요.',
      });
    }
  } else {
    await broadcast(ctx, {
      type: 'message',
      payload: {
        message: payload,
        sender: sender.name
      }
    });
  }
};

module.exports = handler;
