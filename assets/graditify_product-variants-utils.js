/**
* Estructure the money with currency value
* @param {string} str string with the price type number.
* @return money number with europe money code ej. input 3.45 return b,3,45
*/
export function concatRegexp(initial, exp) {
  return initial.replace(/\d+,\d+/g, exp).replace('.', ',');
}

/**
 * converts the price string, with commas, to a floating number
 */
export const convertStringToFloat = (number) => Number(number.replace(",", "."))

