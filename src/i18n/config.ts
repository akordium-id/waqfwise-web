import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Initialize i18next
i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      id: {
        translation: {},
      },
      en: {
        translation: {},
      },
      ar: {
        translation: {},
      },
    },
    lng: 'id', // Default language (Indonesian)
    fallbackLng: 'en', // Fallback language if translation not found
    debug: false, // Set to true for development debugging
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  })

// Load translations dynamically
const loadTranslations = async () => {
  try {
    const languages = ['id', 'en', 'ar']

    for (const lang of languages) {
      const response = await fetch(`/locales/${lang}/translation.json`)
      if (response.ok) {
        const translations = await response.json()
        i18n.addResourceBundle(lang, 'translation', translations, true, true)
      }
    }
  } catch (error) {
    console.error('Failed to load translations:', error)
  }
}

loadTranslations()

export default i18n
