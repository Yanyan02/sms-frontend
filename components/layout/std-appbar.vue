<template>
  <v-app-bar v-bind="$attrs" height="56" border flat>
    <v-container class="fill-height d-flex align-content-center pl-1" v-bind="$attrs">
      <slot name="nav-icon" />

      <!-- <v-avatar class="pa-1">
        <v-img src="/logo.svg" @click="$router.push({ name: 'home' })" style="cursor : pointer" />
      </v-avatar> -->
      <v-app-bar-title class="pt-1 text-indigo" @click="$router.push({ name: 'home' })" style="cursor : pointer">
        <!-- {{ $props.appbar_title }} -->RECLASSIFICATION SYSTEM
      </v-app-bar-title>
      <!-- <dev-display-debugger id="floater" /> -->
      <v-spacer />
      <!-- 
      <v-tooltip location="bottom" text="Soonish.">
        <template v-slot:activator="{ props }">
          <h6 v-bind="props" class="text-subtitle-2 font-weight-medium">
            <v-icon class="mr-4" icon="mdi-book-open" color="primary" size="24" />
          </h6>
        </template>
      </v-tooltip>
 -->

      <v-menu location="bottom center" location-strategy="connected" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" @click="notification_menu = false" icon="mdi-tools" color="primary" />
        </template>
        <v-card min-width="320" border>
          <v-card-text class="pt-4 pb-0 px-0">
            <v-list class="py-0 px-0" density="compact">
              <v-list-item class="pb-4" title="Administrative Tools" density="compact">
                <!-- <template v-slot:prepend>
                  <v-icon>mdi-account</v-icon>
                </template> -->
              </v-list-item>

              <v-divider />

            </v-list>

            <v-list class="pt-0 pb-2 ma-4">
              <v-list-item title="Maintenance Panel" color="primary"
                :to="{ name: `sms-maintenance`, params: account_params }">
                <template v-slot:prepend>
                  <v-icon class="mr-1" icon="mdi-tools" />
                </template>
              </v-list-item>

              <v-list-item title="User Management" color="primary"
                :to="{ name: `user-management`, params: account_params }">
                <template v-slot:prepend>
                  <v-icon class="mr-1" icon="mdi-account" />
                </template>
              </v-list-item>
              <v-list-item title="SDO Panel" color="primary" :to="{ name: `sdo`, params: account_params }">
                <template v-slot:prepend>
                  <v-icon class="mr-1" icon="mdi-key-chain" />
                </template>
              </v-list-item>
              <v-list-item title="School Panel" color="primary" :to="{ name: `school`, params: account_params }">
                <template v-slot:prepend>
                  <v-icon class="mr-1" icon="mdi-key-chain" />
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-menu>

      <v-menu location="bottom center" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" @click="notification_menu = false" :icon="!ring_bell ? 'mdi-bell-ring' : 'mdi-bell'"
            color="primary" />
        </template>
        <v-card min-width="360" border>
          <v-btn class="float-right" variant="text" icon="mdi-close" :ripple="false"></v-btn>
          <v-card-title>
            Notifications
          </v-card-title>

          <v-divider />
          <v-card-text>

            <h6 class="text-subtitle-2 text-emphasis-medium text-center">You're all caught up...</h6>
            <h6 class="text-subtitle-2 text-emphasis-medium text-center">There are no new notifications to see.</h6>
          </v-card-text>
          <v-divider />

          <v-list-item class="px-2">
            <v-btn variant="text" color="grey" size="small" icon="mdi-cog" />
            <v-btn variant="text" color="primary" size="small">
              <v-icon class="mr-1">mdi-check-all</v-icon>
              Read All
            </v-btn>

            <v-btn class="float-right mt-1" size="small" color="primary">View All</v-btn>
          </v-list-item>
        </v-card>
      </v-menu>

      <v-menu location="bottom center" location-strategy="connected" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
          <layout-avatar v-bind="props" />
        </template>
        <v-card min-width="320" border>
          <v-card-text class="pt-4 pb-0 px-0">
            <v-list class="py-0 px-0" density="compact">
              <v-list-item class="px-2 pb-4" :title="auth.name" :subtitle="auth.access" density="compact">
                <template v-slot:prepend>
                  <layout-avatar />
                </template>
              </v-list-item>

              <v-divider />

              <v-list-item :title="cfg.preferences.dark ? 'Dark Mode' : 'Light Mode'" color="primary" density="compact">
                <template v-slot:prepend>
                  <v-icon class="mr-1" v-if="cfg.preferences.dark" icon="mdi-weather-night" color="purple-accent-2" />
                  <v-icon class="mr-1" v-else icon="mdi-weather-sunny" color="orange-accent-4" />
                </template>
                <template v-slot:append>
                  <v-switch class="toggle-dark-mode" @click="toggle_dark_mode" :model-value="cfg.preferences.dark"
                    color="primary" hide-details />
                </template>
              </v-list-item>
              <v-divider />
            </v-list>

            <v-list class="pt-0 pb-2" density="compact">
              <v-list-item title="Profile" color="primary"
                :to="{ name: `account-profile-${Object.keys(account_params)[0]}`, params: account_params }">
                <template v-slot:prepend>
                  <v-icon class="mr-1" icon="mdi-account" />
                </template>
              </v-list-item>

              <v-list-item title="School Profile" color="primary" :to="{ name: 'school' }">
                <template v-slot:prepend>
                  <v-icon class="mr-1" icon="mdi-school" />
                </template>
              </v-list-item>
              <v-list-item title="Settings" color="primary" :to="{ name: 'account-settings' }">
                <template v-slot:prepend>
                  <v-icon class="mr-1" icon="mdi-cog" />
                </template>
              </v-list-item>
              <NavItem :items="nav.std_header_navs" />
              <v-divider class="mb-2" />
              <v-list-item class="py-0">
                <v-btn color="indigo" prepend-icon="mdi-logout-variant" variant="outlined" @click="logout"
                  block>Sign-Out</v-btn>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-container>
    <template v-if="$attrs.extended === ''" v-slot:extension>
      <slot name="extension" />
    </template>
    <layout-std-loader />
    <layout-std-snackbar />
  </v-app-bar>
</template>


<script lang="ts" setup>
import useAuth from "~/store/auth";
import useNav from "~/store/nav";
import { useTheme } from "vuetify/lib/framework.mjs";

import { useGlobalConfig } from "~/store/index";

const auth = useAuth();
const router = useRouter();
const theme = useTheme();
const nav = useNav();
const cfg = useGlobalConfig();

defineProps({
  appbar_title: String
});

onBeforeMount(() => {
  theme.global.name.value = cfg.preferences.dark ? "dark" : "light";
});

const notification_menu = ref(false);

const account_params = computed(() => ({ [`${auth.type}`]: (auth.user || {}).username }));
const ring_bell = computed(() => false);
const toggle_dark_mode = () => {
  cfg.set_dark_mode();
  theme.global.name.value = cfg.preferences.dark ? "dark" : "light"
}

const logout = () => {
  auth.logout();
  router.replace({ name: "index" })
}
</script>