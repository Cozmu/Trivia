import React from 'react';
import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import Game from '../pages/Game';

const mockData = {
  response_code: 3,
  results: [],
};
const initialState = {
  player: {
    name: 'Aluno A',
    assertions: 0,
    score: 0,
    gravatarEmail: 'aluno@trybe.com.br',
    correct: false,

  },
  questions: {
    responseCode: 0,
    results: [
      {
        category: 'Science: Computers',
        type: 'multiple',
        difficulty: 'easy',
        question: 'What does CPU stand for?',
        correct_answer: 'Central Processing Unit',
        incorrect_answers: [
          'Central Process Unit',
          'Computer Personal Unit',
          'Central Processor Unit',
        ],
      },
      {
        category: 'Entertainment: Film',
        type: 'multiple',
        difficulty: 'medium',
        question: 'Who played the female lead in the 1933 film &quot;King Kong&quot;?',
        correct_answer: 'Fay Wray',
        incorrect_answers: [
          'Jean Harlow',
          'Vivien Leigh',
          'Mae West',
        ],
      },
      {
        category: 'Entertainment: Film',
        type: 'multiple',
        difficulty: 'hard',
        question: 'In the 1999 movie Fight Club, which of these is not a rule of the &quot;fight club&quot;?',
        correct_answer: 'Always wear a shirt',
        incorrect_answers: [
          'You do not talk about FIGHT CLUB',
          'Only two guys to a fight',
          'Fights will go on as long as they have to',
        ],
      },
      {
        category: 'Entertainment: Comics',
        type: 'multiple',
        difficulty: 'hard',
        question: 'What is the real hair colour of the mainstream comic book version (Earth-616) of Daredevil?',
        correct_answer: 'Blonde',
        incorrect_answers: [
          'Auburn',
          'Brown',
          'Black',
        ],
      },
      {
        category: 'Science: Computers',
        type: 'multiple',
        difficulty: 'hard',
        question: 'Dutch computer scientist Mark Overmars is known for creating which game development engine?',
        correct_answer: 'Game Maker',
        incorrect_answers: [
          'Stencyl',
          'Construct',
          'Torque 2D',
        ],
      },
    ],
    isDisabled: false,
    proxPergunta: false,
  },
};
const emailId = 'input-gravatar-email';
const nameId = 'input-player-name';
const emailAluno = 'aluno@trybe.com.br';
const nomeAluno = 'Aluno A';
const headScore = 'header-score';
const correctAnswer = 'correct-answer';
const questionText = 'question-text';

