require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const pg = require('pg');
const upload = require('./uploads-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
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
  insert into "Clients" ("name", "owner1", "breed", "owner2", "phone", "email",
                         "dob", "gender", "ownedSince", "spayNeut", "vaccinated",
                         "foodDiet", "vet", "health", "training", "isActive")
                  values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12,
                          $13, $14, $15, $16)
                returning *
  `;
  const params = [name, owner1, breed, '', '', '', '', '', '', '', '', '', '', '', '', false];
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

app.put('/api/clients/:clientId', upload.single('profilePhoto'), (req, res, next) => {
  const clientId = parseInt(req.params.clientId, 10);
  const {
    name, owner1, owner2, phone, email, dob, breed, gender,
    ownedSince, spayNeut, vaccinated, foodDiet, vet, health,
    training, profilePhoto, isActive
  } = req.body;
  let url = '';
  if (typeof req.file !== 'undefined') {
    url = `${req.file.location}`;
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

app.post('/api/assessment/:clientId', (req, res, next) => {
  const clientId = parseInt(req.params.clientId, 10);
  const { assessmentEntry } = req.body;
  const sql = `
    insert into "assessments"("clientId", "assessmentEntry")
    values ($1, $2)
    returning *;
  `;
  const params = [clientId, assessmentEntry];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/assessment/:clientId', (req, res, next) => {
  const clientId = parseInt(req.params.clientId, 10);
  const sql = `
  select "assessmentId",
         "clientId",
         "assessmentEntry",
         "assessmentDate"
    from "assessments"
    where "clientId" = $1
  `;
  const params = [clientId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/files/:clientId', upload.single('file'), (req, res, next) => {
  const clientId = parseInt(req.params.clientId, 10);
  const { key, mimetype, location } = req.file;
  const { fileTitle } = req.body;
  const sql = `
    insert into "documents"("clientId", "fileName", "fileType", "fileTitle", "fileUrl")
    values ($1, $2, $3, $4, $5)
    returning *;
  `;
  const params = [clientId, key, mimetype, fileTitle, location];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/files/:clientId', (req, res, next) => {
  const clientId = parseInt(req.params.clientId, 10);
  const sql = `
  select "fileId",
         "fileTitle",
         "fileUrl",
         "uploadDate"
    from "documents"
    where "clientId" = $1
  `;
  const params = [clientId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/notes/:clientId', (req, res, next) => {
  const clientId = parseInt(req.params.clientId, 10);
  const { entry } = req.body;
  const sql = `
    insert into "notes"("clientId", "entry")
    values ($1, $2)
    returning *;
  `;
  const params = [clientId, entry];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/notes/:clientId', (req, res, next) => {
  const clientId = parseInt(req.params.clientId, 10);
  const sql = `
  select "noteId",
         "clientId",
         "entry",
         "time_stamp"
    from "notes"
    where "clientId" = $1
  `;
  const params = [clientId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/activitylog/:clientId', (req, res, next) => {
  const clientId = parseInt(req.params.clientId, 10);
  const { entry } = req.body;
  if (!entry) {
    throw new ClientError(400, 'entry is a required field');
  }
  const sql = `
    insert into "activityLog"("clientId", "entry")
    values ($1, $2)
    returning *;
  `;
  const params = [clientId, entry];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/activitylog/:clientId', (req, res, next) => {
  const clientId = parseInt(req.params.clientId, 10);
  if (!clientId) {
    throw new ClientError(400, 'clientId must be a positive integer');
  }
  const sql = `
  select "activityId",
         "clientId",
         "entry",
         "time_stamp"
    from "activityLog"
    where "clientId" = $1
  `;
  const params = [clientId];
  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
