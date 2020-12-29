import React from "react";

import { PostContext } from "../types/query/post";

import Empty from "./empty";
import Page from "../components/page/index/page";

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
    return (<Empty title={`${year} 年 ${month} 月`} navTitle={`${year} 年 ${month} 月`}>
        <Page data={pageContext} />
    </Empty>);
};

export default IndexPage;
