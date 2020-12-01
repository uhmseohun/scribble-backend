const redis = require('./redis');

exports.getUserByKey = async (key) => {
  const user = JSON.parse(
    await redis.hmget('users', key)
  );
  return !user ? null : user;
};
