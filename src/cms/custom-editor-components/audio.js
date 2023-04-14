const audio = {
  id: 'custom-editor-component-audio',
  label: 'Audio',
  fields: [
    {
      name: 'src',
      label: 'Audio address',
      widget: 'string',
      default: '',
    },
    {
      name: 'title',
      label: 'Audio title',
      widget: 'string',
      default: '',
    },
    {
      name: 'describe',
      label: 'Audio describe',
      widget: 'text',
      default: '',
    },
  ],
  pattern:
    /^<div class="audio-root"><h6 class="audio-title">(.*?)<\/h6><audio class="audio-controls" controls preload='none' src="(.*?)"><\/audio><div class="audio-describe">(.*?)<\/div><\/div>$/s,
  fromBlock: (match) => {
    return {
      src: match[2],
      title: match[1],
      describe: match[3],
    }
  },
  toBlock: (data) =>
    data.src
      ? `<div class="audio-root"><h6 class="audio-title">${data.title}</h6><audio class="audio-controls" controls preload='none' src="${data.src}"></audio><div class="audio-describe">${data.describe}</div></div>`
      : null,
  toPreview: (data) =>
    data.src
      ? `<div class="audio-root"><h6 class="audio-title">${data.title}</h6><audio class="audio-controls" controls preload='none' src="${data.src}"></audio><div class="audio-describe">${data.describe}</div></div>`
      : null,
}

export default audio
