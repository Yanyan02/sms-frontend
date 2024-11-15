<template>
  <div>
    <v-card-text>
      <v-tabs v-model="tab" color="indigo darken-3" background-color="grey lighten-4" align-tabs="start" centered
        stacked>
        <v-tab :value="1" class="px-15">
          <v-icon left class="mr-2">mdi-certificate</v-icon>
          Schools
        </v-tab>

        <v-tab :value="2" class="px-15">
          <v-icon left class="mr-2">mdi-cog</v-icon>
          Subjects
        </v-tab>

        <v-tab :value="3" class="px-15">
          <v-icon left class="mr-2">mdi-human</v-icon>
          Users
        </v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item :value="1">
          <v-card color="transparent" flat>
            <v-list-item class="pa-2"> <template v-slot:prepend>
                <v-icon color="primary" size="36">mdi-school</v-icon>
              </template>
              <template v-slot:title>
                <v-row dense>
                  <v-col cols="10">
                    <h3 class="text-primary mt-4 font-weight-medium">Summary of Schools</h3>
                    <h5 class="text-grey-500 font-weight-light mb-2">An overview of invited schools.</h5>
                  </v-col>
                  <v-col cols="2" class="d-flex align-end justify-end">
                    <v-btn @click="school_dialog = true" color="primary" prepend-icon="mdi-pencil-plus" elevation="2">
                      Create Schools
                    </v-btn>
                  </v-col>
                </v-row>
              </template>
            </v-list-item>
            <v-divider class="my-4" />
            <v-card-text>
              <!-- School Cards Section -->
              <v-row dense>

                <v-col cols="4" v-for="(school, index) in school_data" :key="school">
                  <v-card elevation="3" class="mx-auto">
                    <v-card-text>
                      <div>
                        <v-chip class="text-overline mb-1 text-primary" density="compact">{{ new
                          Date(school?.date).toDateString()
                          }}</v-chip>
                        <div class="text-h6 font-weight-bold mb-2">{{ school.name }}</div>
                        <div class="text-caption grey--text">{{ school.address }}</div>
                      </div>

                    </v-card-text>
                    <v-card-actions>
                      <v-btn density="compact" color="primary" variant="outlined" class="ml-auto">
                        See More
                      </v-btn>
                    </v-card-actions>

                  </v-card>
                </v-col>

                <!-- Add more school cards as needed here -->
              </v-row>
            </v-card-text>
          </v-card>


        </v-window-item>
        <v-window-item :value="2" height="80vh">
          <v-card color="transparent" flat>
            <v-list-item class="pa-2"> <template v-slot:prepend>
                <v-icon color="primary" size="36">mdi-book-open</v-icon>
              </template>
              <template v-slot:title>
                <v-row dense>

                  <v-col cols="10">
                    <h3 class="text-primary mt-4 font-weight-medium">Summary of Subjects</h3>
                    <h5 class="text-grey-500 font-weight-light mb-2">An overview of subjects.</h5>
                  </v-col>
                  <v-col cols="2" class="d-flex align-end justify-end">
                    <v-btn @click="subject_dialog = true" color="primary" prepend-icon="mdi-pencil-plus" elevation="2">
                      Create Subjects
                    </v-btn>
                  </v-col>
                </v-row>
              </template>
            </v-list-item>

            <v-divider class="my-4" />

            <v-card-text>
              <!-- School Cards Section -->
              <v-row dense>
                <v-col cols="4" v-for="(subject, index) in subject_data" :key="index">
                  <v-card class="mx-auto" elevation="3">
                    <v-card-title class="d-flex justify-space-between align-center">
                      <span>{{ subject.name }}</span>
                    </v-card-title>
                    <v-card-subtitle class="mb-2 grey--text text--darken-1"> {{ new
                      Date(school?.date).toDateString() }}</v-card-subtitle>
                    <v-card-text>
                      <p class="body-2 grey--text text--darken-1">
                        {{ subject.description }}
                      </p>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn density="compact" color="primary" variant="outlined" class="ml-auto">
                        Learn More
                      </v-btn>
                    </v-card-actions>
                  </v-card>

                </v-col>


              </v-row>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item :value="3" height="80vh">
          <v-card color="transparent" flat>
            <v-list-item class="pa-2"> <template v-slot:prepend>
                <v-icon color="indigo" dark size="36">mdi-human</v-icon>
              </template>
              <template v-slot:title>
                <v-row dense>
                  <v-col cols="10">
                    <div class="text-primary text-h5 mt-4">List of Users</div>
                    <div class="text-grey-500 font-weight-light mb-2">An overview advisers and administratives.</div>
                  </v-col>
                  <v-col cols="2" class="d-flex align-end justify-end">
                    <v-btn color="primary" prepend-icon="mdi-pencil-plus" elevation="2">
                      Invite User
                    </v-btn>
                  </v-col>
                </v-row>
              </template>
            </v-list-item>

            <v-divider class="mb-4" />
            <v-row dense>


              <v-col cols="12" md="2">
                <v-select label="Filter by School" item-value="_id" persistent-hint clearable dense />
              </v-col>

              <v-col cols="12" md="2">
                <v-select label="Filter by Status" item-value="_id" persistent-hint clearable dense />
              </v-col>

              <v-col cols="auto" class="d-flex justify-end align-center">
                <v-btn class="mb-4" color="primary" outlined>
                  <v-icon class="pr-1">mdi-filter</v-icon>
                  Filter
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-sheet border>
                  <v-data-table :headers="table_headers" :items="table_data" class="elevation-1">
                    <!-- Custom Slot for Status Chip -->
                    <template v-slot:item.date="{ item }">
                      <span class="text-caption text-blue font-italic">
                        {{ item.selectable.date }}
                      </span>
                    </template>
                    <template v-slot:item.status="{ item }">
                      <v-chip density="compact" variant="outlined" class="text-caption text-uppercase"
                        :class="item.selectable.status === 'Active' ? 'text-green' : 'text-red'">
                        {{ item.selectable.status }}
                      </v-chip>
                    </template>

                    <template v-slot:item.role="{ item }">
                      <v-chip density="compact" variant="outlined" class="text-caption text-uppercase"
                        :class="item.selectable.role === 'Admin' ? 'text-blue' : 'text-orange'">
                        {{ item.selectable.role }}
                      </v-chip>
                    </template>

                    <!-- Custom Slot for Actions -->
                    <template v-slot:item.actions="{ item }">
                      <v-menu :close-on-content-click="false" location="end">
                        <template v-slot:activator="{ props }">
                          <v-btn color="primary" v-bind="props" density="compact">
                            Actions
                          </v-btn>
                        </template>

                        <v-card min-width="250">
                          <v-list>
                            <v-list-item title="Endorsement Letter">
                              <template v-slot:append>
                                <v-icon>mdi-file-document</v-icon>
                              </template>
                            </v-list-item>

                            <v-divider class="my-1"></v-divider>

                            <v-list-item>
                              <v-icon class="px-4" color="primary">mdi-magnify</v-icon>
                              View Details
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
                </v-sheet>
              </v-col>
            </v-row>



          </v-card>

        </v-window-item>

      </v-window>
    </v-card-text>
    <v-dialog v-model="school_dialog" max-width="600">
      <v-card prepend-icon="mdi-school" title="Create School">
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field v-model="school.name" label="School Name" hide-details required />
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="school.email" label="Email Address" hide-details required />
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="school.address" rows="3" label="Address" hide-details></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" variant="plain" @click="school_dialog = false"></v-btn>
          <v-btn color="success" text="Save" @click="create_school" variant="tonal"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="subject_dialog" max-width="600">
      <v-card prepend-icon="mdi-book-open" title="Subject">
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field v-model="subject.name" label="Subject name" required />
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="subject.description" rows="3" label="Description" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="subject_dialog = false" text="Close" variant="plain"></v-btn>
          <v-btn @click="create_subject" color="primary" text="Save" variant="tonal"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const { $rest } = useNuxtApp();
