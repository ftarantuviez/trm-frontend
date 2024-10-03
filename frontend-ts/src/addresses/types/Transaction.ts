/**
 * Represents a blockchain transaction.
 */
export type Transaction = Readonly<{
  /**
   * The block number where the transaction was included.
   */
  blockNumber: string;

  /**
   * The hash of the block where the transaction was included.
   */
  blockHash: string;

  /**
   * The timestamp of the block in Unix format.
   */
  timeStamp: string;

  /**
   * The transaction hash.
   */
  hash: string;

  /**
   * The number of transactions sent from this address before this one.
   */
  nonce: string;

  /**
   * The index position of the transaction in the block.
   */
  transactionIndex: string;

  /**
   * The address that initiated the transaction.
   */
  from: string;

  /**
   * The address receiving the transaction.
   */
  to: string;

  /**
   * The amount of Ether (or token value) transferred in wei.
   */
  value: string;

  /**
   * The gas limit provided for the transaction.
   */
  gas: string;

  /**
   * The price of each gas unit in wei.
   */
  gasPrice: string;

  /**
   * The input data sent with the transaction (e.g., function arguments for contract calls).
   */
  input: string;

  /**
   * The method ID used in contract interactions.
   */
  methodId: string;

  /**
   * The name of the contract function called, if applicable.
   */
  functionName: string;

  /**
   * The address of the contract (if any).
   */
  contractAddress: string;

  /**
   * The total gas used in the block up to this transaction.
   */
  cumulativeGasUsed: string;

  /**
   * The status of the transaction (1 = success, 0 = failure).
   */
  txreceipt_status: string;

  /**
   * The actual amount of gas used for the transaction.
   */
  gasUsed: string;

  /**
   * The number of confirmations the transaction has received.
   */
  confirmations: string;

  /**
   * Whether there was an error in the transaction (1 = error, 0 = no error).
   */
  isError: string;
}>;
