import { Branded, brand } from "@/common/types/Brand";
import { Strings } from "@/common/utils/Strings";
import { isAddress, getAddress } from "ethers";

/**
 * An EVM address, represented as a string of 20 hex bytes with a '0x' prefix.
 */
export type Address = Branded<typeof ADDRESS_BRAND, `0x${string}`>;
const ADDRESS_BRAND: unique symbol = Symbol("Address");

/** Static utilities for the {@link Address} type. */
export const Address = {
  ZERO: ofStringOrThrow("0x0000000000000000000000000000000000000000"),
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
} as const;

function ofString(s: string): Address | undefined {
  if (!isAddress(s)) return undefined;

  const a = getAddress(s);

  if (!Strings.startsWith("0x", a)) return undefined;

  return brand(ADDRESS_BRAND, a);
}

function ofStringOrThrow(s: string): Address {
  const a = ofString(s);
  if (a === undefined) {
    throw new Error(`Invalid address: ${s}`);
  }
  return a;
}
