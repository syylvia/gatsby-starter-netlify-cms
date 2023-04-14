import React from 'react'
import { TAndCTemplate } from '@templates/T&C'

const TAndCPreview = ({ entry, widgetFor }) => {
  return (
    <TAndCTemplate date={entry.getIn(['data', 'date'])} title={entry.getIn(['data', 'title'])}>
      {widgetFor('body')}
    </TAndCTemplate>
  )
}

export default TAndCPreview
