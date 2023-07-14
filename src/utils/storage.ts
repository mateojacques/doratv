export const getDataFromLocalStorage = (key: string, parse = false) =>
  parse
    ? JSON.parse(localStorage.getItem(key) as string)
    : localStorage.getItem(key);
