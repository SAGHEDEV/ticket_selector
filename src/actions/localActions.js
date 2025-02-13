export const useLocalStorage = () => {
  const setLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data)); // Corrected this line
  };

  const getLocalStorage = (key) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  };

  const removeLocalStorage = (key) => {
    localStorage.removeItem(key);
  };

  return { setLocalStorage, getLocalStorage, removeLocalStorage };
};
