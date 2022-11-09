import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { fetchQuestion } from '../redux/actions/index';

class Game extends React.Component {
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

  render() {
    const { results, isLoading } = this.props;
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
              <section data-testid="answer-options">
                <button
                  type="button"
                  data-testid="correct-answer"
                >
                  {}
                </button>
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
