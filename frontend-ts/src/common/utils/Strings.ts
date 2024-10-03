/**
 * Utility functions for strings.
 */
export const Strings = {
  /**
   * Checks if the given string `s` starts with the given prefix `prefix`.
   * @param prefix The prefix to check for.
   * @param s The string to check.
   * @returns `true` if `s` starts with `prefix`, `false` otherwise.
   */
  startsWith<const PrefixT extends string>(
    prefix: PrefixT,
    s: string
  ): s is `${PrefixT}${string}` {
    return s.startsWith(prefix);
  },
};
