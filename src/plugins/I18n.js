import { createI18n } from "vue-i18n";

// Transitions Language
import ar from "@/locale/ar";
import en from "@/locale/en";
const messages = {
  en,
  ar
};

// install I18n
export const i18n = new createI18n({
  legacy: false,
  locale: "ar",
  fallbackLocale: "en",
  globalInjection: true,
  messages
});
