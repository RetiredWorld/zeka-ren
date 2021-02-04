import { getPageUrl } from '../template/homepage';

import { ISiteMetadata } from '../gatsby/config';

interface IPost {
    site: {
        siteMetadata: ISiteMetadata
    }
    allMarkdownRemark: {
        nodes: {
            html: string
            frontmatter: {
                date: string
                title: string
                images: {
                    src: {
                        childImageSharp: {
                            fixed: {
                                src: string
                            }
                        }
                    }
                    alt: string
                }[]
            }
            fields: {
                year_month: string
            }
        }[]
    }
}

export interface IFeed {
    // eslint-disable-next-line no-unused-vars
    serialize(arg: {
        query: IPost}
    ): any
    query: string
    output: string
    title: string
}

const flagFeed: IFeed = {
    query: `query FeedAll {
  allMarkdownRemark(limit: 15, sort: {order: DESC, fields: [frontmatter___date, frontmatter___title]}, filter: {frontmatter: {title: {ne: "about.md"}}}) {
    nodes {
      html
      frontmatter {
        date
        title
        images {
          alt
          src {
            childImageSharp {
              fixed {
                src
              }
            }
          }
        }
      }
      fields {
        year_month
      }
    }
  }
}`,
    serialize({ query }) {
        return query.allMarkdownRemark.nodes.map(node => {
            const [ year, month ] = node.fields.year_month.split('-');
            const htmlItem = node.html + node.frontmatter.images?.map(item=>{
                const src = item.src.childImageSharp.fixed.src;
                return `<img src="${src}" alt=${(item.alt === null)?src: item.alt}>`;
            }).join('');
            return Object.assign({}, node.frontmatter, {
                date: node.frontmatter.date,
                description: htmlItem,
                url: query.site.siteMetadata.siteUrl + getPageUrl({ year, month, hashId: node.frontmatter.title }),
            });
        });
    },
    output: `/rss.xml`,
    title: `zeka 的 flag 订阅`,
};

const myFeeds = [ flagFeed ];

export default myFeeds;
