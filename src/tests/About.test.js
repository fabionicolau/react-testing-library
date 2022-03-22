import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import About from '../components/About';

describe('Testa se o componente About tem o comportamento adequado', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const pokedexText = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all/i,
    );
    expect(pokedexText).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const firstParagraph = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all poké/i,
    );
    const secondParagraph = screen.getByText(
      /one can filter pokémons by type, and see more details for each one of them/i,
    );
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
    renderWithRouter(<About />);
    const img = screen.getByAltText(/pokédex/i);
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
