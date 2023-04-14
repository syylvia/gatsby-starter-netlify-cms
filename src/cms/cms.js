import CMS from 'netlify-cms-app'
import TAndCPreview from './preview-templates/TAndCPreview'
import PostPreview from './preview-templates/PostPreview'
import CareerPreview from './preview-templates/CareerPreview'
import DocPreview from './preview-templates/DocPreview'
import Layout from './preview-layout'
import audio from './custom-editor-components/audio'
import youtube from './custom-editor-components/youtube'

CMS.init()
CMS.registerEditorComponent(audio)
CMS.registerEditorComponent(youtube)
// Now the registry is available via the CMS object.
CMS.registerPreviewTemplate('docs', Layout(DocPreview))
CMS.registerPreviewTemplate('terms-and-conditions', Layout(TAndCPreview))
CMS.registerPreviewTemplate('promotions', Layout(PostPreview))
CMS.registerPreviewTemplate('health-tips', Layout(PostPreview))
CMS.registerPreviewTemplate('updates', Layout(PostPreview))
CMS.registerPreviewTemplate('campaign-page-posts', Layout(PostPreview))
CMS.registerPreviewTemplate('careers', Layout(CareerPreview))
