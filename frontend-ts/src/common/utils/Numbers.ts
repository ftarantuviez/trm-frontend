/** Static helpers for {@link Number}. */
export const Numbers = {
  /** Utility function to format a number with commas and a fixed number of decimal places. */
  toLocaleDecimals: (value: number | string | bigint, min = 2, max = 4) => {
    const numValue = Number(value);
    return numValue.toLocaleString(undefined, {
      minimumFractionDigits: min,
      maximumFractionDigits: max,
    });
  },
};
