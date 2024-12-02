export const parseDelimitedStringToArray = (str: string, delimiter = '; ') => {
  return str.split(delimiter).map((item) => {
    return { text: item };
  });
};
