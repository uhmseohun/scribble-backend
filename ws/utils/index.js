exports.broadcast = async (ctx, message) => {
  message = JSON.stringify(message);
  ctx.clients.forEach(async (client) => {
    await client.send(message);
  });
};
