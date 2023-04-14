import React from 'react'
import MdxLayout from '@layouts/MdxLayout'
import { graphql } from 'gatsby'
import { makeStyles, Container, Box, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  btn: {
    marginLeft: theme.spacing(8),
    marginRight: theme.spacing(-1.5),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(4.25),
    },
  },
  infoWrapper: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(3.5),
    boxShadow: `0 1px 0 0 ${theme.palette.grey[400]}`,
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(4),
      paddingTop: theme.spacing(5),
    },
  },
  title: {
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(3.5),
    },
  },
  date: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.body2.fontSize,
    },
  },
}))

export const DocTemplate = ({ title, date, children }) => {
  const classes = useStyles()
  return (
    <Container disableGutters maxWidth='sm'>
      <Box className={classes.infoWrapper}>
        <Typography className={classes.title} variant='h4' color='primary'>
          {title}
        </Typography>
        <Typography className={classes.date} color='primary'>
        </Typography>
      </Box>
      <Box pb={3}>
        <MdxLayout>{children}</MdxLayout>
      </Box>
    </Container>
  )
}

const Doc = ({ data, children }) => {
  const classes = useStyles()
  const { title, date } = data?.mdx?.frontmatter
  if (!data?.mdx) return null

  return (
    <Box className={classes.root}>
      <Container disableGutters maxWidth='lg'>
        <Box px={3}>
          <DocTemplate title={title} date={date}>
            {children}
          </DocTemplate>
        </Box>
      </Container>
    </Box>
  )
}

export default Doc

