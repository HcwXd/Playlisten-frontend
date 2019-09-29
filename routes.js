const routes = require('next-routes');

module.exports = routes()
  .add({ name: 'login', page: '/login' })
  .add({ name: 'signup', page: '/signup' });
