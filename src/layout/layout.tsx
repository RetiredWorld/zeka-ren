import React from "react";

import SEO from "../components/public/seo";
import Tools from "../components/public/tools";
import Background from "../components/public/background";
import APlayer from "../components/public/aplayer";
import Nav from "../components/public/nav";
import Footer from "../components/public/footer";
import Message from "../components/public/message";


const Layout: React.FC = ({ children }) => {
    return (<div className="my-layout">
        <SEO title='' />
        <Background />
        <Nav />
        <div className="container">
            <div className="my-container">
                <main className="my-content">
                    { children }
                </main>
                <Footer/>
            </div>
        </div>
        <APlayer />
        <Tools />
        <Message />
    </div>);
};

export default Layout;
