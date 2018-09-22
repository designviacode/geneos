import express from 'express';
import next from 'next';
import http from 'http';

import { API_BASE } from '../constants/api';
import { Router } from './routes';
import api from './api/index';
import { initSockets } from './sockets';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const expressApp = express();

    const server = http.createServer(expressApp);
    initSockets(server);

    Router.forEachPattern((page, pattern, defaultParams) =>
      expressApp.get(pattern, (req, res) =>
        app.render(req, res, `/${page}`, {
          ...defaultParams,
          ...req.query,
          ...req.params,
        })
    ));

    expressApp.use(API_BASE, api);

    expressApp.get('*', (req, res) => handle(req, res));
    server.listen(port);
  });
