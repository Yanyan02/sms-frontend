<template>
  <v-app>
    <layout-std-appbar appbar_title="Appllicant Equvalent Record Form" :fluid="true">
      <template v-slot:nav-icon>
        <v-app-bar-nav-icon class="mr-4" expand-on-hover variant="text" />
      </template>
    </layout-std-appbar>

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