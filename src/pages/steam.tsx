import React from "react";

import SEO from "../components/public/seo";
import { Link } from "gatsby";
import Header from "../components/public/header";

const SteamPage = (): JSX.Element => {
    return (<>
        <SEO title="Zeka 的 Steam" />
        <Header title="Steam" />
        <Link to="/">返回首页</Link>
    </>);
};

export default SteamPage;
