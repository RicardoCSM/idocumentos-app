const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const uuid = require('uuid');

server.use(middlewares);

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST' && req.path === '/users') {
    req.body.id = uuid.v4();
  }
  next();
});

server.get('/users/username/:username', (req, res) => {
  const { username } = req.params;
  const users = router.db.get('users');
  const user = users.find({ username }).value();

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running on port 3001');
});