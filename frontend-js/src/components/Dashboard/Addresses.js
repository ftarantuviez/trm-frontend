import React, { memo, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { Col, Table } from 'antd';
import { Numbers } from '../../utils/Numbers';

const columns = [
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'ETH Balance',
    dataIndex: 'balanceInEther',
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

  // We show the balance in ether with commas and 6 decimal places
  const addressesParsed = useMemo(
    () =>
      addresses.map(address => ({
        ...address,
        balanceInEther: Numbers.toLocaleDecimals(address.balanceInEther, 6),
      })),
    [addresses]
  );

  return (
    <Col span={24}>
      <Table
        columns={columns}
        dataSource={addressesParsed || []}
        rowKey="address"
        onRow={record => ({
          onClick: () => onAddressClick(record),
        })}
      />
    </Col>
  );
});

export default DashboardAddresses;
