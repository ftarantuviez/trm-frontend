import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ADDRESS_BALANCE, ADDRESS_TRANSACTIONS } from './actions';

import * as Api from './api';
import { Numbers } from '../utils/Numbers';

function* loadAddressBalance({ payload, type }) {
  try {
    yield put({
      type: `${type}_REQUEST`,
    });

    // request our balance from Etherscan
    const response = yield call(Api.getAddressBalance, payload);

    // We handle the case where the response is empty
    if (!response?.data) {
      yield put({
        type: `${type}_ERROR`,
      });
    }

    // Since balance comes back in wei, and we will be displaying in ether
    // we add a new field to the response to store the balance in ether
    const extendedData = {
      ...response.data,
      balanceInEther: Numbers.weiToEther(response.data.result, 18),
    };

    yield put({
      type: `${type}_SUCCESS`,
      payload,
      response: extendedData,
    });
  } catch (e) {
    yield put({
      type: `${type}_ERROR`,
    });
  }
}

function* loadAddressTransactions({ payload, type }) {
  try {
    yield put({
      type: `${type}_REQUEST`,
    });

    // request our address' transactions from Etherscan
    const response = yield call(Api.getAddressTransactions, payload);

    yield put({
      type: `${type}_SUCCESS`,
      payload,
      response: response?.data,
    });
  } catch (e) {
    yield put({
      type: `${type}_ERROR`,
    });
  }
}

export default function* sagas() {
  yield all([
    takeLatest(ADDRESS_BALANCE, loadAddressBalance),
    takeLatest(ADDRESS_TRANSACTIONS, loadAddressTransactions),
  ]);
}
