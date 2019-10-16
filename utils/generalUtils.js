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
