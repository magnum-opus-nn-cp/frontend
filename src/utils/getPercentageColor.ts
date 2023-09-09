/**
 * @param value from 0 to 1
 */
export const getPercentageColor = (value: number) => {
  const hue = (value * 120).toString(10);
  return ['hsl(', hue, ', 60%, 50%)'].join('');
};
