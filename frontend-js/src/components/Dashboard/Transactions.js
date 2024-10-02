import React, { memo, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Col, message, Row, Spin, Table } from 'antd';
import {
  ADDRESS_TRANSACTIONS,
  requestAddressTransactions,
} from '../../redux/actions';
import { STATUS_ERROR, STATUS_LOADING } from '../../constants/redux';

const columns = [
  {
    title: 'Tx Hash',
    dataIndex: 'hash',
  },
  {
    title: 'Timestamp',
    dataIndex: 'timeStamp',
  },
  {
    title: 'From',
    dataIndex: 'from',
  },
  {
    title: 'To',
    dataIndex: 'to',
  },
  {
    title: 'Value',
    dataIndex: 'value',
  },
];

const DashboardTransactions = memo(({ selectedAddress }) => {
  const dispatch = useDispatch();
  const lastAddress = useRef();

  const transactions = useSelector(state => state.transactions);
  const requestStatus = useSelector(
    state => state.status[ADDRESS_TRANSACTIONS]
  );

  // request Transactions whenever an Address changes
  useEffect(() => {
    if (selectedAddress !== lastAddress.current && selectedAddress) {
      dispatch(requestAddressTransactions({ address: selectedAddress }));
    }

    lastAddress.current = selectedAddress;
  }, [dispatch, selectedAddress]);

  // display a message if our request errors
  useEffect(() => {
    if (requestStatus === STATUS_ERROR) {
      message.error(
        'Sorry, we are not able to retrieve the transactions for that address. Please try again later.'
      );
    }
  }, [requestStatus]);

  return (
    <Row>
      <Col flex={1}>
        {selectedAddress ? (
          <Row gutter={[16, 16]}>
            <Col span={24}>Viewing transactions for {selectedAddress}:</Col>
            {requestStatus === STATUS_LOADING ? (
              <Col span={24}>
                <Spin />
              </Col>
            ) : (
              <Table
                columns={columns}
                dataSource={transactions || []}
                pagination={false}
                rowKey="hash"
              />
            )}
          </Row>
        ) : (
          `Select an address to view it's latest transactions`
        )}
      </Col>
    </Row>
  );
});

export default DashboardTransactions;
