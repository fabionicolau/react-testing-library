import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import mockedPokemon from '../helpers/mockedPokemon';
import App from '../App';

describe('Testa o comportamento do componente Pokemon', () => {
  test('Testa se é renderizado um card com as informações de determinado pokémon.',
    () => {
      renderWithRouter(<App />);
      const { name, image,
        type, averageWeight: { value, measurementUnit } } = mockedPokemon;

      const namePokemon = screen.getByTestId('pokemon-name');
      const typePokemon = screen.getByTestId('pokemon-type');
      const averageWeightPokemon = screen.getByTestId('pokemon-weight');

      const img = screen.getByRole('img', {
        name: `${name} sprite`,
      });
      expect(img).toHaveAttribute('src', image);
      expect(img).toHaveAttribute('alt', `${name} sprite`);

      expect(namePokemon).toHaveTextContent(name);
      expect(typePokemon).toHaveTextContent(type);
      expect(averageWeightPokemon)
        .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    });

  test('Testa se há um link de navegação para exibir detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const { id, name } = mockedPokemon;
    const link = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(link).toBeDefined();
    expect(link).toHaveAttribute('href', `/pokemons/${id}`);

    userEvent.click(link);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);

    const checkbox = screen.getByRole('checkbox', {
      name: /pokémon favoritado/i,
    });

    userEvent.click(checkbox);

    const star = screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    });
    expect(star).toBeInTheDocument();
    expect(star).toHaveAttribute('src', '/star-icon.svg');
    expect(star).toHaveAttribute('alt', `${name} is marked as favorite`);
  });
});
