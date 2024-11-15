<template>
  <v-app>
    <v-layout>
      <v-app-bar color="teal-darken-4" image="https://picsum.photos/1920/1080?random">
        <template v-slot:image>
          <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
        </template>

        <template v-slot:prepend>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </template>

        <v-app-bar-title>Sample Sytem</v-app-bar-title>

        <v-spacer></v-spacer>
        <v-btn>
          Home
        </v-btn>
        <v-btn :to="{ name: 'exam-maintenance' }">
          Maintenance Panel
        </v-btn>
        <v-btn :to="{ name: 'exam' }">
          Exam
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>

    </v-layout>

    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>


  </v-app>
</template>

<script lang="ts" setup>
import useNav from "~/store/nav";
let nav = useNav();

const drawer = ref(true);
</script>

<style scoped></style>