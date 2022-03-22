import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe(`1 - Testa se o topo da aplicação
 contém um conjunto fixo de links de navegação.`,
() => {
  test('O primeiro link deve possuir o texto "Home".', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveTextContent(/home/i);
  });

  test('O segundo link deve possuir o texto "About".', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[1]).toHaveTextContent(/about/i);
  });

  test('O terceiro link deve possuir o texto "Favorite Pokémons".', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    expect(links[2]).toHaveTextContent(/favorite pokémons/i);
  });
});

describe(`Testa se ao clicar nos links, as urls apresentam a rota correta, 
bem como também testa se ao apresentar a url incorreta a tela 
aprensenta a mensagem de erro`, () => {
  test(`Testa se a aplicação é redirecionada para a página inicial, na URL /
  ao clicar no link Home da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);
    expect(history.location.pathname).toEqual('/');
  });

  test(`Testa se a aplicação é redirecionada para a página de About, 
  na URL /about, ao clicar no link About da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    userEvent.click(about);
    expect(history.location.pathname).toEqual('/about');
  });

  test(`Testa se a aplicação é redirecionada para a página de Pokémons Favoritados, 
  na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
    const { history } = renderWithRouter(<App />);
    const favoritesPokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoritesPokemons);
    expect(history.location.pathname).toEqual('/favorites');
  });

  test(`Testa se a aplicação é redirecionada para a página Not Found 
  ao entrar em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push('/paginadesconhecida');
    const heading = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(heading).toBeInTheDocument();
  });
});
