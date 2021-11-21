const app = require('./app');

const SERVER_PORT = process.env.SERVER_PORT || 3010;

app.listen(SERVER_PORT, () => {
  console.log(`Api rodando na porta ${SERVER_PORT}`);
});
