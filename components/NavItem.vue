<template>
  <div v-for="nav, i in items" :key="i">
    <v-list v-if="nav.is_branch()" v-model="nav.active" style="cursor : pointer" rounded="xl">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" :title="nav.name" :to="{ name: nav.path }" :subtitle="nav.path" :icon="nav.icon"
          color="primary" rounded="shaped">
          <!-- <template v-slot:prepend>
            <v-icon class="mr-2" icon="mdi-source-branch" />
          </template> -->
        </v-list-item>
      </template>
      <NavItem :items="Object.values(nav.children)" />
    </v-list>
    <v-list-item v-else :title="nav.name" :to="{ name: nav.path }" color="primary" rounded="shaped">
      <!-- <template v-if="nav.icon" v-slot:prepend>
        <v-icon class="mr-1" :icon="nav.icon" />
      </template> -->
    </v-list-item>
  </div>
</template>

<script lang="ts" setup>
import NavTree from "~/assets/NavTree";

type NavProps = {
  items: NavTree[],
  level?: Number,
  required?: Boolean
}

const { items, level, required } = withDefaults(defineProps<NavProps>(), {});
</script>