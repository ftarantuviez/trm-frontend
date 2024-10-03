import React, { memo, useEffect, useState } from 'react';

import { Col, message, Row } from 'antd';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import DashboardAddresses from './Addresses';
import DashboardSearch from './Search';
import DashboardTransactions from './Transactions';
import { Address } from '../../utils/Address';
import { requestAddressBalance } from '../../redux/actions';

const Dashboard = memo(() => {
  const { address } = useParams();
  const [selectedAddress, setSelectedAddress] = useState();
  const addresses = useSelector(state => state.addresses);
  const dispatch = useDispatch();

  // We handle if an address is provided by URL
  useEffect(() => {
    if (address) {
      const validAddress = Address.ofString(address);

      // We validate the address provided by URL is a valid address
      if (!validAddress) {
        message.error(`Invalid address provided: ${address}`);
        setSelectedAddress(null);
        return;
      }

      // We check if the address is already in our list
      if (
        !addresses.some(
          a => a.address.toLowerCase() === validAddress.toLowerCase()
        )
      ) {
        dispatch(requestAddressBalance({ address: validAddress }));
      }
      setSelectedAddress(validAddress);
    }
  }, [address, selectedAddress, addresses, dispatch]);

  return (
    <Row gutter={[16, 16]}>
      <Col span={12}>
        <Row gutter={[16, 16]}>
          <DashboardSearch />
          <DashboardAddresses setSelectedAddress={setSelectedAddress} />
        </Row>
      </Col>
      <Col span={12}>
        <DashboardTransactions selectedAddress={selectedAddress} />
      </Col>
    </Row>
  );
});

export default Dashboard;
