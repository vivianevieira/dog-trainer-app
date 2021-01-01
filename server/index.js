require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const uploadsMiddleware = require('./uploads-middleware');
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

app.get('/api/clients', (req, res, next) => {
  const sql = `
  select "name",
         "clientId",
         "owner1",
         "owner2",
         "profilePhoto"
    from "Clients"
    order by "clientId" desc
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/clients/:clientId', (req, res, next) => {
  const clientId = parseInt(req.params.clientId, 10);
  const sql = `
  select "name",
         "owner1",
         "owner2",
         "phone",
         "email",
         "dob",
         "breed",
         "gender",
         "ownedSince",
         "spayNeut",
         "vaccinated",
         "foodDiet",
         "vet",
         "health",
         "training",
         "profilePhoto",
         "isActive"
    from "Clients"
    where "clientId" = $1
  `;
  const params = [clientId];
  db.query(sql, params)
    .then(result => {
      const [client] = result.rows;
      res.json(client);
    })
    .catch(err => next(err));
});

app.put('/api/clients/:clientId', uploadsMiddleware, (req, res, next) => {
  const clientId = parseInt(req.params.clientId, 10);
  const {
    name, owner1, owner2, phone, email, dob, breed, gender,
    ownedSince, spayNeut, vaccinated, foodDiet, vet, health,
    training, profilePhoto, isActive
  } = req.body;
  let url = '';
  if (typeof req.file !== 'undefined') {
    url = `/images/${req.file.filename}`;
  } else {
    url = profilePhoto;
  }

  const sql = `
  update "Clients"
     set "name" = $2,
         "owner1" = $3,
         "owner2" = $4,
         "phone" = $5,
         "email" = $6,
         "dob" = $7,
         "breed" = $8,
         "gender" = $9,
         "ownedSince" = $10,
         "spayNeut" = $11,
         "vaccinated" = $12,
         "foodDiet" = $13,
         "vet" = $14,
         "health" = $15,
         "training" = $16,
         "profilePhoto" = coalesce($17, "profilePhoto"),
         "isActive" = $18
   where "clientId" = $1
   returning *
  `;
  const params = [
    clientId, name, owner1, owner2, phone, email, dob, breed,
    gender, ownedSince, spayNeut, vaccinated, foodDiet, vet,
    health, training, url, isActive
  ];
  db.query(sql, params)
    .then(result => {
      const [client] = result.rows;
      res.json(client);
    })
    .catch(err => next(err));
});

app.post('/api/assessment', (req, res, next) => {
  const { clientId, assessmentEntry } = req.body;
  const sql = `
    insert into "assessments"("clientId", "assessmentEntry")
    values ($1, $2)
    returning *;
  `;
  const params = [clientId, assessmentEntry];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
