/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */
import "@fortawesome/fontawesome-free/css/all.css"; // Ensure your project is capable of handling css files

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import "vuetify/dist/vuetify.css"; // Import Vuetify CSS

// Composables
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";
import { useI18n } from "vue-i18n";
import { i18n } from "./I18n.js";
import { aliases, fa } from "vuetify/iconsets/fa";
import defaults from "./defaults.js";

// set font family and async font loading
const font = new FontFace("Cairo", "url(/font/cairo.ttf)");
font.load().then(async font => {
  await document.fonts.add(font);
});
document.fonts.ready.then(() => {
  document.documentElement.classList.add("fonts-loaded");
  console.log("Fonts loaded");
});

const lightTheme = {
  dark: false,
  fontFamily: "Cairo, sans-serif",
  colors: {
    primary: "#1976D2",
    secondary: "#424242",
    accent: "#82B1FF",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107",
  },
};

const darkTheme = {
  dark: true,
  fontFamily: "Cairo, sans-serif",
  colors: {
    primary: "#007bff",
    secondary: "#607D8B",
    accent: "#FF9800",
    error: "#f44336",
    info: "#4CAF50",
    success: "#8BC34A",
    warning: "#FFEB3B",
  },
  variables: {
    "code-color": "#007bff",
    "overlay-scrim-background": "#171925",
    "tooltip-background": "#F7F4FF",
    "overlay-scrim-opacity": 0.6,
    "hover-opacity": 0.06,
    "focus-opacity": 0.1,
    "selected-opacity": 0.08,
    "activated-opacity": 0.16,
    "pressed-opacity": 0.14,
    "dragged-opacity": 0.1,
    "disabled-opacity": 0.4,
    "border-color": "#E1DEF5",
    "border-opacity": 0.12,
    "table-header-color": "#535876",
    "high-emphasis-opacity": 0.9,
    "medium-emphasis-opacity": 0.7,
    "switch-opacity": 0.4,
    "switch-disabled-track-opacity": 0.4,
    "switch-disabled-thumb-opacity": 0.8,
    "switch-checked-disabled-opacity": 0.3,
    "track-bg": "#3A3F57",

    // Shadows
    "shadow-key-umbra-color": "#131120",
    "shadow-xs-opacity": 0.16,
    "shadow-sm-opacity": 0.18,
    "shadow-md-opacity": 0.2,
    "shadow-lg-opacity": 0.22,
    "shadow-xl-opacity": 0.24,
  },
};

export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "fa",
    aliases,
    sets: {
      fa,
    },
  },
  defaults,
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n }),
  },
  rtl: { ar: true },
  theme: {
    defaultTheme: "lightTheme",
    themes: {
      lightTheme,
      darkTheme,
    },
  },
});
