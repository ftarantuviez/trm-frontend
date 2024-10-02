import { all, call, put, takeLatest } from 'redux-saga/effects';
import { ADDRESS_BALANCE, ADDRESS_TRANSACTIONS } from './actions';
import * as Api from './api';
import { Numbers } from '../utils/Numbers';

// Generic API call handler
function* handleApiCall(
  apiFunction,
  payload,
  type,
  successTransform = data => data
) {
  try {
    yield put({ type: `${type}_REQUEST` });

    const response = yield call(apiFunction, payload);

    if (!response?.data) {
      throw new Error('Empty response');
    }

    // We transform according to the successTransform function.
    const transformedData = successTransform(response.data);

    yield put({
      type: `${type}_SUCCESS`,
      payload,
      response: transformedData,
    });
  } catch (e) {
    yield put({ type: `${type}_ERROR` });
  }
}

// Specific saga handlers
function* loadAddressBalance({ payload, type }) {
  yield call(handleApiCall, Api.getAddressBalance, payload, type, data => ({
    ...data,
    // Since the balance is returned in wei, and this value could be useful in many places,
    // we parse wei to ether to be available to the reducer and any components that need it.
    balanceInEther: Numbers.weiToEther(data.result, 18),
  }));
}

function* loadAddressTransactions({ payload, type }) {
  yield call(handleApiCall, Api.getAddressTransactions, payload, type);
}

export default function* sagas() {
  yield all([
    takeLatest(ADDRESS_BALANCE, loadAddressBalance),
    takeLatest(ADDRESS_TRANSACTIONS, loadAddressTransactions),
  ]);
}
