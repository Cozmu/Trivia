const triviaQuestion = async (token) => {
  const endPoint = `https://opentdb.com/api.php?amount=5&encode=url3986&token=${token}`; // testes nao passam mas fica bonitinho
  // const endPoint = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const data = await fetch(endPoint);
  const result = await data.json();
  return result;
};

export default triviaQuestion;
