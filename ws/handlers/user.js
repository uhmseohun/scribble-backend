const redis = require('../../redis');
const { refreshDrawer } = require('./flow');

exports.onCloseHandler = (ws) => (
  async () => {
    await redis.hdel('users', ws.key);
    await redis.get('drawer', (err, drawer) => {
      if (drawer === ws.key) refreshDrawer();
    });
    await broadcast(ctx, generateMessage(
      'event', 'needRefresh',
    ));
  }
);
