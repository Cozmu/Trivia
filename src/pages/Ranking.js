import PropTypes from 'prop-types';
import React from 'react';
import { AiFillStar } from 'react-icons/ai';
import RedirectButton from '../components/RedirectButton';
import '../css/Ranking.css';
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
      <main className="ranking-main">
        <h1 data-testid="ranking-title">Ranking</h1>
        <ol>
          {ranking.length !== 0 ? ranking.map((e, index) => (
            <li key={ index }>
              <p
                className="player-name"
                data-testid={ `player-name-${index}` }
              >
                {e.name}
              </p>
              <p
                className="player-score"
                data-testid={ `player-score-${index}` }
              >
                <AiFillStar className="ranking-star" />
                <b>{e.score}</b>
                {' '}
                pontos
              </p>
            </li>
          )) : (
            <div className="ranking-main">
              <h3>Nada</h3>
            </div>) }
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
