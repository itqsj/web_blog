import type { App } from 'vue';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import * as Vuetify from 'vuetify';
import {
  VBtn,
  VDialog,
  VCard,
  VCardActions,
  VExpandTransition,
  VExpandXTransition,
  VCarousel,
  VCarouselItem,
  VCardItem,
  VProgressCircular,
  VProgressLinear,
  VCheckbox,
} from 'vuetify/components';
// import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
// element
import { useDark } from '@vueuse/core';

export const isDark = useDark();

const light: Vuetify.ThemeDefinition = {
  colors: {
    background: '#ffffff',
    surface: '#ffffff',
    primary: '#2196f3',
    'primary-darken-1': '#ffffff',
    secondary: '#ffffff',
    'secondary-darken-1': '#ffffff',
    error: '#ffffff',
    info: '#ffffff',
    success: '#ffffff',
    warning: '#ffffff',
  },
};
const dark: Vuetify.ThemeDefinition = {
  colors: {
    background: '#202940',
    surface: '#202940',
    primary: '#2196f3',
    'primary-darken-1': '#1a2035',
    secondary: '#1a2035',
    'secondary-darken-1': '#1a2035',
    error: '#1a2035',
    info: '#1a2035',
    success: '#1a2035',
    warning: '#1a2035',
  },
};

const vuetify = Vuetify.createVuetify({
  components: {
    VBtn,
    VDialog,
    VCard,
    VCardActions,
    VExpandTransition,
    VExpandXTransition,
    VCarousel,
    VCardItem,
    VProgressCircular,
    VProgressLinear,
    VCheckbox,
    VCarouselItem,
  },
  directives,
  theme: {
    defaultTheme: isDark.value ? 'dark' : 'light',
    themes: {
      light,
      dark,
    },
  },
});

export function setupVuetify(app: App<Element>) {
  app.use(vuetify);
}