describe('Testa a página de Game e seus componentes.', () => {
  describe('1. Testa se ao retornar um token invalido o usuário é retornado para "/".', () => {
    afterEach(() => jest.clearAllMocks());
    test('1.1. Testa se retorna à página de login se estiver com valor', () => {
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockData),
      });
      const { history } = renderWithRouterAndRedux(<App />);
      userEvent.type(screen.getByTestId(emailId), emailAluno);
      userEvent.type(screen.getByTestId(nameId), nomeAluno);
      userEvent.click(screen.getByTestId('btn-play'));
      act(() => { history.push('/game'); });
      const { pathname } = history.location;
      expect(pathname).toBe('/game');
      const token = localStorage.getItem('token');
      expect(token).toBe(null);
      // act(() => history.push('/'));
      // expect(history.location.pathname).not.toBe('/game');
    });
  });
  describe('2. Testa o componente Header na pagina Game.', () => {
    test('2.1. Testa se renderiza foto do usuário.', () => {
      renderWithRouterAndRedux(<Game />, initialState);
      expect(screen.getByTestId('header-profile-picture')).toBeInTheDocument();
      expect(screen.getByTestId('header-profile-picture')).toHaveAttribute('src', 'https://www.gravatar.com/avatar/95eff65fca8c65f28876bb1cd7ef7686');
    });
    test('2.2. Testa se renderiza nome do usuário.', () => {
      renderWithRouterAndRedux(<Game />, initialState);
      expect(screen.getByTestId('header-player-name')).toBeInTheDocument();
      expect(screen.getByTestId('header-player-name')).toHaveTextContent('Aluno A');
    });
    test('2.3. Testa se renderiza o score inicial com valor "0".', () => {
      renderWithRouterAndRedux(<Game />, initialState);
      expect(screen.getByTestId(headScore)).toBeInTheDocument();
      expect(screen.getByTestId(headScore)).toHaveTextContent('0');
    });
  });
  describe('3. Testa o componente Cronometro na pagina Game.', () => {
    jest.setTimeout(42000);
    test('3.1. Testa se renderiza o cronometro com valor inicial "30".', async () => {
      renderWithRouterAndRedux(<Game />, initialState);
      await screen.findByTestId(questionText);
      expect(screen.getByTestId('cronometro')).toBeInTheDocument();
      expect(screen.getByTestId('cronometro')).toHaveTextContent('30');
    });
    test('3.2. Testa se renderiza o cronometro com valor final é "0".', async () => {
      renderWithRouterAndRedux(<Game />, initialState);
      await screen.findByTestId(questionText);
      expect(screen.getByTestId('cronometro')).toBeInTheDocument();
      expect(screen.getByTestId('cronometro')).toHaveTextContent('30');
      await waitFor(() => {
        expect(screen.getByTestId('btn-next')).toBeInTheDocument();
        expect(screen.getByTestId('cronometro')).toHaveTextContent('0');
      }, { timeout: 40000 });
      expect(screen.getByTestId('btn-next')).toBeInTheDocument();
    });
    test('3.3. ....', async () => {
      renderWithRouterAndRedux(<Game />, initialState);
      await screen.findByTestId(questionText);
      expect(screen.getByTestId('cronometro')).toBeInTheDocument();
      expect(screen.getByTestId('cronometro')).toHaveTextContent('30');
      // await waitFor(() => {
      //     expect(screen.getByTestId('cronometro')).toHaveTextContent('29')
      // }, { timeout: 2000 });
      act(() => userEvent.click(screen.getByTestId(correctAnswer)));
      // expect(screen.getByTestId('cronometro')).toHaveTextContent('29')
      waitFor(() => {
        expect(screen.getByTestId(correctAnswer)).toHaveStyle('border: 3px solid rgb(6, 240, 15)');
      });
    });
  });
  describe('4. Testa as perguntas na pagina Game.', () => {
    test('4.1. Testa se renderiza certo a primeira pergunta corretamente.', async () => {
      renderWithRouterAndRedux(<Game />, initialState);
      expect(await screen.findByTestId(questionText)).toHaveTextContent('What does CPU stand for?');
    });
    test('4.2. Testa o valor do Score ao clicar na resposta certa fácil, médium e difícil', async () => {
      renderWithRouterAndRedux(<Game />, initialState);
      expect(await screen.findByTestId(questionText)).toBeInTheDocument();
      expect(screen.getByTestId('cronometro')).toHaveTextContent('30');
      expect(screen.getByTestId(headScore)).toHaveTextContent(0);
      act(() => userEvent.click(screen.getByTestId(correctAnswer)));
      await waitFor(() => {
        expect(screen.getByTestId(headScore)).toHaveTextContent(40);
      });
    });
    test('4.3. Testa o valor do Score clicar na resposta certa média.', async () => {
      renderWithRouterAndRedux(<Game />, initialState);
      expect(await screen.findByTestId(questionText)).toBeInTheDocument();
      act(() => userEvent.click(screen.getByTestId(correctAnswer)));
      act(() => userEvent.click(screen.getByTestId('btn-next')));
      expect(await screen.findByTestId(questionText)).toBeInTheDocument();
      expect(screen.getByTestId('cronometro')).toHaveTextContent('30');
      expect(screen.getByTestId(headScore)).toHaveTextContent(0);
      act(() => userEvent.click(screen.getByTestId(correctAnswer)));
      await waitFor(() => {
        expect(screen.getByTestId(headScore)).toHaveTextContent(110);
      });
    });
    test('4.4. Testa o valor do Score clicar na resposta certa difícil.', async () => {
      renderWithRouterAndRedux(<Game />, initialState);
      expect(await screen.findByTestId(questionText)).toBeInTheDocument();
      act(() => userEvent.click(screen.getByTestId(correctAnswer)));
      act(() => userEvent.click(screen.getByTestId('btn-next')));
      expect(await screen.findByTestId(questionText)).toBeInTheDocument();
      act(() => userEvent.click(screen.getByTestId(correctAnswer)));
      act(() => userEvent.click(screen.getByTestId('btn-next')));
      expect(await screen.findByTestId(questionText)).toBeInTheDocument();
      expect(screen.getByTestId('cronometro')).toHaveTextContent('30');
      expect(screen.getByTestId(headScore)).toHaveTextContent(0);
      act(() => userEvent.click(screen.getByTestId(correctAnswer)));
      await waitFor(() => {
        expect(screen.getByTestId(headScore)).toHaveTextContent(210);
      });
      // act(() => userEvent.click(screen.getByTestId('btn-next')))
      // expect(await screen.findByTestId(questionText)).toBeInTheDocument()
      // act(() => userEvent.click(screen.getByTestId(correctAnswer)))
      // act(() => userEvent.click(screen.getByTestId('btn-next')))
      // expect(await screen.findByTestId(questionText)).toBeInTheDocument()
      // act(() => userEvent.click(screen.getByTestId(correctAnswer)))
      // act(() => userEvent.click(screen.getByTestId('btn-next')))
      // const { pathname } = history.location;
      // expect(pathname).toBe('/feedback');
    });
  });
  describe('5. Testa se vai para página feedback depois de 5 perguntas.', () => {
    // jest.setTimeout(45000);
    test('5.1. Testa se vai para página feedback depois de 5 perguntas.', async () => {
      jest.spyOn(global, 'fetch');
      global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(initialState.questions),
      });
      const { history } = renderWithRouterAndRedux(<App />, initialState, '/game');
      const { pathname } = history.location;

      expect(pathname).toBe('/game');
      expect(await screen.findByTestId(questionText)).toBeInTheDocument();
      act(() => userEvent.click(screen.getByTestId(correctAnswer)));
      act(() => userEvent.click(screen.getByTestId('btn-next')));

      expect(await screen.findByTestId(questionText)).toBeInTheDocument();
      act(() => userEvent.click(screen.getByTestId(correctAnswer)));
      act(() => userEvent.click(screen.getByTestId('btn-next')));

      expect(await screen.findByTestId(questionText)).toBeInTheDocument();
      act(() => userEvent.click(screen.getByTestId(correctAnswer)));
      act(() => userEvent.click(screen.getByTestId('btn-next')));

      expect(await screen.findByTestId(questionText)).toBeInTheDocument();
      act(() => userEvent.click(screen.getByTestId(correctAnswer)));
      act(() => userEvent.click(screen.getByTestId('btn-next')));

      expect(await screen.findByTestId(questionText)).toBeInTheDocument();
      act(() => userEvent.click(screen.getByTestId(correctAnswer)));
      act(() => userEvent.click(screen.getByTestId('btn-next')));
      expect(history.location.pathname).toBe('/feedback');
      expect(screen.getByTestId('btn-play-again')).toBeInTheDocument();
      expect(screen.getByTestId('btn-ranking')).toBeInTheDocument();
      expect(screen.getByTestId('btn-play-again')).toHaveTextContent('Play Again');
      expect(screen.getByTestId('btn-ranking')).toHaveTextContent('Ranking');

      // userEvent.type(screen.getByTestId(emailId), emailAluno);
      // userEvent.type(screen.getByTestId(nameId), nomeAluno);

      // act(() => userEvent.click(screen.getByTestId('btn-play')))
      // history.push('/game')
      // //await new Promise((r) => { setTimeout(r, 2000); });
      // await waitFor(() => {
      //     expect(screen.getByTestId('btn-next')).toBeInTheDocument();
      // }, { timeout: 40000 });
      // expect(screen.getByTestId('btn-next')).toBeInTheDocument();
      // jest.useFakeTimers()
      // jest.spyOn(global, 'fetch');
      // global.fetch.mockResolvedValue({
      //     json: jest.fn().mockResolvedValue(initialState.questions),
      // });
      // const { history } = renderWithRouterAndRedux(<App />, undefined, '/game');
      // userEvent.type(screen.getByTestId(emailId), emailAluno);
      // userEvent.type(screen.getByTestId(nameId), nomeAluno);
      // userEvent.click(screen.getByTestId('btn-play'));
      // history.push('/game')
      // act(() => history.push('/game'));
      // expect(global.fetch).toHaveBeenCalledTimes(1)
      // await waitForElementToBeRemoved(() => screen.getByText('Loading...'))
      // const firstQuestion = await screen.findByTestId(questionText)
      // expect(firstQuestion).toBeInTheDocument()
      // act(() => userEvent.click(screen.getByTestId(correctAnswer)))
      // let timer = 0;
      // jest.setTimeout(4000);
      // setTimeout(() => timer = 4, 4000)
      // waitFor(() => {
      //     expect(timer).toBe(4)
      // })
      // jest.advanceTimersByTime(32000);image.png
      // jest.advanceTimersToNextTimer()
      // await new Promise((r) => setTimeout(r, 1000));
      // await screen.findByTestId(correctAnswer)
      // screen.logTestingPlaygroundURL()
      // await screen.findByTestId('btn-next')
      // act(() => userEvent.click(screen.getByTestId('btn-next')))
      // expect(await screen.findByTestId(questionText)).toBeInTheDocument()
      // act(() => userEvent.click(screen.getByTestId(correctAnswer)))
      // act(() => userEvent.click(screen.getByTestId('btn-next')))
      // expect(await screen.findByTestId(questionText)).toBeInTheDocument()
      // act(() => userEvent.click(screen.getByTestId(correctAnswer)))
      // act(() => userEvent.click(screen.getByTestId('btn-next')))
      // expect(await screen.findByTestId(questionText)).toBeInTheDocument()
      // act(() => userEvent.click(screen.getByTestId(correctAnswer)))
      // act(() => userEvent.click(screen.getByTestId('btn-next')))
      // expect(await screen.findByTestId(questionText)).toBeInTheDocument()
      // expect(screen.getByTestId('cronometro')).toHaveTextContent('30')
      // act(() => userEvent.click(screen.getByTestId(correctAnswer)))
      // act(() => userEvent.click(screen.getByTestId('btn-next')))
      // const { pathname } = history.location;
      // expect(pathname).toBe('/feedback');
    });
  });
});

// renderWithRouterAndRedux(<Game />, initialState);
//             expect(await screen.findByTestId(questionText)).toHaveTextContent('What does CPU stand for?')
//             expect(screen.getByTestId('cronometro')).toHaveTextContent('30')
//             expect(screen.getByTestId(headScore)).toHaveTextContent(0)
//             act(() => userEvent.click(screen.getByTestId(correctAnswer)))
//             expect(screen.getByTestId(correctAnswer)).toBeDisabled();
//             expect(screen.getByTestId('wrong-answer0')).toBeDisabled();
//             expect(screen.getByTestId(correctAnswer)).toHaveStyle('border: 3px solid red')
//             expect(screen.getByTestId('wrong-answer0')).toHaveStyle('border: 3px solid rgb(6, 240, 15)');
