import dynamic from 'next/dynamic';
import React from 'react';
const Wrapper = dynamic(() => import('./Wrapper'));
const SideBar = dynamic(() => import('../NavBar/Sidebar'), { ssr: false });
const AddPostBtn = dynamic(() => import('../CoupledComponents/AddPostBtn'), { ssr: false });
import { WrapperVariantType } from './Wrapper';

interface LayoutProps {
  children: React.ReactNode;
  variant?: WrapperVariantType;
}

const Layout: React.FC<LayoutProps> = ({ variant, children }) => {
  return (
    <main>
      <SideBar />
      <AddPostBtn />
      <Wrapper variant={variant}>
        <div className="mt-5 col-start-2 col-end-3">{children}</div>
      </Wrapper>
    </main>
  );
};

export default Layout;
