import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import Audio from './Audio'

const shortCodes = { Audio }

const MdxLayout = ({ children }) => {
  return <MDXProvider components={shortCodes}>{children}</MDXProvider>
}

export default MdxLayout
