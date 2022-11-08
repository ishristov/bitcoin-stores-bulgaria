import i18n from 'i18next'
// import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // we init with resources
    resources: {
      bg: {
        translations: {
          merchantTypes: "Видове обекти",
          name: "Име на обекта",
          onoff: "Физически или онлайн",
          desc: "Описание",
          address: "Адрес",
          on: "Физически обект",
          off: "Онлайн обект",
          noAddressTitle: "Oнлайн магазини и обекти без физически адрес",
          noAddressSub: "Заради липсата на адрес, тези обекти не могат да бъдат показани на картата.",
          withAddressTitle: "Магазини, ресторанти и обекти с физически адрес",
          withAddressSub: "Тези обекти могат да бъдат намерени и на картата по-горе.",
        }
      },
      en: {
        translations: {
          merchantTypes: "Merchant types",
          name: "Merchant",
          onoff: "Online or onsite",
          desc: "Description",
          address: "Address",
          on: "Onsite merchant",
          off: "Online merchant",
          noAddressTitle: "Online merchants without any physical address",
          noAddressSub: "Because these merchants don't have an address, they cannot be shown on the map.",
          withAddressTitle: "Stores, restaurants and merchants with a physical address",
          withAddressSub: "These merchants can also be found on the map above.",
        }
      }
    },
    fallbackLng: "bg",
    // debug: true,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
      escapeValue: false
    }
  })

export default i18n
