import React from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const PokemonPage = ({ pokemonList, loading, error }) => {
  const { name } = useParams();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  const pokemon = pokemonList.find(
    (p) => p.name.toLowerCase() === name.toLowerCase()
  );

  if (!pokemon) {
    return (
      <div className="pokemon-page">
        <Link to="/" className="back-link">&larr; Back to Pokédex</Link>
        <p>Pokemon not found.</p>
      </div>
    );
  }

  return (
    <div className="pokemon-page" data-testid="pokemon-page">
      <Link to="/" className="back-link">&larr; Back to Pokédex</Link>

      <div className="pokemon-page-header">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="pokemon-page-image"
        />
        <div className="pokemon-page-title">
          <h2>{pokemon.name}</h2>
          <div className="pokemon-card-types">
            {(pokemon.types || []).map((type) => (
              <span key={type} className={`type-badge type-${type}`}>
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>

      <h3 className="section-title">Stats</h3>
      <div className="stats-grid">
        {(pokemon.stats || []).map((stat) => (
          <div key={stat.stat.name} className="stat-row">
            <span className="stat-name">{stat.stat.name}</span>
            <span className="stat-value">{stat.base_stat}</span>
          </div>
        ))}
      </div>

      <h3 className="section-title">Abilities</h3>
      <ul className="abilities-list" data-testid="abilities-list">
        {(pokemon.abilities || []).map(({ ability }) => (
          <li key={ability.name} className="ability-tag" data-testid={`ability-${ability.name}`}>
            {ability.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonPage;
