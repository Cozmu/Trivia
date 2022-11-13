import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa a pagina de Feedback.', () => {
  describe('1. Testa as funções de rota de botões da página Feedback.', () => {
    test('1.1. Testa botão "Play Again".', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => { history.push('/feedback'); });
      expect(screen.getByTestId('feedback-text')).toHaveTextContent('Could be better...');
      expect(screen.getByTestId('btn-play-again')).toHaveTextContent('Play Again');
      userEvent.click(screen.getByTestId('btn-play-again'));
      const { pathname } = history.location;
      expect(pathname).toBe('/');
    });
    test('1.2. Testa botão "Ranking".', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      act(() => { history.push('/feedback'); });
      expect(screen.getByTestId('btn-ranking')).toHaveTextContent('Ranking');
      userEvent.click(screen.getByTestId('btn-ranking'));
      const { pathname } = history.location;
      expect(pathname).toBe('/ranking');
    });
  });
  describe('2. Testa a mudança de pontuação(assertions).', () => {
    test('2.1 Testa se acertou 4 perguntas recebe um "Well Done!".', () => {
      const { history } = renderWithRouterAndRedux(<App />, {
        player: {
          name: 'Aluno Trybe',
          assertions: 4,
          score: 30,
          gravatarEmail: 'aluno@trybe.com.br',
        },
      });
      act(() => { history.push('/feedback'); });
      expect(screen.getByTestId('feedback-total-question')).toHaveTextContent('4');
      expect(screen.getByTestId('feedback-text')).toHaveTextContent('Well Done!');
    });
  });
});
