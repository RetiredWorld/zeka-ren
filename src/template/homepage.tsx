import React from 'react';

import { PostContext } from '../types/query/post';

import Header from '../components/public/header';
import SEO from '../components/public/seo';
import Page from '../components/page/index/page';

export function getPageUrl({ year, month, hashId }: {year: number | string, month: number | string, hashId?:string}): string {
    let myUrl = `/${year}/${month}`;
    if (hashId) {
        myUrl += `#${hashId}`;
    }
    return myUrl;
}


const IndexPage: React.FC<PostContext> = ({ pageContext })=> {
    const  { data } = pageContext;
    const [ year, month ] = data.yearMonth.split('-');
    const dateStr = `${year} 年 ${month} 月`;

    return (<>
        <SEO title={dateStr} />
        <Header title={dateStr} />
        <Page data={pageContext} />
    </>);
};

export default IndexPage;
