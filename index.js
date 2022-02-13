/**
 * Get the chunk cut-points of a data sequence using the Rapid Asymmetric Maximum (RAM) algorithm.
 *
 * @param {(string|any[])} data The data sequence to chunk.
 * @param {number} windowSize The fixed-size window size.
 * @returns {number[]} The array of chunk starting indices (inclusive) of the data sequence.
 */
const getCutPoints = (data, windowSize) => {
  let cutPoint = 0;
  let maxValue = data[cutPoint];
  const cutPoints = [cutPoint];

  for (let i = 1; i < data.length - 1; i++) {
    const datum = data[i];

    if (datum >= maxValue) {
      if (i >= cutPoint + windowSize) {
        cutPoint = i + 1;
        maxValue = data[cutPoint];
        cutPoints[cutPoints.length] = cutPoint;
      } else {
        maxValue = datum;
      }
    }
  }

  return cutPoints;
};

module.exports = { getCutPoints };
