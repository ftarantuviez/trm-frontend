import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ADDRESS_BALANCE, ADDRESS_TRANSACTIONS } from './actions';

import * as Api from './api';

function* loadAddressBalance({ payload, type }) {
  try {
    yield put({
      type: `${type}_REQUEST`,
    });

    // request our balance from Etherscan
    const response = yield call(Api.getAddressBalance, payload);

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
