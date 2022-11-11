import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuestion } from '../redux/actions/index';

class Game extends React.Component {
  state = {
    isLoading: true,
    indexQuestion: 0,
    buttoncolor: false,
    // isDisabled: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const storage = localStorage.getItem('token');
    dispatch(fetchQuestion(storage))
      .then(() => {
        console.log('esperou');
        const ERROR = 3;
        const { history, responseCode } = this.props;
        console.log(responseCode);
        if (responseCode === ERROR) {
          history.push('/');
          localStorage.removeItem('token');
        } else {
          this.setState({ isLoading: false });
        }
      });
  }

  revealAnswer = () => {
    this.setState({ buttoncolor: true });
  };

  handleColor = (value) => {
    const { buttoncolor } = this.state;
    if (buttoncolor) {
      return value ? 'green-border' : 'red-border';
    }
    return '';
  };

  shuffle = (question, index) => {
    const meio = 0.5;
    const answers = [question[index].correct_answer,
      ...question[index].incorrect_answers];
    const random = answers.sort(() => Math.random() - meio);
    const answerRandom = random.map((e) => {
      if (e === question[index].correct_answer) {
        return { answers: e, value: true };
      }
      return { answers: e, value: false };
    });

    return answerRandom;
  };

  render() {
    const { results } = this.props;
    const { indexQuestion, isLoading } = this.state;
    return (
      <main>
        <Header />
        {isLoading ? <p>Loading ...</p>
          : (
            <div>
              <p
                data-testid="question-category"
              >
                {results[indexQuestion]?.category}
              </p>
              <p
                data-testid="question-text"
              >
                {results[indexQuestion]?.question}
              </p>
              <section data-testid="answer-options">
                { results.length !== 0
                && this.shuffle(results, indexQuestion).map(({ answers, value }, i) => (
                  <button
                    className={ this.handleColor(value) }
                    onClick={ this.revealAnswer }
                    // disabled={ isDisabled }
                    key={ i }
                    type="button"
                    data-testid={ value ? 'correct-answer' : `wrong-answer${i}` }
                  >
                    { answers }
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
  // isLoading: state.questions.isLoading,
});
Game.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;
export default connect(mapStateToProps)(Game);
