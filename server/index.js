require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const pg = require('pg');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

const app = express();

app.use(staticMiddleware);

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.post('/api/clients', (req, res, next) => {
  const { name, owner1, breed } = req.body;
  if (!name || !owner1) {
    throw new ClientError(400, 'dogs name and owners name are required fields');
  }
  const sql = `
  insert into "Clients" ("name", "owner1", "breed")
  values ($1, $2, $3)
  returning *
  `;
  const params = [name, owner1, breed];
  db.query(sql, params)
    .then(result => {
      const [client] = result.rows;
      res.status(201).json(client);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
