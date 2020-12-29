import React from "react";

import SEO from "../components/public/seo";
import Header from "../components/public/header";

const Empty: React.FC = () => {

    return (<>
        <SEO title={''} />
        <Header title="空白" />
    </>);
};

export default Empty;
