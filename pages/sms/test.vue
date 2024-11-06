<template>
  <v-card width="100%" max-width="600" class="mx-auto">
    <v-carousel height="400" hide-delimiter-background show-arrows v-model="currentIndex">
      <template v-slot:prev="{ props }">
        <v-btn color="primary" variant="elevated" @click="props.onClick" :disabled="currentIndex === 0">
          Previous: {{ getSubjectName(currentIndex - 1) }}
        </v-btn>
      </template>
      <template v-slot:next="{ props }">
        <v-btn color="primary" variant="elevated" @click="props.onClick"
          :disabled="currentIndex === subjects.length - 1">
          Next: {{ getSubjectName(currentIndex + 1) }}
        </v-btn>
      </template>
      <v-carousel-item v-for="(subject, index) in subjects" :key="index">
        <v-card color="grey lighten-2" height="100%" :title="`Set exam item in ${subject.name}`"
          subtitle="Ohrighhht lets do it">
          <div class="d-flex fill-height justify-center align-center">
            <v-row justify="center">
              <v-col cols="12" md="6">
                <v-container>
                  <v-row dense>
                    <v-col v-for="(quarter, qIndex) in quarters" :key="qIndex" cols="12" md="12" class="mb-2">
                      <v-card class="pa-2 elevation-2">
                        <div class="text-black">
                          <v-icon large class="mb-2" color="blue-grey darken-2">{{ getQuarterIcon(qIndex) }}</v-icon> {{
                            quarter }}
                        </div>
                        <div class="text-black">
                          <strong>30 items</strong>
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
          </div>
        </v-card>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const subjects = ref([
  { name: 'Math', exam_items: {} },
  { name: 'English', exam_items: {} },
  { name: 'Science', exam_items: {} },
  { name: 'MAPEH', exam_items: {} },
]);

const quarters = ['First Quarter', 'Second Quarter', 'Third Quarter', 'Fourth Quarter'];

const currentIndex = ref(0);

// Function to get the subject name based on the current index
const getSubjectName = (index) => {
  return index >= 0 && index < subjects.value.length
    ? subjects.value[index].name
    : '';
};

// Function to get an icon for each quarter
const getQuarterIcon = (index) => {
  const icons = [
    'mdi-calendar-start', // First Quarter
    'mdi-calendar-month',  // Second Quarter
    'mdi-calendar-range',  // Third Quarter
    'mdi-calendar-end'     // Fourth Quarter
  ];
  return icons[index] || 'mdi-help-circle'; // Default icon if index is out of bounds
};
</script>

<style scoped>
.v-card {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.v-carousel {
  border-radius: 8px;
}

.text-h2 {
  font-weight: bold;
}
</style>
