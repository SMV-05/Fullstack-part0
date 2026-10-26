import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import PokemonList from '../components/PokemonList';

const mockList = [
  {
    id: 1,
    name: 'bulbasaur',
    types: ['grass', 'poison'],
    sprites: {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    },
  },
  {
    id: 25,
    name: 'pikachu',
    types: ['electric'],
    sprites: {
      front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    },
  },
];

describe('<PokemonList />', () => {
  it('renders all pokemon in the list', () => {
    render(
      <BrowserRouter>
        <PokemonList pokemonList={mockList} />
      </BrowserRouter>
    );

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('grass')).toBeInTheDocument();
    expect(screen.getByText('electric')).toBeInTheDocument();
  });
});
