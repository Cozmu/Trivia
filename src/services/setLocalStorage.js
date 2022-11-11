import getLocalStorage from "./getLocalStorage";

const setLocalStorage = (newPlayer) => {
  const oldArr = getLocalStorage();

  const newArr = oldArr ? [...oldArr, newPlayer] : [newPlayer];
  localStorage.setItem('ranking', JSON.stringify(newArr));
};

export default setLocalStorage;
