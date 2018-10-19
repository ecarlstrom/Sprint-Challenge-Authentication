const axios = require('axios');

const bcrypt = require('bcryptjs');
const { authenticate, createToken } = require('./middlewares');

const db = require('../database/dbConfig.js');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

function register(req, res) {
  // implement user registration

  // hash password prior to storage

  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 14);
  credentials.password = hash;

  db('users')
    .insert(credentials)
    .then(ids => {
      const id = ids[0];
      db('users')
        .where({ id })
        .first()
        .then(user => {
          const token = createToken(user);
          res.status(201).json({ id: user.id, username: user.username, token }); // only returning token for testing purposes, this seems like a generally bad idea
        })
        .catch(err => res.status(500).json(err.message));
    });
}

function login(req, res) {
  // implement user login

  const credentials = req.body;
  db('users')
    .where({ username: credentials.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(credentials.password, user.password)) {
        const token = createToken(user);
        res.status(200).json({ token }); // create token on successful login
      } else {
        res.status(401).json({ error: 'Username or password is invalid.' });
      }
    })
    .catch(err => res.status(500).json(err.message)); // for non-credential errors
}

// token properly generated: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkV2YW4iLCJpYXQiOjE1Mzk5NjU0MzksImV4cCI6MTUzOTk2NzIzOSwianRpIjoiMTIzIn0.1T5Np_ZFVf-DRt_tSwmDsSxBAguVoP1Dgb7CFgSReig
// again, would never actually put the token into a code file, just for testing and commit purposes

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
