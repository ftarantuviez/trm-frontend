import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Col, Form, Input, message } from 'antd';

import { ADDRESS_BALANCE, requestAddressBalance } from '../../redux/actions';
import { STATUS_ERROR, STATUS_LOADING } from '../../constants/redux';
import { Address } from '../../utils/Address';

const { useForm } = Form;

const DashboardSearch = memo(() => {
  const dispatch = useDispatch();
  const [form] = useForm();
  const addresses = useSelector(state => state.addresses);

  const requestStatus = useSelector(state => state.status[ADDRESS_BALANCE]);

  // AntDesign's Form automatically manages our validation,
  // so we can just request our Address' balance
  // which adds the address to our Addresses list upon success
  const onSubmit = useCallback(
    ({ address }) => {
      dispatch(requestAddressBalance({ address }));
      form.resetFields();
    },
    [dispatch, form]
  );

  // display a message if our request errors
  useEffect(() => {
    if (requestStatus === STATUS_ERROR) {
      message.error(
        'Sorry, we are not able to retrieve the balance of that address. You may have entered an invalid address.'
      );
    }
  }, [requestStatus]);

  // AntDesign's Form automatically manages our validation,
  // here we specify our custom validation rules, and memoize them.
  const inputRules = useMemo(
    () => [
      { required: true, message: 'Please enter an address' },
      {
        validator: (_, value) => {
          const address = Address.ofString(value);

          // We check is a valid address
          if (!address) {
            return Promise.reject(
              new Error('Please enter a valid address. (0x...)')
            );
          }

          // We check if the address is already in our list
          if (
            addresses.some(a => a.address.toLowerCase() === value.toLowerCase())
          ) {
            return Promise.reject(
              new Error('Address already exists in the list')
            );
          }

          return Promise.resolve();
        },
      },
    ],
    [addresses]
  );

  return (
    <Col span={24}>
      <Form form={form} layout="inline" onFinish={onSubmit}>
        <Form.Item className="input-address" name="address" rules={inputRules}>
          <Input placeholder="ETH Address" />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={requestStatus === STATUS_LOADING}
        >
          Add Address
        </Button>
      </Form>
    </Col>
  );
});

export default DashboardSearch;
