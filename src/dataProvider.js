import { flow, set, getOr } from 'lodash/fp';

export const getStatus = () => {
  const status = JSON.parse(localStorage.getItem('guessStatus') || '{}');
  const actual = Number(localStorage.getItem('actualValue'));
  return flow([
    set('attempts', getOr(0, 'attempts', status)),
    set('avarage', getOr(0, 'avarage', status)),
    set('actual', actual)
  ])(status)
}

export const updateStatus = (guess) => {
  const status = getStatus();
  const attempts = guess !== '' ? status.attempts + 1 : status.attempts;
  const avarage = guess !== '' ? 
        ((status.avarage * status.attempts) + Number(guess)) / attempts : 
        status.avarage || guess;

  localStorage.setItem('guessStatus', JSON.stringify({
    avarage,
    attempts
  }));
}

localStorage.setItem('actualValue', 328)