onBeforeMount(() => {
  Promise.all([
    get_school(),
    get_subject()
  ])
})
definePageMeta({ layout: "sample-plain" });
const tab = ref(null);
const table_headers = ref([
  { title: "Date Invited", key: "date", sortable: false },
  { title: "Advisers Name", key: "adviser", sortable: false },
  { title: "Schools", key: "school", sortable: false },
  { title: "Status", key: "status", sortable: false },
  { title: "Role", key: "role", sortable: false },
  { title: "Action", key: "actions", sortable: false },
]);
const show_footer = ref(false)

const table_data = ref([
  {
    date: "January 1, 2024",
    adviser: "Marianne Mae Paclian",
    school: "Calbiga National High School",
    status: "Active",
    role: "Admin",
    actions: ["Suspend", "View Profile"],
  },
  {
    date: "January 1, 2024",
    adviser: "John Dela Cruz",
    school: "Tacloban City High School",
    status: "Active",
    role: "Adviser",
    actions: ["Suspend", "View Profile"],
  },
  {
    date: "January 1, 2024",
    adviser: "Sarah Reyes",
    school: "Samar State University",
    status: "Inactive",
    role: "Adviser",
    actions: ["Activate", "View Profile"],
  },
  {
    date: "January 1, 2024",
    adviser: "Mark Santos",
    school: "Leyte National High School",
    role: "Admin",
    status: "Active",
    actions: ["Suspend", "View Profile"],
  },
]);
// School
const school_dialog = ref(false)
const school = ref({
  date: new Date(),
  name: "",
  address: "",
  email: "",
})
async function create_school() {
  const { data, error } = await $rest('es-school/create-school', {
    method: "POST",
    body: { ...school.value }
  });
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  get_school()
  school_dialog.value = false;
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}
const school_data = ref([]);
async function get_school() {
  const { data, error } = await $rest('es-school/get-school', {
    method: "GET",
  })
  school_data.value = data
}
// School

// Subject
const subject_dialog = ref(false)
const subject = ref({
  date: new Date(),
  name: "",
  description: "",
})
async function create_subject() {
  const { data, error } = await $rest('es-subject/create-subject', {
    method: "POST",
    body: { ...subject.value }
  });
  console.log(subject.value);
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
  return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}
const subject_data = ref([]);
async function get_subject() {
  const { data, error } = await $rest('es-subject/get-subject', {
    method: "GET",
  })
  subject_data.value = data
}




</script>
<style scoped>
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
