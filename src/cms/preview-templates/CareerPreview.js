import React from 'react'
import { CareerTemplate } from '@templates/Career'

const CareerPreview = ({ entry, widgetFor }) => {
  return (
    <CareerTemplate
      date={entry.getIn(['data', 'date'])}
      title={entry.getIn(['data', 'title'])}
      region={entry.getIn(['data', 'region'])}
    >
      {widgetFor('body')}
    </CareerTemplate>
  )
}

export default CareerPreview
