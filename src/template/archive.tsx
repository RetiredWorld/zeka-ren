import React from 'react';

import {
    ArchiveContext,
    NodeItem,
    ISortDate, ISortedItemBase, ISortedItemDay, ISortedItemMonth, ISortedItems, ISortedItemYear,
    ParseDateRes,
} from '../types/query/archive';

import { Link } from 'gatsby';

import { getPageUrl } from './homepage';
import { IMetaInfo } from '../layout/meta';

function parseStr(date: string | number, length: number = 2): string {
    let strDate = date.toString();
    const offset = length - strDate.length;
    if (offset > 0) {
        strDate = '0'.repeat(offset) + strDate;
    }
    return strDate;
}

class SortDate implements ISortDate {
    unsortedDate = [];
    sortedDate = {
        order: [],
    };

    constructor(data:  NodeItem[] ) {
        this.unsortedDate = data;
    }

    private parseDate(dateStr: string): ParseDateRes {
        const group = dateStr.split('-').map(str=>parseInt(str));
        return {
            year: group[0],
            month: group[1],
            day: group[2],
        };
    }

    private static sortItem(sortObj: ISortedItemBase): number[] {
        Object.keys(sortObj).filter(item=>(item !== 'order')).map(Number);
        return Object.keys(sortObj).filter(item=>(item !== 'order')).map(Number).sort((a, b)=>b-a);
    }

    process() {
        let nowYear = -1;
        let nowMonth = -1;
        const a: ISortedItems = this.sortedDate;
        const mySort = SortDate.sortItem;

        this.unsortedDate.forEach((item: NodeItem)=>{
            const frontmatter = item.childMarkdownRemark.frontmatter;
            const postTime = this.parseDate(frontmatter.date);
            frontmatter.date = parseStr(frontmatter.date);

            if ( nowYear !== postTime.year ) {
                if ( nowYear !== -1 ) {
                    a[nowYear].order = mySort(a[nowYear]);
                    a[nowYear][nowMonth].order = mySort(a[nowYear][nowMonth]);
                }
                nowYear = postTime.year;
                nowMonth = -1;
                a[nowYear] = {
                    order: [],
                };
            }

            if ( nowMonth !== postTime.month ) {
                if ( nowMonth !== -1 ) {
                    a[nowYear][nowMonth].order = mySort(a[nowYear][nowMonth]);
                }
                nowMonth = postTime.month;
                a[nowYear][nowMonth] = {
                    order: [],
                };
            }

            if (a[nowYear][nowMonth][postTime.day] === undefined) {
                a[nowYear][nowMonth][postTime.day] = [];
            }

            a[nowYear][nowMonth][postTime.day].push(frontmatter);

        });

        if ( nowYear !== -1 ) {
            a[nowYear].order = mySort(a[nowYear]);
        }

        if ( nowMonth !== -1 ) {
            a[nowYear][nowMonth].order = mySort(a[nowYear][nowMonth]);
        }

        a.order = mySort(a);

        return this.sortedDate;
    }
}

const ArchiveDay: React.FC<{
    myDate: ISortedItemDay,
    myKey: string,
    month: number | string,
    year: string | number
}> = ({ myDate, myKey, month, year }) => {
    return (<>
        { myDate.order.map(day => {
            const date = `${parseStr(month)}-${parseStr(day)}`;
            const key = `${myKey}-${day}`;
            return (<div key={key}>
                { myDate[day].map((item, index) => {
                    return (<li key={`${key}-${index}`} className="archive-item"><p>{date} » <Link className="archive-item__link"
                                                                       to={getPageUrl({ year, month, hashId: item.title })}>{ item.title } </Link></p>
                    </li>);
                }) }
            </div>);
        }) }
    </>);
};

const ArchiveMonth: React.FC<{ myDate: ISortedItemMonth, myKey: string, year: string | number }> = ({ myDate, myKey, year }) => {
    return (<>
        { myDate.order.map(month => {
            let num = 0;
            myDate[month].order.forEach(day => {
                num += myDate[month][day].length;
            });
            const key = `${myKey}-${month}`;
            return (<div key={key}>
                <h2 className="archive-month">{ month }月 ({ num }篇)</h2>
                <ul className="archive-list">
                    <ArchiveDay myDate={myDate[month]} myKey={key} month={month} year={year} />
                </ul>
            </div>);
        }) }
    </>);
};

const ArchiveYear: React.FC<{myDate: ISortedItemYear }> = ({ myDate }) => {

    return (<>
        { myDate.order.map(year=>{
            const key = year.toString();
            return (<div key={key}>
                <h1 className="archive-year">{ year }</h1>
                <ArchiveMonth myDate={myDate[year]} myKey={key} year={year}/>
            </div>);
        }) }
    </>);
};

export const archiveMetaInfo: IMetaInfo = {
    reg: /\/archive/,
    genInfo() {
        return {
            title: '归档',
            navTitle: '归档',
            description: '总归档',
        };
    },
};

const Archive: React.FC<ArchiveContext> = ({ pageContext }) => {
    const sortObj = new SortDate(pageContext.data.allFile.nodes);
    const sortedDate = sortObj.process();

    return (<div className="archive-wrap">
            <ArchiveYear myDate={sortedDate} />
        </div>);
};

export default Archive;
