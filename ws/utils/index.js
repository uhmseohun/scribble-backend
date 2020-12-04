exports.broadcast = async (ctx, message, exclude) => {
  message = JSON.stringify(message);
  ctx.clients.forEach(async (client) => {
    if (client.key !== exclude) await client.send(message);
  });
};
