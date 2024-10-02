import { isAddress, getAddress } from 'ethers';

/** Static utilities for the {@link Address} type. */
export const Address = {
  ZERO: ofStringOrThrow('0x0000000000000000000000000000000000000000'),
  /**
   * Parses the given string `s` into an `Address`, or returns `undefined` if
   * `s` is not a valid address format.
   *
   * Under the hood, this uses `ethers.getAddress` to parse an address. This
   * function accepts:
   * - ICAP-formatted addresses
   * - lowercase 20-character hex strings, with or without a `0x` prefix
   * - mixed-case 20-character hex strings, with or without a `0x` prefix,
   *   conforming to the EIP-55 checksum format.
   */
  ofString,
  /**
   * Parses the given string `s` into an `Address`, or throws an error if `s`
   * is not a valid address format.
   */
  ofStringOrThrow,
};

function ofString(s) {
  if (!isAddress(s)) return undefined;

  const a = getAddress(s);

  if (!a.startsWith('0x')) return undefined;

  return a;
}

function ofStringOrThrow(s) {
  const a = ofString(s);
  if (a === undefined) {
    throw new Error(`Invalid address: ${s}`);
  }
  return a;
}
