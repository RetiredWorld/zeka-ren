import React from "react";

import { PostContext } from "../types/query/post";

import SEO from "../components/public/seo";
import Page from "../components/page/index/page";
import Header from "../components/public/header";

export function getPageUrl({year, month, hashId}: {year: number | string, month: number | string, hashId?:string}): string {
    let myUrl = `/${year}/${month}`
    if (hashId) {
        myUrl += `#${hashId}`
    }
    return myUrl;
}

const IndexPage: React.FC<PostContext> = ({ pageContext })=> {
    const  { data } = pageContext;
    const [ year, month ] = data.yearMonth.split('-');
    return (<>
        <SEO title={`${year} 年 ${month} 月`}/>
        <Header title={`${year} 年 ${month} 月`} />
        <Page data={pageContext} />
    </>);
};

export default IndexPage;
