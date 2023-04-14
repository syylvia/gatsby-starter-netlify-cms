import React, { useEffect } from 'react'
import MdxLayout from '@layouts/MdxLayout'
import { graphql } from 'gatsby'
import { makeStyles, alpha, Typography, Container, Box, Hidden } from '@material-ui/core'
import { useTranslation, useI18next } from 'gatsby-plugin-react-i18next'

const useStyles = makeStyles((theme) => ({
  root: {},
  breadcrumbsWrapper: {
    position: 'relative',
    zIndex: 1,
    height: 150,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.typography.body2.fontSize,
    '& a': {
      color: theme.palette.primary.contrastText,
    },
    [theme.breakpoints.down('xs')]: {
      height: 85,
    },
  },
  breadcrumbs: {
    whiteSpace: 'nowrap',
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.caption.fontSize,
      padding: theme.spacing(0, 3),
    },
    '& $ol': {
      flexWrap: 'nowrap',
    },
    '& $li:last-child': {
      overflow: 'hidden',
    },
  },
  breadcrumbsTitle: {
    color: theme.palette.primary.contrastText,
    maxWidth: theme.spacing(40),
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  header: {
    paddingTop: theme.spacing(8),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(1),
    },
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      alignItems: 'flex-start',
    },
  },
  topLeft: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  date: {
    color: theme.palette.text.primary,
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    marginRight: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(1),
      marginRight: theme.spacing(2),
      fontSize: theme.typography.body2.fontSize,
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  mark: {
    fontSize: theme.typography.overline.fontSize,
    color: theme.palette.secondary.contrastText,
    padding: theme.spacing(0.25, 1),
    display: 'inline-block',
  },
  contentWrapper: {
    position: 'relative',
    padding: theme.spacing(0, 3),
    minHeight: theme.spacing(80),
  },
  content: {
    paddingBottom: theme.spacing(30),
    position: 'relative',
    zIndex: 2,
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(15),
    },
  },
  image: {
    marginTop: theme.spacing(-4),
    borderRadius: theme.spacing(0.75),
    overflow: 'hidden',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(-6),
    },
  },
  moreWrapper: {
    padding: theme.spacing(5, 3),
    backgroundColor: alpha(theme.palette.primary.main, 0.03),
    [theme.breakpoints.down('xs')]: {
      backgroundColor: '#F8F9FA',
    },
  },
}))

const morePostTitle = {
  'health-tips': 'menu.health_tips',
  promotions: 'menu.promotions',
  updates: 'menu.updates',
}

export const PostTemplate = ({ date, cpTitle, title, type, href, children }) => {
  const { t } = useTranslation()
  const classes = useStyles()

  return (
    <>
      <Box className={classes.contentWrapper}>
        <Container className={classes.content} disableGutters maxWidth='sm'>
          <Box className={classes.header}>
            <Box className={classes.top}>
              <Box className={classes.topLeft}>
                {type && (
                  <Box
                  >
                    {t(`options.post_types.${type}`)}
                  </Box>
                )}
              </Box>
            </Box>
            <Typography variant='h5' color='primary'>
              {cpTitle || title}
            </Typography>
          </Box>
          <MdxLayout>{children}</MdxLayout>
        </Container>
      </Box>
    </>
  )
}

const Post = ({ data, pageContext, location: { href }, children }) => {
  const { sectionPath, regex } = pageContext
  const { t } = useTranslation()
  const classes = useStyles()
  const { navigate } = useI18next()

  useEffect(() => {
    if (!data?.mdx) {
      navigate(`/whats-new/${sectionPath === 'campaign-page-posts' ? 'campaign/' : sectionPath}`, { replace: true })
    }
  }, [data?.mdx])
  if (!data?.mdx) return null
  const { date, cpTitle, title, type } = data?.mdx?.frontmatter


  return (
    <Box className={classes.root}>
      <Container disableGutters maxWidth='xl'>
        <Box className={classes.breadcrumbsWrapper}>
          <Hidden xsDown>
            <Container disableGutters maxWidth='sm'>
            </Container>
          </Hidden>
        </Box>
        <PostTemplate
          date={date}
          cpTitle={cpTitle}
          title={title}
          type={type}
          href={href}
        >
          {children}
        </PostTemplate>
      </Container>
    </Box>
  )
}

export default Post
