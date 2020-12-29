import React from "react";

import SEO from "../components/public/seo";
import { Link } from "gatsby";
import Header from "../components/public/header";

const NotFoundPage: React.FC = () => {
    return (<>
        <SEO title="页面未找到" />
        <Header title="404" />
        <Link to="/">返回首页</Link>
    </>);
};

export default NotFoundPage
