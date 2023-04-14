import React from 'react'
import MdxLayout from '@layouts/MdxLayout'
import { graphql, navigate } from 'gatsby'
import { makeStyles, Container, Box, Dialog, IconButton, useTheme, useMediaQuery, Typography } from '@material-ui/core'
import { useTranslation } from 'gatsby-plugin-react-i18next'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  header: {
    position: 'sticky',
    top: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(0, 6),
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 2),
    },
  },
  btn: {
    marginLeft: theme.spacing(8),
    marginRight: theme.spacing(-1.5),
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(4.25),
    },
  },
  icon: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(2.5),
      height: theme.spacing(2.5),
    },
  },
  closeBtn: {
    marginLeft: 'auto',
    '& rect': {
      fill: theme.palette.primary.main,
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
  type: {
    marginBottom: theme.spacing(0.5),
    color: '#D2C7BC',
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
  },
  title: {
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(3.5),
    },
  },
  company: {
    marginBottom: theme.spacing(4),
    color: theme.palette.supporting.supporting03,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.body2.fontSize,
    },
  },
  date: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.body2.fontSize,
    },
  },
  region: {
    backgroundColor: theme.palette.supporting.supporting01,
    padding: theme.spacing(0, 1.5),
    color: theme.palette.secondary.contrastText,
    fontSize: theme.typography.caption.fontSize,
    height: theme.spacing(3.5),
    borderRadius: theme.spacing(0.5),
    display: 'flex',
    alignItems: 'center',
    width: 'fit-content',
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(3),
      fontSize: 11,
    },
  },
}))

export const CareerTemplate = ({ title, region, date, children }) => {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <Container disableGutters maxWidth='sm'>
      <Box className={classes.infoWrapper}>
        {/* <Typography className={classes.type} variant='caption'>
                  {type}
                </Typography> */}
        <Typography className={classes.title} variant='h4' color='primary'>
          {title}
        </Typography>
        <Typography className={classes.company} variant='body1'>
          {t('common.take2_health')}
        </Typography>
        <Typography className={classes.date} color='primary'>
          {t('common.release_date')}:
        </Typography>
        <Box className={classes.region}>{t(`options.career_regions.${region}`)}</Box>
      </Box>
      <Box pb={3}>
        <MdxLayout>{children}</MdxLayout>
      </Box>
    </Container>
  )
}

const Career = ({ data, children }) => {
  const classes = useStyles()
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('xs'))
  const { title, region, date } = data?.mdx?.frontmatter
  if (!data?.mdx) return null
  const handleClose = (params) => navigate(-1)

  return (
    <Box className={classes.root}>
      <Dialog open fullScreen onClose={handleClose} aria-labelledby='close' transitionDuration={0}>
        <Container disableGutters maxWidth='lg'>
          <Box className={classes.header}>
            <Box width={matches ? 100 : 145}>
            </Box>
          </Box>
          <Box px={3}>
            <CareerTemplate title={title} region={region} date={date}>
              {children}
            </CareerTemplate>
          </Box>
        </Container>
      </Dialog>
    </Box>
  )
}

export default Career

