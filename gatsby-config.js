module.exports = {
  siteMetadata: {
    title: "Gatsby + Netlify CMS Starter",
    description:
      "This repo contains an example business website that is built with Gatsby, and Netlify CMS.It follows the JAMstack architecture by using Git as a single source of truth, and Netlify for continuous deployment, and CDN distribution.",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sass",
      options: {
        sassOptions: {
          indentedSyntax: true,
        },
      },
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/static/img`,
        name: "uploads",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/pages`,
        name: "pages",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/src/img`,
        name: "images",
      },
    },
    `gatsby-plugin-image`,
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-relative-images",
            options: {
              name: "uploads",
            },
          },
          {
            resolve: "gatsby-remark-images",
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: "gatsby-remark-copy-linked-files",
            options: {
              destinationDir: "static",
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        excludes: ['/zh-HK/404.html', '/zh-CN/404.html', '/en/404.html', '/zh-HK/404/', '/zh-CN/404/', '/en/404/'],
        query: `{
          site {
            siteMetadata {
              siteUrl
            }
          }
          allSite {
            nodes {
              buildTime
            }
          }
          allSitePage {
            nodes {
              path
            }
          }
          allMdx {
            edges {
              node {
                fields {
                  slug
                }
                frontmatter {
                  date
                  languages
                }
              }
            }
             
          }
        }`,
        resolvePages: ({ allSitePage: { nodes: sitePages }, allMdx: { edges: mdxPages }, allSite }) => {
          return sitePages
            .map((page) => {
              const pageFile = mdxPages.find(({ node }) => {
                let fileName
                node?.frontmatter?.languages?.forEach((lang) => {
                  fileName = `/${lang}${node?.fields?.slug}`
                })
                return page.path === fileName
              })
              if (pageFile) return { ...page, ...pageFile?.node?.frontmatter }
              return { ...page, date: allSite?.nodes[0]?.buildTime }
            })
            .filter(
              (page) =>
                page.path.indexOf('/en/') > -1 || page.path.indexOf('/zh-HK/') > -1 || page.path.indexOf('/zh-CN/') > -1
            )
        },
        serialize: ({ path, date }) => {
          return {
            url: path,
            lastmod: date,
          }
        },
        createLinkInHead: true,
      },
    },
    {
      resolve: "gatsby-plugin-purgecss", // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        purgeOnly: ["/all.sass"], // applies purging only on the bulma css file
      },
    }, // must be after other CSS plugins
    "gatsby-plugin-netlify", // make sure to keep it last in the array
  ],
};
