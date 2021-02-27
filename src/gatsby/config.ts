import path from 'path';

import feeds from '../vendors/rss';

export const rootDir = path.join(__dirname, '../../');

export interface ISiteMetadata {
    title: string
    description: string
    author: string
    siteUrl: string
}

const siteMetadata: ISiteMetadata = {
    title: `Zeka 的记事本`,
    description: `分享不值得纪念的东西`,
    author: `zeka`,
    siteUrl: `https://flag.zeka.cloud`,
};

const plugins: MyPlugin[] = [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-fontawesome-css`,
    `gatsby-transformer-json`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-no-sourcemaps`,
    {
        resolve: `gatsby-plugin-feed`,
        options: {
            query: `{
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }`,
            feeds,
        },
    },
    {
        resolve: `gatsby-plugin-layout`,
        options: {
            component: require.resolve(`${rootDir}/src/layout/layout.tsx`),
        },
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `audio`,
            path: `${rootDir}/stuff/audio`,
        },
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `friends`,
            path: `${rootDir}/stuff/friends`,
        },
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `diary`,
            path: `${rootDir}/stuff/diary`,
        },
    },
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `about`,
            path: `${rootDir}/stuff/about`,
        },
    },
    {
        resolve: `gatsby-transformer-remark`,
        options: {
            plugins: [
                {
                    resolve: `gatsby-remark-prismjs`,
                    options: {
                        classPrefix: 'language-',

                        inlineCodeMarker: null,
                        aliases: {},
                        showLineNumbers: false,
                        noInlineHighlight: false,
                        languageExtensions: [
                            {
                                language: 'superscript',
                                extend: 'javascript',
                                definition: {
                                    superscript_types: /(SuperType)/,
                                },
                                insertBefore: {
                                    function: {
                                        superscript_keywords: /(superif|superelse)/,
                                    },
                                },
                            },
                        ],
                        prompt: {
                            user: 'zeka',
                            host: 'laz',
                            global: false,
                        },
                        escapeEntities: {},
                    },
                },
                {
                    resolve: `gatsby-remark-katex`,
                    options: {
                        // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
                        strict: `ignore`,
                    },
                },
                {
                    resolve: `gatsby-remark-admonitions`,
                    options: {
                        customTypes: {
                            custom: {
                                keyword: 'test',
                                emoji: '💻',
                                svg: `<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'><path fill-rule='evenodd' d='M15 2H1c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h5.34c-.25.61-.86 1.39-2.34 2h8c-1.48-.61-2.09-1.39-2.34-2H15c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 9H1V3h14v8z'></path></svg>`,
                            },
                        },
                        tag: ':::',
                        icons: 'svg',
                    },
                },
            ],
        },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
        resolve: `gatsby-plugin-manifest`,
        options: {
            name: `Zeka and his Flag`,
            short_name: `zeka_flag`,
            start_url: `/`,
            background_color: `#f6f6f6`,
            theme_color: `#f6f6f6`,
            display: `minimal-ui`,
            icon: `src/images/icon.jpg`, // This path is relative to the root of the site.
        },
    },
    {
        resolve: `gatsby-plugin-google-analytics`,
        options: {
            // The property ID; the tracking code won't be generated without it
            trackingId: 'G-38TX28QRZN',
            // Defines where to place the tracking script - `true` in the head and `false` in the body
            head: false,
            // Setting this parameter is optional
            anonymize: true,
            // Setting this parameter is also optional
            respectDNT: true,
            pageTransitionDelay: 0,
            sampleRate: 5,
            siteSpeedSampleRate: 10,
            cookieDomain: 'flag.zeka.cloud',
        },
    },
    `gatsby-plugin-sitemap`,
    {
        resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
        options: {
            analyzerMode: 'disabled',
            // analyzerMode: 'server',
            analyzerPort: '8888',
            defaultSizes: 'gzip',
        },
    },
    {
        resolve: `gatsby-plugin-offline`,
        options: {
            workboxConfig: {
                runtimeCaching: [
                    {
                        urlPattern: /(\.js$|\.css$|static\/)/,
                        handler: `CacheFirst`,
                    },
                    {
                        urlPattern: /^https?:.*\/page-data\/.*\/(page-data|app-data)\.json$/,
                        handler: `NetworkFirst`,
                        options: {
                            networkTimeoutSeconds: 1,
                        },
                    },
                    {
                        urlPattern: /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
                        handler: `StaleWhileRevalidate`,
                    },
                    {
                        urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
                        handler: `StaleWhileRevalidate`,
                    },
                    {
                        urlPattern: /\/$/,
                        handler: `NetworkFirst`,
                        options: {
                            networkTimeoutSeconds: 2,
                        },
                    },
                ],
            },
        },
    },
    {
        resolve: `gatsby-plugin-netlify`,
        options: {
            headers: {
                '/*': [
                    'X-XSS-Protection: 1; mode=block',
                    'X-Content-Type-Options: nosniff',
                    'strict-transport-security: max-age=63072000; includeSubDomains; preload',
                ],
            },
            allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
            mergeSecurityHeaders: true, // boolean to turn off the default security headers
            mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
            mergeCachingHeaders: true, // boolean to turn off the default caching headers
            generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
        },
    },
];

const config = {
    siteMetadata,
    plugins,
};

export default config;

interface PluginWithOptions {
    resolve: string,
    options?: {}
}

type MyPlugin = string | PluginWithOptions;
