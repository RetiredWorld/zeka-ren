import { Actions  } from 'gatsby';

import path from 'path';
import { rootDir } from '../config';
import { NodeItem, PostQuery } from '../../types/query/post';

const homepageTemplate = path.join(rootDir, 'src/template/homepage.tsx');
const emptyTemplate = path.join(rootDir, 'src/template/empty.tsx');

const sortAll = (res: PostQuery): PostQuery => {
    sortYearMonth(res);
    res.allFile.group.forEach(groupItem => {
        sortDay(groupItem.nodes);
    });
    return res;
};


const sortYearMonth = (res: PostQuery): PostQuery => {
    res.allFile.group.sort((a, b)=> {
        const [ aYear, aMonth ] = a.yearMonth.split('-').map(item=>parseInt(item));
        const [ bYear, bMonth ] = b.yearMonth.split('-').map(item=>parseInt(item));

        if ( aYear > bYear ) {
            return -1;
        } else if ( aMonth > bMonth ) {
            return -1;
        }

        return 1;
    });
    return res;
};

const sortDay = (nodes: NodeItem[]): NodeItem[] => {
    nodes.sort((a, b) => {
        const aDay = a.childMarkdownRemark.frontmatter.date.split('-')[2].toString();
        const bDay = b.childMarkdownRemark.frontmatter.date.split('-')[2].toString();

        if (aDay > bDay) {
            return -1;
        }
        return 1;
    });
    return nodes;
};

export default function createHomepage(res: PostQuery, actions: Actions) {
    sortAll(res);

    let createdHomepage = false;
    const group = res.allFile.group;
    group.forEach((posts, index)=>{
        const [ year, month ] = posts.yearMonth.split('-');
        let prev: string | null = null;
        let next: string | null = null;

        if (index !== 0) {
            prev = group[index - 1].yearMonth;
        }

        if (index !== group.length - 1) {
            next = group[index + 1].yearMonth;
        }

        // TODO: remove fakeContext once issue https://github.com/gatsbyjs/gatsby/issues/26520 resolved
        const fakeContext = 'fakeContext';
        const context = {
            data: posts,
            prev,
            next,
            now: index + 1,
            sum: group.length,
        };

        // fakeContext
        actions.createPage({
            path: `${year}/${month}`,
            component: homepageTemplate,
            context: fakeContext,
        });

        actions.createPage({
            path: `${year}/${month}`,
            component: homepageTemplate,
            context,
        });

        if (index === 0) {
            // fakeContext
            actions.createPage({
                path: `/`,
                component: homepageTemplate,
                context: fakeContext,
            });

            actions.createPage({
                path: '/',
                component: homepageTemplate,
                context,
            });
            createdHomepage = true;
        }


    });
    if (!createdHomepage) {
        actions.createPage({
            path: '/',
            component: emptyTemplate,
            context: {},
        });
    }
}
