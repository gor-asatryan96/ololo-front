const getRandomInteger = (min, max) => {
  const randomNum = Math.random() * (max - min) + min;
  return Math.floor(randomNum);
};

const getRandomIntegerNineSymbol = () => (getRandomInteger(100000000, 999999999));

export {
  getRandomInteger,
  getRandomIntegerNineSymbol,
};
