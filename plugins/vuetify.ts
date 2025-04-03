import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as labs from "vuetify/labs/components";
import * as directives from "vuetify/directives";
import VCalendar from "v-calendar";

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: false,
    components: {
      ...components,
      ...labs
    },

    display: {
      mobileBreakpoint: "sm"
    },

    directives,

    defaults: {
      /*Labs */
      VDataTable: {
        fixedHeader: true,
        noDataText: "No items found.",
        sortable: false
      },

      VTextField: {
        color: "primary",
        variant: "outlined",
        density: "compact"
      },

      VCombobox: {
        color: "primary",
        variant: "outlined",
        density: "compact"
      },

      VSelect: {
        color: "primary",
        variant: "outlined",
        density: "compact"
      },

      VSwitch: {
        color: "primary"
      },

      VTextarea: {
        color: "primary",
        variant: "outlined",
        density: "compact"
      },

      VRadio: {
        color: "primary",
      },

      VListItem: {
        "active-color": "primary",
      },

      VCheckbox: {
        color: "primary",
        variant: "outlined",
        density: "compact"
      },

      VToolbar: {
        density: "compact"
      },

      VFileInput: {
        color: "primary",
        density: "compact",
        variant: "outlined"
      },
    },

    theme: {
      defaultTheme: 'light',

      themes: {
        light: {
          colors: {
            primary: "#228B22"
          }
        },
        dark: {
          dark: true,
          colors: {
            primary: "#115D33"
          }
        }
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
  nuxtApp.vueApp.use(VCalendar);
});