<template>
  <v-container>
    <v-card>
      <v-toolbar class="pa-6">
        <template v-slot:title>
          <v-row dense>
            <v-col cols="10">
              <h2 class="text-primary mt-2 font-weight-medium">Summary of Students' Examination Results</h2>
              <h5 class="text-grey-500 font-weight-light mb-2 mt-0">Overview of Subjects for Student Exams</h5>
            </v-col>
          </v-row>
        </template>

      </v-toolbar>
      <hr />
      <v-card-text class="ma-5">
        <!-- School Cards Section -->
        <v-row dense>
          <v-col cols="3">
            <v-row dense>
              <v-col cols="12">
                <v-select label="Filter by School" hide-details :items="school_data" item-value="_id" />
              </v-col>
              <v-col cols="12">
                <v-select label="Filter by Section" hide-details :items="sections" />
              </v-col>
              <v-col cols="12">
                <v-select label="Filter by Adviser" hide-details :items="advisers" />
              </v-col>
              <v-col cols="12" class="d-flex justify-end align-center">
                <v-btn class=" mt-2" color="primary" outlined block>
                  <v-icon class="pr-1">mdi-filter</v-icon>
                  Filter
                </v-btn>
              </v-col>
              <v-col cols="12" class="d-flex justify-end align-center">
                <v-btn @click="exam_dialog = true" color="primary" block>
                  <v-icon class="pr-1">mdi-pencil-plus</v-icon>
                  Add
                </v-btn>
              </v-col>
              <v-spacer />
              <v-col cols="auto" class="d-flex justify-end align-center">

              </v-col>
            </v-row></v-col>
          <v-col cols="9"> <v-sheet border>
              <v-data-table :headers="table_headers" :items="school_form_data">
                <template v-slot:top>
                  <v-toolbar border>
                    <v-toolbar-title> List of Students</v-toolbar-title>
                  </v-toolbar>
                </template>
                <template v-slot:item.students="{ item }">
                  <v-chip color="success" class="px-5">
                    {{ item?.selectable?.students?.length }}
                  </v-chip>
                </template>

                <template v-slot:item.actions="{ item }">
                  <v-menu :close-on-content-click="false" location="end">
                    <template v-slot:activator="{ props }">
                      <v-btn color="success" v-bind="props" density="compact">
                        Actions
                      </v-btn>
                    </template>

                    <v-card min-width="250">

                      <v-list>
                        <v-list-item title="Class Information">
                          <template v-slot:append>
                            <v-icon>mdi-file-document</v-icon>
                          </template>
                        </v-list-item>

                        <v-divider class="my-1"></v-divider>

                        <v-list-item @click="view_classroom(item.selectable)">
                          <v-icon class="px-4" color="primary">mdi-magnify</v-icon>
                          View Details
                        </v-list-item>
                        <v-list-item @click="update_dialog = true">
                          <v-icon class="px-4" color="primary">mdi-magnify</v-icon>
                          Update
                        </v-list-item>
                      </v-list>

                      <v-card-actions class="d-flex justify-end">
                        <v-btn variant="text" color="error">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </template>
                <template #bottom v-if="!show_footer" />
              </v-data-table>
            </v-sheet></v-col>

        </v-row>
      </v-card-text>
    </v-card>

    <v-dialog v-model="view_dialog" width="70%">
      <v-sheet>
        <v-toolbar color="grey-lighten-2" border>
          <v-list-item class="pl-2" density="compact">
            <template v-slot:prepend>
              <v-avatar class="mr-1" variant="text">
                <v-icon icon="mdi-school" dark />
              </v-avatar>
            </template>
            <v-list-item-title> View Classroom Exam Results </v-list-item-title>
            <v-list-item-subtitle> Review Student Exam Results </v-list-item-subtitle>
          </v-list-item>
          <v-spacer />
          <v-btn @click="view_dialog = false" class="mr-0" rounded="0" icon="mdi-close" />
        </v-toolbar>
        <v-row no-gutters>
          <v-col cols="4">
            <v-card title="Subject Examination Item" subtitle="Classroom examination items per Quarter." flat>
              <v-card-text>
                <v-card width="100%" max-width="600" class="mx-auto">
                  <v-carousel height="auto" hide-delimiters color="primary">
                    <v-carousel-item v-for="(item, index) in classroom_data.exam_items" :key="index">
                      <v-card color="primary" class="text-uppercase">
                        <v-card-title class="text-body-2"> Display the set exam items for <i class="text-uppercase">{{
                          item.name
                        }} </i></v-card-title>
                        <div class="d-flex fill-height justify-center align-center">
                          <v-row justify="center">
                            <v-col cols="10">
                              <v-container>
                                <v-row dense>
                                  <v-col cols="12" md="12" class="mb-2">
                                    <v-card class="ma-2 pa-2 px-5 elevation-2">
                                      <div class="text-black text-body-1 text-uppercase">
                                        <v-icon large class="mr-1" color="blue-grey darken-2">mdi-calendar</v-icon>
                                        First Quarter
                                      </div>
                                      <div class="text-black pl-8">
                                        <strong class="text-body-2"
                                          :class="item.scores.second_sem ? 'text-yellow' : 'text-gray-500'">
                                          {{ item.scores.first_sem }} items
                                        </strong>
                                      </div>

                                    </v-card>
                                    <v-card class="ma-2 pa-2 px-5 elevation-2">
                                      <div class="text-black text-body-1 text-uppercase">
                                        <v-icon large class="mr-1" color="blue-grey darken-2">mdi-calendar</v-icon>
                                        Second Quarter
                                      </div>
                                      <div class="text-black pl-8">
                                        <strong class="text-body-2">
                                          {{ item.scores.second_sem ? item.scores.second_sem : 'TBA' }} items
                                        </strong>
                                      </div>
                                    </v-card>
                                    <v-card class="ma-2 pa-2 px-5 elevation-2">
                                      <div class="text-black text-body-1 text-uppercase">
                                        <v-icon large class="mr-1" color="blue-grey darken-2">mdi-calendar</v-icon>
                                        Third Quarter
                                      </div>
                                      <div class="text-black pl-8">
                                        <strong class="text-body-2">
                                          {{ item.scores.third_sem ? item.scores.third_sem : 'TBA' }} items
                                        </strong>
                                      </div>
                                    </v-card>
                                    <v-card class="ma-2 pa-2 px-5 elevation-2">
                                      <div class="text-black text-body-1 text-uppercase">
                                        <v-icon large class="mr-1" color="blue-grey darken-2">mdi-calendar</v-icon>
                                        Fourth Quarter
                                      </div>
                                      <div class="text-black pl-8">
                                        <strong class="text-body-2">
                                          {{ item.scores.forth_sem ? item.scores.forth_sem : 'TBA' }} items
                                        </strong>
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
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="8">
            <v-card :title="`${classroom_data.grade_level}- ${classroom_data.section}`"
              subtitle="A brief overview of classroom examination result per Quarter.">

              <v-card-text style="height:78vh; justify-content: center; align-items: center;  overflow-y: auto; ">
                <v-sheet border>
                  <v-data-table :group-by="groupBy" :headers="headers" :items="classroom_data.students"
                    item-value="name" class="my-data-table">
                    <template v-slot:group-header="{ item, columns, toggleGroup, isGroupOpen }">
                      <tr>
                        <td :colspan="columns.length">
                          <v-btn color="primary" :icon="isGroupOpen(item) ? '$expand' : '$next'" size="small"
                            variant="text" @click="toggleGroup(item)"></v-btn>
                          <v-chip color="primary">{{ item.value }}</v-chip>
                        </td>
                      </tr>
                    </template>
                    <template v-slot:item.name="{ item }">
                      <span>{{ item.name }}</span>
                    </template>

                    <template v-slot:item.subjects="{ item }">

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
                          <v-list-item v-for="(subject, index) in item.selectable.semesters[0].subjects || []"
                            :key="index">
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
                          <v-list-item v-for="(subject, index) in item.selectable.semesters[1].subjects || []"
                            :key="index">
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
                          <v-list-item v-for="(subject, index) in item.selectable.semesters[2].subjects || []"
                            :key="index">
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
                          <v-list-item v-for="(subject, index) in item.selectable.semesters[3].subjects || []"
                            :key="index">
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
                </v-sheet>

              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

      </v-sheet>
    </v-dialog>

    <v-dialog v-model="update_dialog" width="70%">
      <v-card>
        <v-card-title class="text-h5">Update Student Exam Results</v-card-title>
        <v-card-subtitle>View and update student exam scores per quarter</v-card-subtitle>

        <v-list bg-color="#E8EAF6" class="py-3">
          <v-list-item title="Class Adviser:" subtitle="Sheila Mae Paclian"></v-list-item>
          <v-list-item title="School Year:" subtitle="2023-2024"></v-list-item>
        </v-list>
        <v-card-text style="height:auto; max-height: 70vh; overflow-y: auto;">
          <b class="text-h6 mb-4 text-center text-indigo">The Classroom Student List</b>
          <v-expansion-panels class="bg-light-blue-grey" variant="inset">
            <v-expansion-panel v-for="(student, index) in students" :key="student.id">
              <v-expansion-panel-title>{{ index + 1 }}). {{ student.name }}</v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-list dense>
                  <v-list-item>
                    <v-row dense>
                      <v-col cols="12" v-for="(semester, sIndex) in student.semesters" :key="sIndex" class="mb-4">
                        <div class="text-h6 mb-2">{{ semester.title }}</div>
                        <v-divider class="my-2"></v-divider>
                        <v-row dense>
                          <v-col cols="6" v-for="(subject, subIndex) in semester.subjects" :key="subIndex">
                            <v-row dense>
                              <v-col cols="4">
                                <v-list-subheader>{{ subject?.name }}</v-list-subheader>
                              </v-col>
                              <v-col cols="8">
                                <v-text-field bg-color="grey" placeholder="Enter Exam Score" hide-details />
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>

                      </v-col>
                    </v-row>
                  </v-list-item>
                </v-list>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="exam_dialog" max-width="80%">
      <v-card>
        <v-toolbar color="primary" class="elevation-4">
          <v-toolbar-title class="d-flex align-center">
            <v-icon left color="amber" class="mr-3" size="32">mdi-book-open-page-variant</v-icon>
            <span class="font-weight-meduim text-white">Classroom Record</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon @click="exam_dialog = false" class="white--text">
              <v-icon size="32" color="error">mdi-close-circle</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text style="height:auto; max-height: 75vh; overflow-y: auto;">
          <v-row dense>
            <v-col cols="6" class="pr-4">
              <v-card flat elevation="2" variant="tonal">
                <v-card-text>
                  <v-row dense>
                    <!-- Grade Level and Section -->
                    <v-col cols="6">
                      <v-text-field v-model="school_form.grade_level" label="Grade Level" required hide-details
                        prepend-inner-icon="mdi-school" outlined></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field v-model="school_form.section" label="Section" required hide-details
                        prepend-inner-icon="mdi-format-list-numbered" outlined></v-text-field>
                    </v-col>

                    <!-- Subjects Selection -->
                    <v-col cols="12">
                      <p class="text-primary font-weight-medium mt-2">
                        Select subjects for the students. These will be applied to the classroom.
                      </p>
                      <v-chip-group v-model="school_form.subjects" column multiple>
                        <v-chip v-for="subject in subject_data" :key="subject" :value="subject" color="amber darken-2"
                          text-color="white" variant="outlined" filter>
                          {{ subject }}
                        </v-chip>
                      </v-chip-group>
                    </v-col>
                  </v-row>

                  <!-- Examination Items -->
                  <v-sheet v-if="hide">
                    <v-row dense class="text-center font-weight-medium text-body-2 mb-1 text-primary"
                      v-if="school_form.subjects.length > 0">
                      <v-col cols="12" class="my-1 text-start text-caption font-weight-medium text-grey text-uppercase">
                        <v-icon left class="mr-1">mdi-file-document-edit-outline</v-icon>
                        Enter Examinations Items
                      </v-col>

                      <v-divider />
                      <v-col cols="4" class="text-start">SUBJECTS</v-col>
                      <v-col cols="2">1st</v-col>
                      <v-col cols="2">2nd</v-col>
                      <v-col cols="2">3rd</v-col>
                      <v-col cols="2">4th</v-col>
                      <v-divider />
                    </v-row>
                    <v-row dense v-for="(item, index) in school_form.exam_items" :key="index" class="mb-1">
                      <v-col cols="4" class="text-uppercase font-weight-medium text-body-2 mt-3">{{ item.name
                        }}</v-col>
                      <v-col cols="2">
                        <v-text-field v-model="item.scores.first_sem" hide-details type="number" outlined dense />
                      </v-col>
                      <v-col cols="2">
                        <v-text-field v-model="item.scores.second_sem" hide-details type="number" outlined dense />
                      </v-col>
                      <v-col cols="2">
                        <v-text-field v-model="item.scores.third_sem" hide-details type="number" outlined dense />
                      </v-col>
                      <v-col cols="2">
                        <v-text-field v-model="item.scores.forth_sem" hide-details type="number" outlined dense />
                      </v-col>

                    </v-row>
                  </v-sheet>
                  <v-row dense justify="end" v-if="school_form.exam_items.length">
                    <v-col cols="auto">
                      <v-btn @click="hide = !hide" block density="compact" color="primary">
                        {{ hide ? 'Hide' : 'View Setted Exam Items' }}
                      </v-btn>
                    </v-col>

                  </v-row>

                  <!-- Student Entry Form -->
                  <v-card outlined class="mt-4" color="grey lighten-4">
                    <v-card-title class="text-body-1 text-white">
                      <v-icon left color="primary" size="24">mdi-account-plus</v-icon>
                      Enter Student Details
                    </v-card-title>
                    <v-card-text>
                      <v-row dense>
                        <v-col cols="4">
                          <v-text-field v-model="student.first_name" label="First Name" required hide-details outlined
                            prepend-inner-icon="mdi-account" />
                        </v-col>
                        <v-col cols="4">
                          <v-text-field v-model="student.middle_name" label="Middle Name" required hide-details outlined
                            prepend-inner-icon="mdi-account-outline" />
                        </v-col>
                        <v-col cols="4">
                          <v-text-field v-model="student.last_name" label="Last Name" required hide-details outlined
                            prepend-inner-icon="mdi-account-outline" />
                        </v-col>
                      </v-row>

                      <v-row dense v-for="subject in school_form.subjects" :key="subject">
                        <v-col cols="4" class="text-uppercase mt-4 font-weight-medium text-body-2">{{ subject }}</v-col>
                        <v-col cols="5" v-if="student.subjects[subject]">
                          <v-text-field variant="underlined" v-model="student.subjects[subject].first_sem"
                            label="Enter Score" required hide-details outlined />
                        </v-col>
                      </v-row>

                      <v-row dense justify="end" class="mt-4">
                        <v-col cols="3">
                          <v-btn @click="add_student" block color="success" dark prepend-icon="mdi-pencil-plus">
                            Add Student
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-card-text>
              </v-card>

            </v-col>
            <v-col cols="6">
              <span></span>
              <v-card border class="mx-auto">
                <v-data-table :headers="student_headers" :items="school_form.students">
                  <template v-slot:item.actions="{ item }">
                    <v-btn color="error" density="compact">
                      <v-icon>mdi-delete</v-icon> Remove
                    </v-btn>
                  </template>
                  <template v-slot:top>
                    <v-toolbar flat>
                      <v-toolbar-title class="text-subtitle-1"> <v-icon color="primary mr-2"
                          size="24">mdi-account-group-outline</v-icon>List of
                        Students
                        Classroom</v-toolbar-title>

                      <v-spacer></v-spacer>
                    </v-toolbar>
                  </template>
                  <template #bottom v-if="!show_footer" />
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-row justify="center" dense>
            <v-col cols="3"> <v-btn block text="Close" color="error" variant="tonal"></v-btn></v-col>
            <v-col cols="3"> <v-btn block @click="create_school_form" color="success" text="Save"
                variant="tonal"></v-btn></v-col>
          </v-row>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">

