import React from "react";

import Empty from "../template/empty";

import { Link } from "gatsby";

const NotFoundPage: React.FC = () => {
    return (<Empty title="404" navTitle="页面未找到">
        <Link to="/">返回首页</Link>
    </Empty>);
};

export default NotFoundPage
