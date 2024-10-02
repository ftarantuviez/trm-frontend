import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Col, Table } from 'antd';

const columns = [
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'ETH Balance',
    dataIndex: 'balance',
  },
];

const DashboardAddresses = memo(({ setSelectedAddress }) => {
  const addresses = useSelector(state => state.addresses);

  const onAddressClick = useCallback(
    ({ address }) => {
      setSelectedAddress(address);
    },
    [setSelectedAddress]
  );

  return (
    <Col span={24}>
      <Table
        columns={columns}
        dataSource={addresses || []}
        rowKey="address"
        onRow={record => ({
          onClick: () => onAddressClick(record),
        })}
      />
    </Col>
  );
});

export default DashboardAddresses;
