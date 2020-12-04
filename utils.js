const redis = require('./redis');

exports.getUserByKey = async (key) => {
  const user = JSON.parse(
    await redis.hmget('users', key)
  );
  return !user ? null : user;
};

const parseUsers = (users) => {
  if (!users) return [];
  const userKeys = Object.keys(users);
  const reducedUsers = userKeys.reduce(
    (acc, key) => {
      const user = JSON.parse(users[key]);
      return [
        ...acc,
        { key, ...user },
      ];
    },
    [],
  );
  return reducedUsers;
};

exports.getContext = async () => ({
  users:
    parseUsers(await redis.hgetall('users')),
  drawer: null,
  turnEndAt: null,
});

exports.generateRandom = (range) => {
  return Math.floor(Math.random() * range);
};
