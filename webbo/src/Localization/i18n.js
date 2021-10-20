import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import XHR from "i18next-xhr-backend";

//const HttpBackend = require('i18next-http-backend')

// the translations
// (tip move them in a JSON file and import them)

i18next
    .use(XHR)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        debug: false,
        lng: localStorage.getItem("language") || window.navigator.language,
        fallbackLng: "en",
        ns: ["translation"],
        defaultNS: "translation",
        backend: {
            loadPath:
                process.env.PUBLIC_URL +
                "/locales/{{ns}}.{{lng}}.json?v=" +
                process.env.REACT_APP_VERSION,
        },
        react: {
            useSuspense: false,
        },
    });

export default i18next;
