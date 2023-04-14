import React, { useEffect, useRef, useState } from 'react'
import { create } from 'jss'
import { ThemeProvider, jssPreset, StylesProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

const JssProvider = ({ children }) => {
  const jssRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [jss, setJss] = useState(null)

  useEffect(() => {
    if (jssRef) {
      setReady(true)
      setJss(
        create({
          ...jssPreset(),
          // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
          insertionPoint: jssRef.current || null,
        })
      )
    }
  }, [jssRef])

  return (
    <>
      <div ref={jssRef} />
      {ready && (
        <StylesProvider jss={jss}>
          <ThemeProvider>
            <CssBaseline></CssBaseline>
            {children}
          </ThemeProvider>
        </StylesProvider>
      )}
    </>
  )
}

export default JssProvider
