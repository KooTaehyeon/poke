import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import { Loding } from './Loding';

const Layout: React.FC = () => {
  return (
    <Div>
      <Suspense fallback={<Loding />}>
        <Header />
        <Outlet />
        {/* <Footer /> */}
      </Suspense>
    </Div>
  );
};
const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Layout;
