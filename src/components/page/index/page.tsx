import React from "react";

import PageComponent from "./page-component";
import { Link } from "gatsby";
import { getPageUrl } from "../../../template/homepage";
import {PostContextObj} from "../../../types/query/post";

const PagePaginator = ({data, direction}: {
    data: PostContextObj,
    direction?: 'top' | 'bottom'
}): JSX.Element => {
    let prevEle = (<div className="my-pager__prev hide" >« 上个月</div>);
    if (data.prev !== null) {
        const [ year, month ] = data.prev.split('-');
        prevEle = (<div className="my-pager__prev"><Link to={getPageUrl({year, month})}>« {`${year}-${month}`}</Link></div>);
    }

    let nextEle = (<div className="my-pager__next hide" >下个月  »</div>);
    if (data.next !== null) {
        const [ year, month ] = data.next.split('-');
        nextEle = (<div className="my-pager__next"><Link to={getPageUrl({year, month})}>{`${year}-${month}`}  »</Link></div>);
    }

    let pagerClassName: string
    if (direction === 'top') {
        pagerClassName = 'my-pager__top'
    } else {
        pagerClassName = 'my-pager__bottom'
    }

    return (<div className={`my-pager ${pagerClassName}`}>
        {prevEle}
        <div className="my-pager__center">{data.now} / {data.sum}</div>
        {nextEle}
    </div>);
};

const Page = ({
    data
}: {data: PostContextObj}): JSX.Element => {
    const posts = data.data.nodes
    return (<div className="my-page-wrap">
        <PagePaginator data={data} direction='top'/>
        {posts.map((post, index) => {
            return (<PageComponent key={`${post.frontmatter.date}_${index}`} data={post} />);
        })}
        <PagePaginator data={data} direction={'bottom'} />
    </div>);
};

export default Page;
