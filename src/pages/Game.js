import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuestion } from '../redux/actions/index';

class Game extends React.Component {
  state = {
    indexQuestion: 0,
    arrayOfAnswers: [],
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
        }
      });
  }

  shuffle = (question, index) => {
    const meio = 0.5;
    const answers = [question[index].correct_answer,
      ...question[index].incorrect_answers];
    console.log(answers);
    const arrAnimais = answers.sort(() => Math.random() - meio);
    console.log(arrAnimais);
    const answerRandom = arrAnimais.map((e) => {
      if (e === question[index].correct_answer) {
        return { answers: e, value: true };
      }
      return { answers: e, value: false };
    });
    this.setState({ arrayOfAnswers: answerRandom });
  };

  render() {
    const { results, isLoading } = this.props;
    const { arrayOfAnswers, indexQuestion } = this.state;
    console.log(arrayOfAnswers);
    return (
      <main>
        <Header />
        {isLoading ? <p>Loading ...</p>
          : (
            <div>
              <p
                data-testid="question-category"
              >
                {results[0].category}
              </p>
              <p
                data-testid="question-text"
              >
                {results[0].question}
              </p>
              <button
                type="button"
                onClick={ () => this.shuffle(results, indexQuestion) }
              >
                sim
              </button>
              <section data-testid="answer-options">
                {arrayOfAnswers.map((e, i) => (
                  <button
                    key={ i }
                    type="button"
                    data-testid={ e.value ? 'correct-answer' : `wrong-answer${i}` }
                  >
                    {e.value ? e.answers : e.answers}
                  </button>
                ))}
              </section>
            </div>)}
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  responseCode: state.questions.responseCode,
  results: state.questions.results,
  isLoading: state.questions.isLoading,
});

Game.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Game);
