<template>

  <v-card title="Grade 4 - Mabuhay" subtitle="A brief overview of classroom examination result per Quarter.">
    <v-card-text>
      {{ formattedData[0] }}
      <v-data-table :group-by="groupBy" :headers="headers" :items="formattedData" item-value="name"
        class="my-data-table">
        <template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
          <tr>
            <td :colspan="columns.length">
              <v-btn :icon="isGroupOpen(item) ? '$expand' : '$next'" size="small" variant="text"
                @click="toggleGroup(item)"></v-btn>
              <span>{{ item.value }}</span>
            </td>
          </tr>
        </template>

        <template v-slot:item.subjects="{ item }">{{ item.selectable }}
          <v-list>
            <v-list-item-group>
              <v-list-item v-for="(subject, index) in item.selectable.semesters[0].subjects" :key="index">
                <v-list-item-content>
                  <v-list-item-title>{{ subject.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </template>

        <template v-slot:item.firstQuarterScore="{ item }">
          <v-list>
            <v-list-item-group>
              <v-list-item v-for="(subject, index) in item.selectable.semesters[0]?.subjects || []" :key="index">
                <v-list-item-content>
                  <v-list-item-title>
                    <span :style="{ color: subject.score < 35 ? 'red' : 'green' }">
                      {{ subject.score !== null ? subject.score : '0' }}
                    </span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>


        </template>

        <template v-slot:item.secondQuarterScore="{ item }">
          <v-list>
            <v-list-item-group>
              <v-list-item v-for="(subject, index) in item.selectable.semesters[1]?.subjects || []" :key="index">
                <v-list-item-content>
                  <v-list-item-title>
                    <span :style="{ color: subject.score < 35 ? 'red' : 'green' }">
                      {{ subject.score !== null ? subject.score : '0' }}
                    </span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>

        </template>

        <template v-slot:item.thirdQuarterScore="{ item }">
          <v-list>
            <v-list-item-group>
              <v-list-item v-for="(subject, index) in item.selectable.semesters[2]?.subjects || []" :key="index">
                <v-list-item-content>
                  <v-list-item-title>
                    <span :style="{ color: subject.score < 35 ? 'red' : 'green' }">
                      {{ subject.score !== null ? subject.score : '0' }}
                    </span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </template>

        <template v-slot:item.fourthQuarterScore="{ item }">
          <v-list>
            <v-list-item-group>
              <v-list-item v-for="(subject, index) in item.selectable.semesters[3]?.subjects || []" :key="index">
                <v-list-item-content>
                  <v-list-item-title>
                    <span :style="{ color: subject.score < 35 ? 'red' : 'green' }">
                      {{ subject.score !== null ? subject.score : '0' }}
                    </span>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import useAuth from "~/store/auth";
const user = useAuth().user;
import { ref } from 'vue';
const { $rest } = useNuxtApp();
onBeforeMount(() => {
  Promise.all([
    get_school_form(),
  ])
})
definePageMeta({ layout: "std-systems" });


const studens_data = ref<any[]>([]);

const groupBy = ref([{ key: 'name', order: 'asc' }]);
const headers = ref([
  { title: 'Subjects', key: 'subjects', sortable: false },
  { title: 'First Quarter', key: 'firstQuarterScore', sortable: true },
  { title: 'Second Quarter', key: 'secondQuarterScore', sortable: true },
  { title: 'Third Quarter', key: 'thirdQuarterScore', sortable: true },
  { title: 'Fourth Quarter', key: 'fourthQuarterScore', sortable: true },
]);


async function get_school_form() {
  const { data, error } = await $rest('es-school-form/get-school-form', {
    method: "GET",
  });
  if (data) {
    studens_data.value = data;
    formattedData.value = formatStudentData(data);
  } else {
    console.error('Failed to fetch school form data:', error);
  }
}

function formatStudentData(data: any[]) {
  return data.map((school) => {
    return school.students.map((student: any, index: number) => ({
      id: index + 1,
      name: `${student.first_name} ${student.middle_name} ${student.last_name}`,
      semesters: [
        {
          title: "First Quarter",
          subjects: formatSubjects(student.subjects, 'first_sem')
        },
        {
          title: "Second Quarter",
          subjects: formatSubjects(student.subjects, 'second_sem')
        },
        {
          title: "Third Quarter",
          subjects: formatSubjects(student.subjects, 'third_sem')
        },
        {
          title: "Fourth Quarter",
          subjects: formatSubjects(student.subjects, 'forth_sem')
        }
      ]
    }));
  }).flat();
}


function formatSubjects(subjects: Record<string, any>, semesterKey: string) {
  return Object.keys(subjects).map(subjectName => ({
    name: capitalize(subjectName),
    score: subjects[subjectName][semesterKey] || null
  }));
}


function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}


const formattedData = ref<any[]>([]);

</script>
