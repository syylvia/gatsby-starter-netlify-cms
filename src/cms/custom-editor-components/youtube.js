const youtube = {
  id: 'custom-editor-component-video',
  label: 'Youtube Video',
  fields: [
    {
      name: 'id',
      label: 'Youtube id',
      widget: 'string',
      default: '',
    },
    {
      name: 'title',
      label: 'Youtube title',
      widget: 'string',
      default: '',
      required: false,
    },
  ],
  pattern:
    /^<div class="youtube-root"><iframe title="(.*?)" width="100%" height="320" src="https:\/\/www.youtube.com\/embed\/(.*?)\?rel=0" loading="lazy" allowfullscreen sandbox="allow-same-origin allow-scripts allow-popups"><\/iframe><\/div>$/,
  fromBlock: (match) => {
    return {
      id: match[2],
      title: match[1],
    }
  },
  toBlock: (data) => {
    return data.id
      ? `<div class="youtube-root"><iframe title="${data.title}" width="100%" height="320" src="https://www.youtube.com/embed/${data.id}?rel=0" id="${data.id}" loading="lazy" allowfullscreen sandbox="allow-same-origin allow-scripts allow-popups"></iframe></div>`
      : null
  },
  toPreview: (data) => {
    return data.id
      ? `<div class="youtube-root"><iframe title="${data.title}" width="100%" height="320" src="https://www.youtube.com/embed/${data.id}?rel=0" id="${data.id}" loading="lazy" allowfullscreen sandbox="allow-same-origin allow-scripts allow-popups"></iframe></div>`
      : null
  },
}

export default youtube
