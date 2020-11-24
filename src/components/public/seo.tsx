/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface SEOProperties {
  description?: string;
  lang?: string;
  meta?: HTMLMetaElement[];
  title: string;
}

const SEO = ({
               description = '',
               lang = 'en',
               meta = [],
               title,
             }: SEOProperties): JSX.Element => {
  const { site } = useStaticQuery(
      graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                    }
                }
            }
        `
  );

  const metaDescription = description || site.siteMetadata.description;

  let titleTemplate = `%s - ${site.siteMetadata.title}`;
  if (title === '') {
    titleTemplate = `${site.siteMetadata.title}`
  }

  return (
      <Helmet
          htmlAttributes={{
            lang,
          }}
          title={title}
          defaultTitle={`${site.siteMetadata.title}`}
          titleTemplate={`%s - ${site.siteMetadata.title}`}
          meta={[
            {
              name: `description`,
              content: metaDescription,
            },
            {
              property: `og:title`,
              content: title,
            },
            {
              property: `og:description`,
              content: metaDescription,
            },
            {
              property: `og:type`,
              content: `website`,
            },
            {
              name: `twitter:card`,
              content: `summary`,
            },
            {
              name: `twitter:creator`,
              content: site.siteMetadata.author,
            },
            {
              name: `twitter:title`,
              content: title,
            },
            {
              name: `twitter:description`,
              content: metaDescription,
            },
          ].concat(meta)}
      />
  );
};

export default SEO;