import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonPage from './components/PokemonPage';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import useApi from './hooks/useApi';

const App = () => {
  const { data: pokemonList, loading, error } = useApi('/api/pokemon');

  return (
    <div className="app">
      <header className="header">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1>Pokédex</h1>
        </Link>
        <p>Full Stack Open — Part 11 CI/CD</p>
      </header>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage error={error} />}

      <Routes>
        <Route
          path="/"
          element={<PokemonList pokemonList={pokemonList || []} />}
        />
        <Route
          path="/pokemon/:name"
          element={
            <PokemonPage
              pokemonList={pokemonList || []}
              loading={loading}
              error={error}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
