import getLocalStorage from './getLocalStorage';

const setLocalStorage = (newPlayer) => {
  const oldArr = getLocalStorage();

  if (oldArr && oldArr.find((elem) => elem.name === newPlayer.name)) {
    const filterOldArr = oldArr.filter((player) => player.name !== newPlayer.name);
    const arraToSet = filterOldArr.push([newPlayer]);
    localStorage.setItem('ranking', JSON.stringify(arraToSet));
  }

  const newArr = oldArr ? [...oldArr, newPlayer] : [newPlayer];
  localStorage.setItem('ranking', JSON.stringify(newArr));
};

export default setLocalStorage;
