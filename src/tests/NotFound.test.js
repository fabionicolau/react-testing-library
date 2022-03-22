import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import NotFound from '../components/NotFound';

describe('testa o comportamento do componente NotFound', () => {
  test('Testa se página contém um heading h2 com o texto Page requested not found',
    () => {
      renderWithRouter(<NotFound />);
      const heading = screen
        .getByRole('heading', { level: 2, name: /Page requested not found/i });
      expect(heading).toBeInTheDocument();
    });

  test('Testa se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByAltText(/Pikachu crying because/i);
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
