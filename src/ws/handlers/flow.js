const redis = require('../../redis');
const { broadcast } = require('../utils');
const { generateRandom } = require('../../utils');
const { words } = require('../../constants');

exports.refreshDrawer = (ctx) => (
  async () => {
    const clients = Array.from(ctx.clients).filter((c) => c.key);
    const userCount = clients.length;
    const drawerIndex = generateRandom(userCount);
    const drawer = clients[drawerIndex];

    if (!clients.length) {
      await redis.del('drawer');
      await redis.del('turnEndAt');
      return;
    }

    await redis.set('drawer', drawer.key);

    const answerWord = words[
      generateRandom(words.length)
    ];
    await redis.set('answer', answerWord);
    await drawer._send({
      type: 'event',
      event: 'answerWord',
      payload: answerWord,
    });

    const turnEndAt = new Date().setSeconds(
      new Date().getSeconds() + 15,
    );
    await redis.set('turnEndAt', turnEndAt);

    broadcast(ctx, {
      type: 'draw',
      event: 'clearCanvas',
    });
    broadcast(ctx, {
      type: 'event',
      event: 'needRefresh',
    });
  }
);
