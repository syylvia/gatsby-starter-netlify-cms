import React from 'react'
import JssProvider from './JssProvider'
import '../i18n'

const Layout = (Component) => (props) => {
  return <JssProvider>{<Component {...props} />}</JssProvider>
}

export default Layout
