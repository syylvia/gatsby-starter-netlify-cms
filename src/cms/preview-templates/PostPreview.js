import React from 'react'
import { PostTemplate } from '@templates/Post'
import '../css/postPreview.css'

const PostPreview = ({ entry, widgetFor }) => {
  return (
    <PostTemplate
      date={entry.getIn(['data', 'date'])}
      cpTitle={entry.getIn(['data', 'cpTitle'])}
      title={entry.getIn(['data', 'title'])}
      type={entry.getIn(['data', 'type'])}
    >
      {widgetFor('body')}
    </PostTemplate>
  )
}

export default PostPreview
