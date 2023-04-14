/**
 * References:
 * - https://react.i18next.com/guides/quick-start#configure-i-18-next
 * - https://react.i18next.com/latest/using-with-hooks#configure-i-18-next
 * - https://react.i18next.com/latest/i18next-instance
 */
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import translationEn from '../../assets/locales/en/translation.json'
import translationZhCn from '../../assets/locales/zh-CN/translation.json'
import translationZhHk from '../../assets/locales/zh-HK/translation.json'
import campaignEn from '../../assets/locales/en/campaignPageV2.json'
import campaignZhCn from '../../assets/locales/zh-CN/campaignPageV2.json'
import campaignZhHk from '../../assets/locales/zh-HK/campaignPageV2.json'
import { languages } from '../../../languages'

const resources = {
  'zh-HK': {
    translation: translationZhHk,
    campaign: campaignZhHk,
  },
  'zh-CN': {
    translation: translationZhCn,
    campaign: campaignZhCn,
  },
  en: {
    translation: translationEn,
    campaign: campaignEn,
  },
}

i18next
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    resources,
    fallbackLng: languages,
    returnEmptyString: false,
    defaultNS: 'translation',
    // debug: true,
    whitelist: languages,
    interpolation: {
      escapeValue: false, // not needed for React as it escapes by default
    },
    parseMissingKeyHandler: (key) => {
      // return empty space if missing keys or loading translation
      return key.split('.').slice(-1)
    },
  })

export { i18next }
