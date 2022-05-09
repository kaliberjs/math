/**
 * Return pseudo random number generator. Given the same seed, this function will always 
 * return the same sequence of random numbers.
 * @param {string|number} seed - The seed the number generator is based on
 * @returns {function} - A number between 0 (inclusive) and 1 (exclusive)
 */
export function randomNumberGenerator(seed) {
  const random = xmur3(String(seed))
  return () => random() / 4294967296
}

/**
 * Return a pseudo random number. Given the same seed, this function will always 
 * return the same random number.
 * @param {string|number} seed - The seed used to determine the random number
 * @returns {number} - A number between 0 (inclusive) and 1 (exclusive)
 */
export function pseudoRandom(seed) {
  const salt = '6555705619766379'
  const randomNumber = randomNumberGenerator(salt + seed)
  return randomNumber()
}

// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript/47593316#47593316
// Hash function that generates high entropy 32 bit number (unsigned)
function xmur3(str) {
  let h = 1779033703 ^ str.length

  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
    h = h << 13 | h >>> 19
  }

  return function () {
    h = Math.imul(h ^ (h >>> 16), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    h ^= h >>> 16

    return h >>> 0
  }
}
