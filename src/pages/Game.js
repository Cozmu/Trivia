import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuestion } from '../redux/actions/index';

class Game extends React.Component {
  state = {
    // indexQuestion: 0,
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
    const correctAnswers = { answers: question[index].correct_answer, value: true };
    const incorrectAnswers = question[index].incorrect_answers
      .map((e) => ({ answers: e, value: false }));
    const answers = [correctAnswers, ...incorrectAnswers];
    console.log(answers);
    const meio = 0.5;
    const answerRandom = answers.sort(() => Math.random() - meio);
    this.setState({ arrayOfAnswers: answerRandom });
  };

  render() {
    const { results, isLoading } = this.props;
    const { arrayOfAnswers } = this.state;
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
                onClick={ () => this.shuffle(results, 0) }
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