import { ref } from 'vue';
const { $rest } = useNuxtApp();
onBeforeMount(() => {
  Promise.all([
    get_subject(),
    get_school_form(),
    get_school(),

  ])
})
definePageMeta({ layout: "sample" });

const hide = ref(true)
const view = ref(null)
const view_dialog = ref(false)
const update_dialog = ref(false)

const table_headers = ref([
  { title: "Grade Level", key: "grade_level", sortable: false },
  { title: "Section", key: "section", sortable: false },
  { title: "School", key: "school", sortable: false },
  { title: "Adviser", key: "adviser", sortable: false },
  { title: "Number of Students", key: "students", sortable: false },
  { title: "Action", key: "actions", sortable: false },
]);
const show_footer = ref(false)

const student_headers = ref([
  { title: "First Name", key: "first_name", sortable: false },
  { title: "Middle Name", key: "middle_name", sortable: false },
  { title: "Last Name", key: "last_name", sortable: false },
  { title: "Action", key: "actions", sortable: false },
]);
const subject_data = ref([]);

// Function to fetch subjects
async function get_subject() {
  const { data, error } = await $rest('es-subject/get-subject', {
    method: "GET",
  });
  subject_data.value = data.map(subject => subject.name.toLowerCase());
}

const school_form = ref({
  adviser: "Marianne Mae Paclian",
  school: "Calbiga National High School",
  grade_level: "",
  section: "",
  subjects: [],
  exam_items: [],
  students: []
});

