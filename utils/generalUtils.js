export const paddingLeft = value => {
  return `${value < 10 ? '0' : ''}${value}`;
};
export const convertSecToMinSec = sec =>
  `${Math.floor(sec / 60)}:${paddingLeft(Math.floor(sec % 60))}`;
