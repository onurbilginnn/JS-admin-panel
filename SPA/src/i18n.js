import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import {  initReactI18next } from 'react-i18next';

i18n
  // load translation using http -> see /public/locales
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: localStorage.getItem('appLng') || 'TR',
    fallbackLng: 'TR',
    preload: ['tr', 'gb'],
    ns: ['translation'],
    defaultNS: 'translation',
    debug: false,    
    backend: {
      // for all available options read the backend's repository readme file
      loadPath: 'http://localhost:8080/assets/locales/{{lng}}/{{ns}}.json',      
      addPath: 'http://localhost:8080/assets/locales/{{lng}}/{{ns}}.json',      
    }
    
  });
export default i18n;