// Compute exam items based on subjects
const classExamItems = computed(() => {
  return school_form.value.subjects.map(subject => ({
    name: subject,
    scores: {
      first_sem: null,
      second_sem: null,
      third_sem: null,
      forth_sem: null,
    },
  }));
});

// Update the exam_items in school_form when subjects change
watch(() => school_form.value.subjects, (newSubjects) => {
  school_form.value.exam_items = classExamItems.value;
});


// Define Student interface
interface Student {
  first_name: string;
  middle_name: string;
  last_name: string;
  subjects: Record<string, {
    first_sem: string | null;
    second_sem: string | null;
    third_sem: string | null;
    forth_sem: string | null;
  }>;
}

// Compute student subjects based on school_form subjects
const studentSubjects = computed(() => {
  const subjects = {};
  school_form.value.subjects.forEach(subject => {
    subjects[subject] = {
      first_sem: null,
      second_sem: null,
      third_sem: null,
      forth_sem: null,
    };
  });
  return subjects;
});

// Initialize student ref with default subjects
const student = ref<Student>({
  first_name: "",
  middle_name: "",
  last_name: "",
  subjects: studentSubjects.value
});

// Watch for changes in school_form subjects to update student subjects
watch(() => school_form.value.subjects, (newSubjects) => {
  student.value.subjects = studentSubjects.value;
});
function add_student() {
  const new_student: Student = {
    first_name: student.value.first_name,
    middle_name: student.value.middle_name,
    last_name: student.value.last_name,
    subjects: JSON.parse(JSON.stringify(student.value.subjects))
  };

  school_form.value.students.push(new_student);

  student.value.first_name = "";
  student.value.middle_name = "";
  student.value.last_name = "";
  student.value.subjects = studentSubjects.value;
}
let classes = ref<any>(null);
function view_item(item: any) {
  classes.value = item;
  view_dialog.value = true;
}

