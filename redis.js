const client = require('async-redis').createClient();

client.on('connect', () => {
  console.log('Redis connected.');
});

client._hmset = (key, field, value) => {
  client.hmset(key, field, JSON.stringify(value));
};

module.exports = client;
