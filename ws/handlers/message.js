const redis = require('../../redis');
const { getUserByKey } = require('../../utils');
const { broadcast } = require('../utils');

const handler = async (ctx, ws, payload) => {
  const answer = await redis.get('answer');
  const sender = await getUserByKey(ws.key);
  if (payload === answer) { // 정답 제출
    sender.score += 10;
    await redis._hmset('users', ws.key, sender);
    await broadcast(ctx, {
      type: 'event',
      event: 'needRefresh',
    });
    await ws._send({
      type: 'event',
      event: 'alert',
      payload: '정답입니다!',
    });
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
