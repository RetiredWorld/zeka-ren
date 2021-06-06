import React from 'react';

import { PageProps } from 'gatsby';

import Tools from '../components/public/tools';
import APlayer from '../components/public/aplayer';
import Nav from '../components/public/nav';
import Footer from '../components/public/footer';
import Transition from './transition';
import Meta from './meta';
import LayoutContextProvider from './context';
// import Message from '../components/public/message';

const Layout: React.FC<PageProps> = ({ children, location }) => {

    return (<div className="my-layout">
      <LayoutContextProvider>
        <Nav />
        <div className="container">
          <div className="my-container">
            <main className="my-content">
              <Meta >
                { children }
              </Meta>
              <Transition pathname={location.pathname}>
                { children }
              </Transition>
            </main>
            <Footer/>
          </div>
        </div>
        <APlayer />
        <Tools />
        {/*<Message />*/}
      </LayoutContextProvider>
    </div>);
};

export default Layout;
