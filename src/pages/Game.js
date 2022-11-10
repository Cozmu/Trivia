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
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const storage = localStorage.getItem('token');
    const x = await fetchQuestion(storage);
    dispatch(x)
      .then(() => {
        const ERROR = 3;
        const { history, responseCode } = this.props;
        if (responseCode === ERROR) {
          history.push('/');
        }
        if (x) {
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
    return answerRandom.map((e, i) => (
      <button
        className={ this.handleColor(e.value) }
        onClick={ this.revealAnswer }
        key={ i }
        type="button"
        data-testid={ e.value ? 'correct-answer' : `wrong-answer${i}` }
      >
        { e.answers}
      </button>
    ));
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
                {results[indexQuestion].category}
              </p>
              <p
                data-testid="question-text"
              >
                {results[indexQuestion].question}
              </p>
              <section data-testid="answer-options">
                {this.shuffle(results, indexQuestion)}
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
