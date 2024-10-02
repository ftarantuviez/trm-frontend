import { Layout, Menu } from 'antd';
import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import Dashboard from './Dashboard';

const { Content, Header } = Layout;

const Router = () => (
  <BrowserRouter>
    <Layout>
      <Header>
        <h1>TRM</h1>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="dashboard">
            <NavLink to="/">Dashboard</NavLink>
          </Menu.Item>
        </Menu>
      </Header>
      <Content>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/address/:address" element={<Dashboard />} />
        </Routes>
      </Content>
    </Layout>
  </BrowserRouter>
);

export default Router;
