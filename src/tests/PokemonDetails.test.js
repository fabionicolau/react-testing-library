import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import data from '../data';
import App from '../App';

const mockedPokemon = data[0];

describe('Testa o comportamento do componente PokemonDetails', () => {
  test('Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela.',
    () => {
      renderWithRouter(<App />);

      const { name, summary } = mockedPokemon;

      const moreDetails = screen.getByRole('link', {
        name: /more details/i,
      });
      userEvent.click(moreDetails);

      const namePokemon = screen.getByRole('heading', {
        name: `${name} Details`,
      });
      expect(namePokemon).toBeInTheDocument();
      expect(moreDetails).not.toBeInTheDocument();

      const summaryHeading = screen.getByRole('heading', { level: 2,
        name: /summary/i,
      });
      expect(summaryHeading).toBeInTheDocument();

      const summaryParagraph = screen.getByText(
        summary,
      );
      expect(summaryParagraph).toBeInTheDocument();
    });

  test(`Teste se existe na página uma seção com os mapas contendo as localizações do 
  pokémon`,
  () => {
    const { history } = renderWithRouter(<App />);

    const { name, foundAt } = mockedPokemon;

    history.push('/pokemons/25');

    const gameLocations = screen.getByRole('heading', { level: 2,
      name: `Game Locations of ${name}`,
    });
    expect(gameLocations).toBeInTheDocument();

    expect(foundAt).toHaveLength(2);
    const location1 = foundAt[0].location;
    const location2 = foundAt[1].location;

    const locationText1 = screen.getByText(location1);
    const locationText2 = screen.getByText(location2);
    expect(locationText1 && locationText2).toBeInTheDocument();

    const img1 = foundAt[0].map;
    const img2 = foundAt[1].map;

    const pokemonMap = screen.getAllByRole('img', { name: `${name} location` });

    expect(pokemonMap[0]).toHaveAttribute('src', img1);
    expect(pokemonMap[1]).toHaveAttribute('src', img2);
    expect(pokemonMap[0] && pokemonMap[1]).toHaveAttribute('alt', `${name} location`);
  });

  test('Teste se o usuário pode favoritar um pokémon através da página de detalhes.',
    () => {
      const { history } = renderWithRouter(<App />);

      const { name } = mockedPokemon;

      history.push('/pokemons/25');

      const checkbox = screen.getByRole('checkbox', {
        name: /pokémon favoritado?/i,
      });
      expect(checkbox).toBeInTheDocument();

      userEvent.click(checkbox);
      const star = screen.getByRole('img', {
        name: `${name} is marked as favorite`,
      });
      expect(star).toBeInTheDocument();

      userEvent.click(checkbox);
      expect(star).not.toBeInTheDocument();
    });
});
