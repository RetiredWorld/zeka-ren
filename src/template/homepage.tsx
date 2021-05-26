import React from 'react';

import { PostContext } from '../types/query/post';

import Page from '../components/page/index/page';
import { IMetaInfo } from '../layout/meta';

export const homepageMetaInfo: IMetaInfo = {
    reg: [ /^\/$/, /\/\d+\/\d+/ ],
    genInfo(key: string, { props }: { props: PostContext }){
        const yearData = props.pageContext.data.yearMonth;
        let [ year, month ] = yearData.split('-');
        if (year === undefined || month === undefined) {
            [ , year, month ] = key.split('-');
        }
        const navTitle = `${year} 年 ${month} 月`;
        const title = navTitle;
        const description = `归档: ${navTitle}`;
        return {
            title,
            navTitle,
            description,
        };
    },
};

export function getPageUrl({ year, month, hashId }: {year: number | string, month: number | string, hashId?:string}): string {
    let myUrl = `/${year}/${month}`;
    if (hashId) {
        myUrl += `#${hashId}`;
    }
    return myUrl;
}


const IndexPage: React.FC<PostContext> = ({ pageContext })=> {
    return (<Page data={pageContext} />);
};

export default IndexPage;
