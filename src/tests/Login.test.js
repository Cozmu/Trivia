import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Login from '../pages/Login';
import App from '../App';

const mockData = {
  response_code: 0,
  response_message: 'Token Generated Successfully!',
  token: 'f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6',
};
const apiUrl = 'https://opentdb.com/api_token.php?command=request';
const emailId = 'input-gravatar-email';
const nameId = 'input-player-name';
const emailAluno = 'aluno@trybe.com.br';
const nomeAluno = 'Aluno A';
const buttonSettings = 'btn-settings'
afterEach(() => jest.clearAllMocks());
describe('Testa a pagina de Login.', () => {
  describe('1. Testa o input email.', () => {
    test('1.1. Testa se existe um campo de email.', () => {
      renderWithRouterAndRedux(<Login />);
      expect(screen.getByTestId(emailId)).toBeInTheDocument();
    });
  });
  describe('2. Testa o input nome.', () => {
    test('2.1. Testa se existe um campo de nome.', () => {
      renderWithRouterAndRedux(<Login />);
      expect(screen.getByTestId(nameId)).toBeInTheDocument();
    });
  });
  describe('2. Testa o botão Play.', () => {
    test('2.1. Testa se existe um botão.', () => {
      renderWithRouterAndRedux(<Login />);
      expect(screen.getByTestId('btn-play')).toBeInTheDocument();
      expect(screen.getByTestId('btn-play')).toHaveTextContent('Play');
    });
    test('2.2. Testa se o botão é habilitado se ambos campos são preenchidos.', () => {
      renderWithRouterAndRedux(<Login />);
      expect(screen.getByTestId('btn-play')).toBeDisabled();
      userEvent.type(screen.getByTestId(emailId), emailAluno);
      userEvent.type(screen.getByTestId(nameId), nomeAluno);
      expect(screen.getByTestId('btn-play')).not.toBeDisabled();
    });
  });
  describe('3. Testa o click do botão Play.', () => {
    test('3.1. Testa se ao clicar no botão Play fetch() é chamado.', async () => {
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockData),
      });
      const { history } = renderWithRouterAndRedux(<App />);
      userEvent.type(screen.getByTestId(emailId), emailAluno);
      userEvent.type(screen.getByTestId(nameId), nomeAluno);
      expect(screen.getByTestId(emailId)).toHaveDisplayValue(emailAluno);
      expect(screen.getByTestId(nameId)).toHaveDisplayValue(nomeAluno);
      expect(screen.getByTestId('btn-play')).not.toBeDisabled();
      userEvent.click(screen.getByTestId('btn-play'));
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(apiUrl);
    });
  });
  describe('4. Testa o botão de Configurações', () => {
    test('4.1. Testa ao clicar no botão de configurações, é trocado de path para "/config"', () => {
      const { history } = renderWithRouterAndRedux(<App />);
      expect(screen.getByTestId(buttonSettings)).toBeInTheDocument();
      expect(screen.getByTestId(buttonSettings)).toHaveTextContent('Configurações');
      userEvent.click(screen.getByTestId(buttonSettings));
      const { pathname } = history.location;
      expect(pathname).toBe('/config');
    });
  });
});
