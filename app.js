const express = require('express');
const mysql = require('mysql');
const cron = require('node-cron');
const bodyParser = require('body-parser');


// Create connection to MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'alisher'
});

// Connect to database
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// Initialize Express
const app = express();

// Use body-parser middleware
app.use(bodyParser.json());


// Use body-parser middleware
app.use(bodyParser.json());

// Define routes
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/users/:id', (req, res) => {
  db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

app.post('/users', (req, res) => {
  const user = { name: req.body.name, email: req.body.email };
  db.query('INSERT INTO users SET ?', user, (err, result) => {
    if (err) throw err;
    res.status(201).json({ id: result.insertId, ...user });
  });
});

app.put('/users/:id', (req, res) => {
  const user = { name: req.body.name, email: req.body.email };
  db.query('UPDATE users SET ? WHERE id = ?', [user, req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ id: req.params.id, ...user });
  });
});

app.delete('/users/:id', (req, res) => {
  db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'User deleted' });
  });
});

const deleteUnconfirmedUsers = () => {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  db.query('DELETE FROM users WHERE confirmed IS FALSE AND created_at < ?', oneDayAgo, (err, result) => {
    if (err) throw err;
    console.log(`Deleted ${result.affectedRows} unconfirmed users`);
  });
};

// Schedule cron job to run at midnight every day
cron.schedule('0 0 * * *', deleteUnconfirmedUsers);

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});