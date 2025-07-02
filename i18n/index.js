import { createI18n } from 'vue-i18n'

// Supported locales
export const SUPPORT_LOCALES = ['en', 'am']
export const DEFAULT_LOCALE = 'en'

// Cache for loaded translations
const loadedTranslations = new Set()

// Create i18n instance with empty messages
export const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: {}
})

/**
 * Load translation file for specific locale and page
 * @param {string} locale - The locale to load (e.g., 'en', 'am')
 * @param {string} page - The page identifier (e.g., 'login')
 * @returns {Promise<void>}
 */
export async function loadTranslations(locale, page) {
  // Check if locale is supported, fallback to default if not
  const targetLocale = SUPPORT_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE
  
  // Create cache key
  const cacheKey = `${targetLocale}-${page}`
  
  // Return early if already loaded
  if (loadedTranslations.has(cacheKey)) {
    return
  }
  
  try {
    // Dynamic import of translation file
    const messages = await import(`./${page}/${targetLocale}.json`)
    
    // Get current messages for the locale
    const currentMessages = i18n.global.messages.value[targetLocale] || {}
    
    // Merge new messages with existing ones
    i18n.global.setLocaleMessage(targetLocale, {
      ...currentMessages,
      ...messages.default
    })
    
    // Mark as loaded
    loadedTranslations.add(cacheKey)
    
    console.log(`Loaded translations for ${targetLocale}/${page}`)
  } catch (error) {
    console.warn(`Failed to load translations for ${targetLocale}/${page}:`, error)
    
    // If target locale failed and it's not the default, try loading default
    if (targetLocale !== DEFAULT_LOCALE) {
      const fallbackCacheKey = `${DEFAULT_LOCALE}-${page}`
      if (!loadedTranslations.has(fallbackCacheKey)) {
        try {
          const fallbackMessages = await import(`./${page}/${DEFAULT_LOCALE}.json`)
          const currentMessages = i18n.global.messages.value[DEFAULT_LOCALE] || {}
          i18n.global.setLocaleMessage(DEFAULT_LOCALE, {
            ...currentMessages,
            ...fallbackMessages.default
          })
          loadedTranslations.add(fallbackCacheKey)
          console.log(`Loaded fallback translations for ${DEFAULT_LOCALE}/${page}`)
        } catch (fallbackError) {
          console.error(`Failed to load fallback translations:`, fallbackError)
        }
      }
    }
  }
}

/**
 * Set the current locale
 * @param {string} locale - The locale to set
 */
export function setLocale(locale) {
  const targetLocale = SUPPORT_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE
  i18n.global.locale.value = targetLocale
}

/**
 * Get the current locale
 * @returns {string} Current locale
 */
export function getCurrentLocale() {
  return i18n.global.locale.value
}

/**
 * Check if a locale is supported
 * @param {string} locale - The locale to check
 * @returns {boolean}
 */
export function isLocaleSupported(locale) {
  return SUPPORT_LOCALES.includes(locale)
}