import React, { useState } from "react";

import { initContext, IInfoContext, InfoProvider, InfoConsumer } from "./context";
import SEO from "../components/public/seo";
import Tools from "../components/public/tools";
import Background from "../components/public/background";
import APlayer from "../components/public/aplayer";
import Nav from "../components/public/nav";
import Header from "../components/public/header";
import Footer from "../components/public/footer";
import Message from "../components/public/message";


const Layout: React.FC = ({ children }) => {

    const [ info, setInfo ] = useState<IInfoContext>(initContext);

    const checkIfSetInfo = (value: IInfoContext) => {
        if (value.title !== info.title) {
            setInfo(value);
        }
    };

    return (<InfoProvider value={{
        info,
        setInfo: checkIfSetInfo,
    }}>
        <div className="my-layout">
            <Background />
            <Nav />
            <div className="container">
                <div className="my-container">
                    <main className="my-content">
                        <InfoConsumer>
                            {context => {
                                return (<>
                                    <SEO title={context.info.navTitle} description={context.info.description} />
                                    <Header title={context.info.title} />
                                </>);
                            }}
                        </InfoConsumer>

                        { children }
                    </main>
                    <Footer/>
                </div>
            </div>
            <APlayer />
            <Tools />
            <Message />
        </div>
        </InfoProvider>);
};

export default Layout;
