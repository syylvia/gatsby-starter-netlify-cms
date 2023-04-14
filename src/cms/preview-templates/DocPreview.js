import React from 'react'
import { DocTemplate } from '@templates/Doc'

const DocPreview = ({ entry, widgetFor }) => {
  return (
    <DocTemplate date={entry.getIn(['data', 'date'])} title={entry.getIn(['data', 'title'])}>
      {widgetFor('body')}
    </DocTemplate>
  )
}

export default DocPreview
