const _ = require('lodash')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const { fmImagesToRelative } = require('gatsby-remark-relative-images')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createRedirect, createPage } = actions

  const careers = await graphql(`
    {
      allMdx(filter: { fields: { slug: { regex: "/join-us/" } } }, sort: { fields: frontmatter___date, order: DESC }) {
        nodes {
          id
        }
      }
    }
  `)

  if (careers.errors) return reporter.panicOnBuild(`Error while running GraphQL query.`)

  const allMdxQuery = await graphql(`
    {
      allMdx(limit: 1000, filter: { frontmatter: { hide: { ne: true } } }) {
        nodes {
          id
          fields {
            slug
          }
          parent {
            ... on File {
              relativeDirectory
            }
          }
          internal {
            contentFilePath
          }
          frontmatter {
            languages
            date
          }
        }
      }
    }
  `)

  if (allMdxQuery.errors) return reporter.panicOnBuild(`Error while running GraphQL query.`)

  const postTemplate = resolve(__dirname, 'src/templates/Post.js')
  const tAndCTemplate = resolve(__dirname, 'src/templates/T&C.js')
  const careerTemplate = resolve(__dirname, 'src/templates/Career.js')

  const allMdxList = allMdxQuery.data.allMdx.nodes

  allMdxList?.forEach((mdx) => {
    let path = mdx.fields?.slug
    if (!path) return
    // if (
    //   mdx.parent.relativeDirectory === 'health-tips' ||
    //   mdx.parent.relativeDirectory === 'promotions' ||
    //   mdx.parent.relativeDirectory === 'updates' ||
    //   mdx.parent.relativeDirectory === 'campaign-page-posts'
    // )
    //   return
    let component = null,
      defer = false

    switch (mdx.parent.relativeDirectory) {
      case 'terms-and-conditions':
        component = `${tAndCTemplate}?__contentFilePath=${mdx.internal.contentFilePath}`
        defer = true
        break
      case 'join-us':
        component = `${careerTemplate}?__contentFilePath=${mdx.internal.contentFilePath}`
        defer = true
        break
      default:
        component = `${postTemplate}?__contentFilePath=${mdx.internal.contentFilePath}`
        defer = moment(mdx?.frontmatter?.date)?.isBefore('2021-12-31')
        break
    }

    mdx?.frontmatter?.languages?.forEach((lang) => {
      // if (lang === defaultLanguage) {
      //   createPage({
      //     path: `${path}`,
      //     component,
      //     context: {
      //       slug: path,
      //       sectionPath: mdx.parent.relativeDirectory,
      //       regex: `/${mdx.parent.relativeDirectory}/`,
      //       id: mdx.id,
      //       contentFilePath: mdx.internal.contentFilePath,
      //       curPath: `${path}`,
      //     },
      //     // defer,
      //   })
      //   createRedirect({
      //         fromPath: `/${lang}${path}`,
      //         // redirectInBrowser: true,
      //         isPermanent: true,
      //         toPath: path,
      //   })
      // }
      // else {
      //   createPage({
      //     path: `/${lang}${path}`,
      //     component,
      //     context: {
      //       slug: path,
      //       sectionPath: mdx.parent.relativeDirectory,
      //       regex: `/${mdx.parent.relativeDirectory}/`,
      //       id: mdx.id,
      //       contentFilePath: mdx.internal.contentFilePath,
      //       curPath: `/${lang}${path}`,
      //     },
      //     // defer,
      //   })
      // }

      createPage({
        path: `/${lang}${path}`,
        component,
        context: {
          slug: path,
          sectionPath: mdx.parent.relativeDirectory,
          regex: `/${mdx.parent.relativeDirectory}/`,
          id: mdx.id,
          contentFilePath: mdx.internal.contentFilePath,
          curPath: `/${lang}${path}`,
        },
        // defer,
      })
      // if (lang === defaultLanguage)
      //   createPage({
      //     path,
      //     component,
      //     context: {
      //       slug: path,
      //       sectionPath: mdx.parent.relativeDirectory,
      //       regex: `/${mdx.parent.relativeDirectory}/`,
      //       id: mdx.id,
      //       contentFilePath: mdx.internal.contentFilePath,
      //       curPath: path,
      //     },
      //     // defer,
      //   })
      if (lang === defaultLanguage)
        createRedirect({
          fromPath: path,
          // redirectInBrowser: true,
          isPermanent: true,
          toPath: `/${lang}${path}`,
        })
    })
  })

  // For development env to show doc pages
  if (process.env.GATSBY_ENV === 'development') {
    const allDocQuery = await graphql(`
      {
        allMdx(limit: 1000, filter: { internal: { contentFilePath: { regex: "/docs/" } } }) {
          nodes {
            id
            fields {
              slug
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    `)
    if (allDocQuery.errors) return reporter.panicOnBuild(`Error while running GraphQL query.`)

    const docTemplate = resolve(__dirname, 'src/templates/Doc.js')
    const allDocList = allDocQuery.data.allMdx.nodes
    allDocList?.forEach((node) => {
      let slug = node?.fields?.slug
      if (!slug) return
      createPage({
        path: `/docs${slug}`,
        component: `${docTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
        context: {
          slug,
        },
      })
    })
  }
}


exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createRedirect, createPage } = actions

  const careers = await graphql(`
    {
      allMdx(filter: { fields: { slug: { regex: "/join-us/" } } }, sort: { fields: frontmatter___date, order: DESC }) {
        nodes {
          id
        }
      }
    }
  `)

  if (careers.errors) return reporter.panicOnBuild(`Error while running GraphQL query.`)

  const allMdxQuery = await graphql(`
    {
      allMdx(limit: 1000, filter: { frontmatter: { hide: { ne: true } } }) {
        nodes {
          id
          fields {
            slug
          }
          parent {
            ... on File {
              relativeDirectory
            }
          }
          internal {
            contentFilePath
          }
          frontmatter {
            languages
            date
          }
        }
      }
    }
  `)

  if (allMdxQuery.errors) return reporter.panicOnBuild(`Error while running GraphQL query.`)

  const postTemplate = resolve(__dirname, 'src/templates/Post.js')
  const tAndCTemplate = resolve(__dirname, 'src/templates/T&C.js')
  const careerTemplate = resolve(__dirname, 'src/templates/Career.js')

  const allMdxList = allMdxQuery.data.allMdx.nodes

  allMdxList?.forEach((mdx) => {
    let path = mdx.fields?.slug
    if (!path) return
    // if (
    //   mdx.parent.relativeDirectory === 'health-tips' ||
    //   mdx.parent.relativeDirectory === 'promotions' ||
    //   mdx.parent.relativeDirectory === 'updates' ||
    //   mdx.parent.relativeDirectory === 'campaign-page-posts'
    // )
    //   return
    let component = null,
      defer = false

    switch (mdx.parent.relativeDirectory) {
      case 'terms-and-conditions':
        component = `${tAndCTemplate}?__contentFilePath=${mdx.internal.contentFilePath}`
        defer = true
        break
      case 'join-us':
        component = `${careerTemplate}?__contentFilePath=${mdx.internal.contentFilePath}`
        defer = true
        break
      default:
        component = `${postTemplate}?__contentFilePath=${mdx.internal.contentFilePath}`
        defer = moment(mdx?.frontmatter?.date)?.isBefore('2021-12-31')
        break
    }

    mdx?.frontmatter?.languages?.forEach((lang) => {
      // if (lang === defaultLanguage) {
      //   createPage({
      //     path: `${path}`,
      //     component,
      //     context: {
      //       slug: path,
      //       sectionPath: mdx.parent.relativeDirectory,
      //       regex: `/${mdx.parent.relativeDirectory}/`,
      //       id: mdx.id,
      //       contentFilePath: mdx.internal.contentFilePath,
      //       curPath: `${path}`,
      //     },
      //     // defer,
      //   })
      //   createRedirect({
      //         fromPath: `/${lang}${path}`,
      //         // redirectInBrowser: true,
      //         isPermanent: true,
      //         toPath: path,
      //   })
      // }
      // else {
      //   createPage({
      //     path: `/${lang}${path}`,
      //     component,
      //     context: {
      //       slug: path,
      //       sectionPath: mdx.parent.relativeDirectory,
      //       regex: `/${mdx.parent.relativeDirectory}/`,
      //       id: mdx.id,
      //       contentFilePath: mdx.internal.contentFilePath,
      //       curPath: `/${lang}${path}`,
      //     },
      //     // defer,
      //   })
      // }

      createPage({
        path: `/${lang}${path}`,
        component,
        context: {
          slug: path,
          sectionPath: mdx.parent.relativeDirectory,
          regex: `/${mdx.parent.relativeDirectory}/`,
          id: mdx.id,
          contentFilePath: mdx.internal.contentFilePath,
          curPath: `/${lang}${path}`,
        },
        // defer,
      })
      // if (lang === defaultLanguage)
      //   createPage({
      //     path,
      //     component,
      //     context: {
      //       slug: path,
      //       sectionPath: mdx.parent.relativeDirectory,
      //       regex: `/${mdx.parent.relativeDirectory}/`,
      //       id: mdx.id,
      //       contentFilePath: mdx.internal.contentFilePath,
      //       curPath: path,
      //     },
      //     // defer,
      //   })
      if (lang === defaultLanguage)
        createRedirect({
          fromPath: path,
          // redirectInBrowser: true,
          isPermanent: true,
          toPath: `/${lang}${path}`,
        })
    })
  })

  // For development env to show doc pages
  if (process.env.GATSBY_ENV === 'development') {
    const allDocQuery = await graphql(`
      {
        allMdx(limit: 1000, filter: { internal: { contentFilePath: { regex: "/docs/" } } }) {
          nodes {
            id
            fields {
              slug
            }
            internal {
              contentFilePath
            }
          }
        }
      }
    `)
    if (allDocQuery.errors) return reporter.panicOnBuild(`Error while running GraphQL query.`)

    const docTemplate = resolve(__dirname, 'src/templates/Doc.js')
    const allDocList = allDocQuery.data.allMdx.nodes
    allDocList?.forEach((node) => {
      let slug = node?.fields?.slug
      if (!slug) return
      createPage({
        path: `/docs${slug}`,
        component: `${docTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
        context: {
          slug,
        },
      })
    })
  }
}

