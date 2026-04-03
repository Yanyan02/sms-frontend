<template>
  <v-row justify="center" class="mt-4">
    <v-col cols="12" md="8" lg="6">
      <v-card elevation="4" rounded="lg" class="overflow-hidden">
        <v-sheet color="indigo-darken-2" class="pa-6 text-white d-flex align-center flex-wrap" min-height="160">
          <v-avatar size="90" color="white" class="elevation-3 mr-6" style="border: 3px solid rgba(255,255,255,0.3)">
            <v-img v-if="user.photo" :src="user.photo" alt="Avatar" />
            <span v-else class="text-h4 text-indigo-darken-2 font-weight-bold">
              {{ user.first_name.charAt(0) }}{{ user.last_name.charAt(0) }}
            </span>
          </v-avatar>

          <div class="flex-grow-1">
            <div class="d-flex align-center justify-space-between">
              <h1 class="text-h5 font-weight-bold mb-0">{{ full_name }}</h1>
              <v-btn prepend-icon="mdi-pencil" variant="tonal" size="small" color="white" class="text-capitalize">
                Edit Profile
              </v-btn>
            </div>

            <div class="d-flex align-center mt-1">
              <v-chip size="x-small" color="indigo-lighten-4" class="mr-2" label>
                {{ user.side }}
              </v-chip>
              <span class="text-subtitle-2 opacity-80">{{ user.role }}</span>
            </div>

            <div class="d-flex align-center mt-3 text-body-2">
              <v-icon icon="mdi-email-outline" size="small" class="mr-2" />
              <span class="font-italic">{{ user.email || 'mariannemaepaclian@gmail.com' }}</span>
            </div>
          </div>
        </v-sheet>

        <v-card-text class="pa-0">
          <v-toolbar flat density="compact" color="transparent">
            <v-toolbar-title class="text-subtitle-1 font-weight-bold">
              <v-icon start color="indigo">mdi-history</v-icon>
              Designation History
            </v-toolbar-title>
          </v-toolbar>

          <v-divider />

          <v-list lines="two" class="pa-0">
            <v-list-item v-for="(item, index) in items" :key="item.id" :border="index !== items.length - 1">
              <template v-slot:prepend>
                <v-avatar size="32" color="indigo-lighten-5">
                  <v-icon color="indigo" size="small">mdi-briefcase-outline</v-icon>
                </v-avatar>
              </template>

              <v-list-item-title class="font-weight-medium text-body-2">
                {{ item.title }}
              </v-list-item-title>

              <v-list-item-subtitle class="text-caption mt-1">
                <v-icon size="x-small" class="mr-1">mdi-calendar-range</v-icon>
                Effective: {{ item.subtitle }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import useAuth from "~/store/auth";

definePageMeta({ layout: "barren" });

const authStore = useAuth();
const user = authStore.user;

// Sample items with improved structure
const items = ref([
  { id: 1, title: 'Regional Office Recommending Approver', subtitle: 'July 15, 2022' },
  { id: 2, title: 'Regional Office Approver', subtitle: 'July 15, 2024' },
]);

const full_name = computed(() => {
  const first = user.first_name || '';
  const middle = user.middle_name ? ` ${user.middle_name.charAt(0)}.` : '';
  const last = user.last_name || '';
  return `${first}${middle} ${last}`;
});
</script>

<style scoped>
.opacity-80 {
  opacity: 0.8;
}
</style>