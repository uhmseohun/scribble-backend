const app = require('./src/app');
const redis = require('./src/redis');

(async () => {
  await redis.del('users');
  await redis.del('answer');
  await redis.del('drawer');
  await redis.del('turnEndAt');
})();

const port = 4000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
