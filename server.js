const express = require('express');
const next = require('next');
const path = require('path');
const nextI18NextMiddleware = require('next-i18next/middleware').default;
const routes = require('./routes');

const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev: process.env.ENV === 'development' }); // Next.js way to trigger HMR or not.

const handler = routes.getRequestHandler(app);
const nextI18next = require('./i18n');

app
  .prepare()
  .then(() => {
    const server = express();
    const staticDir = path.resolve(__dirname, '..', '.next/static');

    server.use(nextI18NextMiddleware(nextI18next));
    server.use('/_next/static', express.static(staticDir));
    server.use(handler).listen(port, err => {
      if (err) {
        throw err;
      }
      console.log(`> Running on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
