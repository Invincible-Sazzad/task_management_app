import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import ja from "@/locales/ja/common.json";
import en from "@/locales/en/common.json";

export async function initI18n(lang: string = "ja") {
  if (!i18next.isInitialized) {
    await i18next.use(initReactI18next).init({
      resources: {
        ja: { common: ja },
        en: { common: en },
      },
      lng: lang,
      fallbackLng: "ja",
      ns: ["common"],
      defaultNS: "common",
      interpolation: {
        escapeValue: false,
      },
    });
  }
}