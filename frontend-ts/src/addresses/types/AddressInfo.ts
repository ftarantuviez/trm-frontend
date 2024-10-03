import { Address } from "@/common/types/Address";
import { Transaction } from "@/addresses/types/Transaction";

/**
 * Information about an address.
 */
export type AddressInfo = Readonly<{
  /**
   * The address.
   *
   * @example "0x1234567890123456789012345678901234567890"
   */
  address: Address;
  /**
   * Balance in wei.
   *
   * @example 1300000000000000000
   */
  balance: bigint;
  /**
   * Balance in ether.
   *
   * @example "1.3"
   */
  balanceInEther: string;
  /**
   * Transactions for the address.
   */
  transactions: {
    page: number;
    data: ReadonlyArray<Transaction>;
  };
}>;