async function create_school_form() {
  const { data, error } = await $rest('es-school-form/create-school-form', {
    method: "POST",
    body: { ...school_form.value }
  });
  console.log(school_form.value);
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}

const school_form_data = ref([]);
async function get_school_form() {
  const { data, error } = await $rest('es-school-form/get-school-form', {
    method: "GET",
  })
  school_form_data.value = data
}

const sections = computed(() => [...new Set(school_form_data.value.map((i) => i.section))]);
const advisers = computed(() => [...new Set(school_form_data.value.map((i) => i.adviser))]);

const school_data = ref([]);
async function get_school() {
  const { data, error } = await $rest('es-school/get-school', {
    method: "GET",
  })
  school_data.value = data.map((i) => i.name)
}



const exam_dialog = ref(false)
const groupBy = ref([{ key: 'name', order: 'asc' }]);

const headers = ref([
  { title: 'Subjects', key: 'subjects', sortable: false },
  { title: 'First Quarter', key: 'firstQuarterScore', sortable: true },
  { title: 'Second Quarter', key: 'secondQuarterScore', sortable: true },
  { title: 'Third Quarter', key: 'thirdQuarterScore', sortable: true },
  { title: 'Fourth Quarter', key: 'fourthQuarterScore', sortable: true },
]);
const classroom_data = ref<any[]>([]);


