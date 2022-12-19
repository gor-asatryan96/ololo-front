const getRandomInteger = (min, max) => {
  const randomNum = Math.random() * (max - min) + min;
  return Math.floor(randomNum);
};

const getRandomIntegerNineSymbol = () => (getRandomInteger(100000000, 999999999));


const parseCentrifugeUrl = (url = '') => {
  if (url.includes('ws:') || url.includes('wss:')) return url;

  return window.location.origin
    .replace('http:', 'ws:')
    .replace('https:', 'wss:') + url;
};


export {
  getRandomInteger,
  getRandomIntegerNineSymbol,
  parseCentrifugeUrl
};
