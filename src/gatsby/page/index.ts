import { CreatePagesArgs } from 'gatsby';
import { ArchiveQuery } from '../../types/query/archive';
import { PostQuery } from '../../types/query/post';

import createArchive from './create-archive';
import createHomepage from './create-homepage';

const myCreatePages = async ({ actions, graphql, reporter }: CreatePagesArgs) => {
    const archiveResult = await graphql(`query ArchiveQuery {
  allFile(sort: {fields: [childMarkdownRemark___frontmatter___date, childMarkdownRemark___frontmatter___date], order: DESC}, filter: {extension: {eq: "md"}, sourceInstanceName: {eq: "diary"}}) {
    nodes {
      childMarkdownRemark {
        frontmatter {
          title
          date
        }
      }
    }
  }
}`);

    if (archiveResult.errors) {
        reporter.panicOnBuild(`Error while running archive query.`);
        return ;
    }

    createArchive(archiveResult.data as ArchiveQuery, actions);

    const postResult = await graphql(`query DiaryAll {
  allFile(filter: {sourceInstanceName: {eq: "diary"}, extension: {eq: "md"}}, sort: {fields: [childMarkdownRemark___frontmatter___date, childMarkdownRemark___frontmatter___title], order: DESC}) {
    group(field: childMarkdownRemark___fields___year_month) {
      nodes {
        childMarkdownRemark {
          frontmatter {
            date
            images {
              alt
              src {
                image: childImageSharp {
                  fluid(jpegQuality: 80, jpegProgressive: true, toFormat: JPG, maxWidth: 1400) {
                    aspectRatio
                    src
                    srcSet
                  }
                }
              }
            }
            tags
            title
          }
          html
        }       
      }
      yearMonth: fieldValue

    }
  }
}

`);

    if (postResult.errors) {
        reporter.panicOnBuild(`Error while running post query.`);
        return ;
    }

    createHomepage(postResult.data as PostQuery, actions);
};

export default myCreatePages;
