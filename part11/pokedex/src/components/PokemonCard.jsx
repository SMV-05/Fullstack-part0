import React from 'react';
import { Link } from 'react-router-dom';

const PokemonCard = ({ pokemon }) => {
  return (
    <Link
      to={`/pokemon/${pokemon.name}`}
      className="pokemon-card"
      data-testid={`pokemon-${pokemon.name}`}
    >
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="pokemon-card-image"
      />
      <div className="pokemon-card-name">{pokemon.name}</div>
      <div className="pokemon-card-types">
        {(pokemon.types || []).map((type) => (
          <span key={type} className={`type-badge type-${type}`}>
            {type}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default PokemonCard;
