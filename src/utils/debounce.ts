/**
 * Straight forward debounce HOF
 * @param fn function to augment with debounce
 * @param time delay in ms
 * @returns debounced function
 */
const debounce = (fn, time) => {
  let timeoutId
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => fn(...args), time)
  }
};

export default debounce;