// Updated formatting function
function view_classroom(selectedClassroom: any) {
  const students = selectedClassroom.students || [];

  // Sort students by last name (surname)
  const sortedStudents = students.sort((a, b) => {
    const lastNameA = a.last_name.toLowerCase(); // Convert to lowercase for case-insensitive sorting
    const lastNameB = b.last_name.toLowerCase();

    if (lastNameA < lastNameB) return -1; // a comes before b
    if (lastNameA > lastNameB) return 1;  // a comes after b
    return 0; // names are equal
  });

  // Format the student data
  const formattedStudents = formatStudentData(sortedStudents);

  // Prepare the final classroom data object
  classroom_data.value = {
    grade_level: selectedClassroom.grade_level,
    section: selectedClassroom.section,
    adviser: selectedClassroom.adviser,
    exam_items: selectedClassroom.exam_items,
    students: formattedStudents
  };

  // Open the dialog to view the classroom details
  view_dialog.value = true;
}


// Updated formatting function
function formatStudentData(data: any[]) {
  return data.map((student: any, index: number) => ({
    id: index + 1,
    name: `${student.last_name}, ${student.first_name} ${student.middle_name || ''}`.trim(),
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
}

// Helper function for subject formatting
function formatSubjects(subjects: Record<string, any>, semesterKey: string) {
  return Object.keys(subjects).map(subjectName => ({
    name: capitalize(subjectName),
    score: subjects[subjectName][semesterKey] || null
  }));
}
function formatExamitem(subjects: Record<string, any>, semesterKey: string) {
  return Object.keys(subjects).map(subjectName => ({
    name: capitalize(subjectName),
    score: subjects[subjectName][semesterKey] || null
  }));
}


// Capitalize the first letter of the word
function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}


const formattedData = ref<any[]>([]);


// SAMPLE
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
.bg-basil {
  background-color: #0d048d !important;
}

.maintenance-item {
  transition: background-color 0.3s ease-in-out;
}

.maintenance-item:hover {
  background-color: #E8EAF6;
}





table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;

}

td,
th {
  border: none;
  padding: 6px;
  font-size: 12px;
  line-height: normal;
  word-break: break-word;
  font-weight: normal;
}

tr,
th {
  font-weight: bold;
}
</style>
