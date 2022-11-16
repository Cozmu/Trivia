import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuestion, rightAnswer,
  timesUp, following, nextQuestion, defaultCorrect } from '../redux/actions/index';
import Cronometro from '../components/Cronometro';
import '../css/Game.css';

class Game extends React.Component {
  state = {
    isLoading: true,
    indexQuestion: 0,
    buttoncolor: false,
    perguntas: [],
    contador: 30,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const storage = localStorage.getItem('token');
    dispatch(fetchQuestion(storage))
      .then(() => {
        const ERROR = 3;
        const { history, responseCode } = this.props;
        if (responseCode === ERROR) {
          history.push('/');
          localStorage.removeItem('token');
        } else {
          const { indexQuestion } = this.state;
          const { results } = this.props;
          this.setState({ isLoading: false });
          this.shuffle(results, indexQuestion);
        }
      });
  }

  following = () => {
    this.setState((prev) => ({
      indexQuestion: prev.indexQuestion + 1,
      contador: 30,
      buttoncolor: false,
    }), () => {
      const { indexQuestion } = this.state;
      const { results, history, dispatch } = this.props;
      const FOUR = 4;
      if (indexQuestion > FOUR) {
        history.push('/feedback');
      }
      dispatch(defaultCorrect());
      this.counter();
      this.shuffle(results, indexQuestion);
      dispatch(nextQuestion());
    });
  };

  counter = () => {
    const ONE_SECOND = 1000;
    const tempo = setInterval(() => {
      this.setState((prev) => ({
        contador: prev.contador - 1,
      }), () => {
        const { contador } = this.state;
        const { dispatch, correct, proxPergunta } = this.props;
        if (correct) {
          clearInterval(tempo);
        }
        if (proxPergunta) {
          clearInterval(tempo);
        }
        if (contador === 0) {
          clearInterval(tempo);
          dispatch(timesUp());
        }
      });
    }, ONE_SECOND);
  };

  revealAnswer = (correto, dificuldade) => {
    const { contador } = this.state;
    const { dispatch } = this.props;
    this.setState({ buttoncolor: true });
    if (correto) {
      dispatch(rightAnswer(dificuldade, contador));
    }
    dispatch(following());
  };

  handleColor = (value) => {
    const { buttoncolor } = this.state;
    if (buttoncolor) {
      return value ? 'answers green-border' : 'answers red-border';
    }
    return 'answers';
  };

  shuffle = (question, index) => {
    const FOUR = 4;
    if (index > FOUR) {
      return console.log('done');
    }
    const meio = 0.5;
    const answers = [question[index].correct_answer,
      ...question[index].incorrect_answers];
    const random = answers.sort(() => Math.random() - meio);
    const answerRandom = random.map((e) => {
      if (e === question[index].correct_answer) {
        return { answers: e, value: true, difficulty: question[index].difficulty };
      }
      return { answers: e, value: false, difficulty: question[index].difficulty };
    });
    this.setState({ perguntas: answerRandom });
  };

  render() {
    const { results, isDisabled, history, proxPergunta } = this.props;
    const { indexQuestion, isLoading, perguntas, contador } = this.state;
    return (
      <main>
        <Header history={ history } />
        {isLoading ? <p>Loading ...</p>
          : (
            <div className="game-container">
              <article className="question-container">
                <section className="question-category-cotainer">
                  <p
                    data-testid="question-category"
                  >
                    {results[indexQuestion]?.category}
                  </p>
                </section>
                <section className="question-text-container">
                  <p
                    data-testid="question-text"
                  >
                    {results[indexQuestion]?.question}
                  </p>
                </section>
                <Cronometro contador={ contador } counter={ this.counter } />
              </article>
              <div className="btns-container">
                <section
                  className="answer-options"
                  data-testid="answer-options"
                >
                  { perguntas.length !== 0
                && perguntas.map(({ answers, value, difficulty }, i) => (
                  <button
                    className={ this.handleColor(value) }
                    onClick={ () => this.revealAnswer(value, difficulty) }
                    disabled={ isDisabled }
                    key={ i }
                    type="button"
                    data-testid={ value ? 'correct-answer' : `wrong-answer${i}` }
                  >
                    { answers }
                  </button>
                ))}
                </section>
                {proxPergunta && (
                  <button
                    type="button"
                    className="btn-next"
                    data-testid="btn-next"
                    onClick={ this.following }
                  >
                    PRÓXIMA
                  </button>
                )}
              </div>
            </div>)}
      </main>
    );
  }
}

Game.propTypes = {
  correct: PropTypes.any,
  dispatch: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  isDisabled: PropTypes.any,
  responseCode: PropTypes.any,
  results: PropTypes.any,
}.isRequired;

const mapStateToProps = (state) => ({
  responseCode: state.questions.responseCode,
  results: state.questions.results,
  isDisabled: state.questions.isDisabled,
  correct: state.player.correct,
  proxPergunta: state.questions.proxPergunta,
});

export default connect(mapStateToProps)(Game);
