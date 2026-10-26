const express = require('express');
const cors = require('cors');
const path = require('path');
const pokemonData = require('./src/data/pokemonList.json');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// Health check endpoint for CI/CD periodic checks (11.8 & 11.13)
app.get(['/health', '/healthz'], (req, res) => {
  res.send('ok');
});

// Version endpoint for release verification (11.11)
app.get('/version', (req, res) => {
  res.send('1');
});

// API routes
app.get('/api/pokemon', (req, res) => {
  res.json(pokemonData);
});

app.get('/api/pokemon/:name', (req, res) => {
  const { name } = req.params;
  const pokemon = pokemonData.find(
    (p) => p.name.toLowerCase() === name.toLowerCase()
  );

  if (!pokemon) {
    return res.status(404).json({ error: 'Pokemon not found' });
  }

  res.json(pokemon);
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

module.exports = app;
