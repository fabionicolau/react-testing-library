import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa o comportamento do componente FavoritePokemons', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFavoritePokemons = screen.getByText(/no favorite pokemon found/i);
    expect(noFavoritePokemons).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado/i,
    });
    userEvent.click(checkbox);
    history.push('/pokemons/23');
    const checkbox2 = screen.getByRole('checkbox', {
      name: /pokémon favoritado/i,
    });
    userEvent.click(checkbox2);
    history.push('/favorites');
    const pikachu = screen.getByText(/pikachu/i);
    const ekans = screen.getByText(/ekans/i);
    expect(pikachu).toBeInTheDocument();
    expect(ekans).toBeInTheDocument();
  });
});
