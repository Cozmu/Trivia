import PropTypes from 'prop-types';
import React from 'react';
import RedirectButton from '../components/RedirectButton';
import getLocalStorage from '../services/getLocalStorage';

class Ranking extends React.Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const ranking = getLocalStorage();
    this.setState({
      ranking: this.sortRanking(ranking),
    });
  }

  sortRanking = (ranking) => {
    const sortedRanking = ranking.sort((a, b) => Number(b.score) - Number(a.score));
    return sortedRanking;
  };

  render() {
    const { history } = this.props;
    const { ranking } = this.state;
    return (
      <main>
        <ol>
          {
            ranking.map((e, index) => {
              console.log(e);
              return (
                <li key={ index }>
                  <p data-testid={ `player-name-${index}` }>{e.name}</p>
                  <p data-testid={ `player-score-${index}` }>{e.score}</p>
                </li>
              );
            })
          }
        </ol>
        <RedirectButton
          dataTestId="btn-go-home"
          redirectPage="/"
          text="Início"
          history={ history }
        />
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Ranking;
