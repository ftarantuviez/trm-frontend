import BigNumber from 'bignumber.js';

/**
 * Utility functions for manipulating numbers
 */
export const Numbers = {
  /**
   * Convert a number from wei to ether, given an amount of decimals
   * @param {number|string} amount - The amount in wei to convert
   * @param {number} decimals - The number of decimals for the token
   * @returns {string} - The amount converted to ether as a string
   */
  weiToEther: (amount, decimals = 18) =>
    BigNumber(amount).dividedBy(BigNumber(10).pow(decimals)).toString(),
  /** Utility function to format a number with commas and a fixed number of decimal places. */
  toLocaleDecimals: (value, min = 2, max = 4) => {
    const numValue = +value;
    return numValue.toLocaleString(undefined, {
      minimumFractionDigits: min,
      maximumFractionDigits: max,
    });
  },
};
