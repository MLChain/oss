import { lang } from 'mlchain/shared'

import en from './en.json'
import es from './es.json'
import fr from './fr.json'

const translations = { en, fr, es }

const initializeTranslations = () => {
  lang.extend(translations)
  lang.init()
}

export { initializeTranslations }
