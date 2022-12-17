import { parse } from 'query-string';

export function isDevelopmentStage() {
  return process.env.NODE_ENV === 'development';
}

export function preload(path) {
  const img = new Image();
  img.src = path;
}

export function getDateFromIso(iso) {
  const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ];
  const parsed = new Date(iso);
  const minutes = parsed.getMinutes();
  const hours = parsed.getHours();
  const seconds = parsed.getSeconds();
  const year = parsed.getFullYear();

  let monthNum = parsed.getMonth() + 1;
  monthNum = monthNum < 10 ? `0${monthNum}` : monthNum;
  let time = '';
  time += `${(hours < 10 ? '0' : '') + hours}:`;
  time += (minutes < 10 ? '0' : '') + minutes;

  let day = parsed.getDate();
  day = day < 10 ? `0${day}` : day;

  const monthText = months[parsed.getMonth()];

  return {
    time, day, year, monthNum, monthText, seconds,
  };
}

export function numWithCommas(number = 0) {
  const parts = number.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return parts.join('.');
}

export function getTokenFromUrl() {
  const { token } = parse(window.location.search);

  return token || '';
}

export const filterbetween = (arr, min, max) => (
  arr.filter(item => item.bet >= min && item.bet <= max)
);

export const secondsToTime = (secs) => {
  const divisorForMinutes = secs % (60 * 60);
  const minutes = Math.floor(divisorForMinutes / 60);

  const divisorForSeconds = divisorForMinutes % 60;
  let seconds = Math.ceil(divisorForSeconds);
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${minutes}:${seconds}`;
};

export function getMobileOperatingSystem() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone';
  }

  if (/android/i.test(userAgent)) {
    return 'Android';
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'IOS';
  }

  return 'unknown';
}

export function getOrdinalPostfix(num) {
  if ((num % 100 > 9) && (num % 100 < 20)) return 'th';
  const remainder = num % 10;
  switch (remainder) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}
