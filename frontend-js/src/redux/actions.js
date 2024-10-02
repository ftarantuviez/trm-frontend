export const ADDRESS_BALANCE = 'ADDRESS_BALANCE';
export const ADDRESS_TRANSACTIONS = 'ADDRESS_TRANSACTIONS';

export const requestAddressBalance = ({ address }) => ({
  type: ADDRESS_BALANCE,
  payload: { address },
});

export const requestAddressTransactions = ({ address }) => ({
  type: ADDRESS_TRANSACTIONS,
  payload: { address },
});
