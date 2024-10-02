import _ from 'lodash';

import { ADDRESS_BALANCE, ADDRESS_TRANSACTIONS } from './actions';
import { STATUS_ERROR, STATUS_LOADING } from '../constants/redux';

const defaultState = {
  addresses: [],
  status: {},
  transactions: [],
};

/**
 * Update the status of our action, so any connected components
 * can easily display loading or error states.
 *
 * @param {Object} state
 * @param {Object} action
 * @returns {Object} Existing state with the updated status
 */
const updateActionStatus = (state, action) => {
  let status = null;

  if (action?.type) {
    // status depends on the type of action being fired
    if (action.type.endsWith('_SUCCESS')) {
      status = '';
    } else if (action.type.endsWith('_REQUEST')) {
      status = STATUS_LOADING;
    } else if (action.type.endsWith('_ERROR')) {
      status = STATUS_ERROR;
    }
  }

  if (status === null) {
    return state;
  }

  // update our state if we have a status change
  return {
    ...state,
    status: {
      ...state.status,
      [action.type.replace(/_REQUEST|_SUCCESS|_ERROR/, '')]: status,
    },
  };
};

/**
 * This function will update the underlying state for a specific action
 *
 * @param {Object} state
 * @param {Object} action
 * @returns {Object} Changes to the state, or null
 */
const updateState = (state, action) => {
  switch (action?.type) {
    case `${ADDRESS_BALANCE}_SUCCESS`:
      // always add to our addresses list so our users can select previous addresses
      if (_.isNil(action.response?.result)) {
        return null;
      }

      return {
        addresses: _.concat(
          [
            {
              address: action.payload.address,
              balance: action.response.result,
            },
          ],
          state.addresses
        ),
      };

    case `${ADDRESS_TRANSACTIONS}_REQUEST`:
      // we want to immediately clear our transactions when the user is requesting new ones
      return {
        transactions: [],
      };

    case `${ADDRESS_TRANSACTIONS}_SUCCESS`:
      // replace our transactions with the entire payload
      return {
        transactions: action.response?.result || [],
      };

    default:
  }

  return null;
};

export default function reducers(state = defaultState, action = {}) {
  // update our action's status as our reducer's first step
  const newState = updateActionStatus(state, action);

  return {
    ...newState,
    // process our action's reducer
    ...updateState(state, action),
  };
}
