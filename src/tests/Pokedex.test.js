import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testa o comportamento do Pokedex', () => {
  test('Testa se página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      level: 2, name: /encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test(`Testa se é exibido o próximo Pokémon da lista quando o botão Próximo 
  pokémon é clicado.`,
  () => {
    renderWithRouter(<App />);
    const nextPokemons = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(nextPokemons);

    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();

    userEvent.click(nextPokemons);

    const caterpie = screen.getByText(/caterpie/i);
    expect(caterpie).toBeInTheDocument();

    userEvent.click(nextPokemons);

    const ekans = screen.getByText(/ekans/i);
    expect(ekans).toBeInTheDocument();

    const fire = screen.getByRole('button', {
      name: /fire/i,
    });
    userEvent.click(fire);

    userEvent.click(nextPokemons);

    const rapidash = screen.getByText(/rapidash/i);
    expect(rapidash).toBeInTheDocument();

    userEvent.click(nextPokemons);

    expect(charmander).toBeInTheDocument();
  });

  test('Testa se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemons = screen.getAllByRole('img');
    expect(pokemons).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();

    const filterButton = screen.getAllByTestId('pokemon-type-button');
    expect(filterButton[0]).toHaveTextContent('Electric');
    expect(filterButton[1]).toHaveTextContent('Fire');
    expect(filterButton[2]).toHaveTextContent('Bug');
    expect(filterButton[3]).toHaveTextContent('Poison');
    expect(filterButton[4]).toHaveTextContent('Psychic');
    expect(filterButton[5]).toHaveTextContent('Normal');
    expect(filterButton[6]).toHaveTextContent('Dragon');

    userEvent.click(filterButton[3]);
    const ekans = screen.getByText(/ekans/i);
    expect(ekans).toBeInTheDocument();
    userEvent.click(filterButton[4]);
    const alakazam = screen.getByText(/alakazam/i);
    expect(alakazam).toBeInTheDocument();

    const buttonNext = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    userEvent.click(buttonNext);

    const mew = screen.getByText(/mew/i);
    expect(mew).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', {
      name: /all/i,
    });
    expect(buttonAll).toHaveTextContent('All');

    userEvent.click(buttonAll);

    const nextPokemons = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(nextPokemons);

    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();

    userEvent.click(nextPokemons);

    const caterpie = screen.getByText(/caterpie/i);
    expect(caterpie).toBeInTheDocument();

    userEvent.click(nextPokemons);

    const ekans = screen.getByText(/ekans/i);
    expect(ekans).toBeInTheDocument();

    renderWithRouter(<App />);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
