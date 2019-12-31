import ReactGA from 'react-ga';

export const paddingLeft = value => {
  return `${value < 10 ? '0' : ''}${value}`;
};
export const convertSecToMinSec = sec =>
  `${Math.floor(sec / 60)}:${paddingLeft(Math.floor(sec % 60))}`;

export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const convertYoutubeDurationToMinSec = durationString => {
  let rawDuration = durationString.slice(2);
  let hour;
  let min;
  let sec;
  if (rawDuration.includes('H')) {
    [hour, rawDuration] = rawDuration.split('H');
  }
  if (rawDuration.includes('M')) {
    [min, rawDuration] = rawDuration.split('M');
  }
  if (rawDuration.includes('S')) {
    [sec, rawDuration] = rawDuration.split('S');
  }
  if (hour) {
    return `${hour}:${paddingLeft(min || 0)}:${paddingLeft(sec || 0)}`;
  }
  if (min) {
    return `${min}:${paddingLeft(sec || 0)}`;
  }
  if (sec) {
    return `${sec}`;
  }
};
export const capitalize = word => word.charAt(0).toUpperCase() + word.slice(1);

export const initGA = () => {
  console.log('GA init');
  ReactGA.initialize('UA-136377933-4');
};

export const logPageView = () => {
  console.log(`Logging pageview for ${window.location.pathname}`);
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const logEvent = (category = '', action = '', label = '') => {
  if (category && action) {
    ReactGA.event({ category, action, label: `${label}` });
  }
};

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal });
  }
};

export const random = (min, max) => {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
};
