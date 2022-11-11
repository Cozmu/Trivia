const getLocalStorage = () => {
  const arr = JSON.parse(localStorage.getItem('ranking'));
  return arr;
};

export default getLocalStorage;
