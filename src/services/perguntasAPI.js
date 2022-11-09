const triviaQuestion = async (token) => {
  const endPoint = `https://opentdb.com/api.php?amount=10&token=${token}`;
  const data = await fetch(endPoint);
  const result = await data.json();
  return result;
};

export default triviaQuestion;
