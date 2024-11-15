<template>
  <v-app>
    <layout-std-appbar appbar_title="Systems" :fluid="true">
      <template v-slot:nav-icon>
        <v-app-bar-nav-icon class="mr-4" expand-on-hover variant="text" @click.stop="drawer = !drawer" />
      </template>
    </layout-std-appbar>

    <v-navigation-drawer v-model="drawer" :rail="$vuetify.display.smAndDown" clipped>
      <v-sheet>
        <v-img class="ma-2" src="/prime-logo.png" cover contain />
      </v-sheet>

      <v-sheet>
        <v-list class="pb-0">
          <NavItem :items="nav.systems_navs" />
        </v-list>
      </v-sheet>
    </v-navigation-drawer>

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import useNav from "~/store/nav";
let nav = useNav();

const drawer = ref(true);
</script>

<style scoped>
/* @media (min-width: 2560px) {
  ::v-deep(#constrained-boi .v-container) {
    max-width: 2400px !important;
  }
}

@media (min-width: 1920px) {
  ::v-deep(#constrained-boi .v-container) {
    max-width: 1800px !important;
  }
}

@media (min-width: 1280px) {
  ::v-deep(#constrained-boi .v-container) {
    max-width: 1200px !important;
  }
} */
</style>