<template>
  <div>
    <v-row no-gutters>
      <v-col cols="12">
        <v-btn prepend-icon="mdi-pencil-plus" @click="project_create_dialog = true" color="green darken-4" rounded="0">
          Create Project
        </v-btn>
        <commons-sms class="my-2 mr-3" title="Project Management" subtitle="A brief overview of projects." rounded="lg"
          :items="project_data" :display_types="['grid', 'table']">
          <template v-slot:item="{ value, index }">
            <v-card :key="index" border class=" ma-1" rounded="lg">
              <v-card-text>
                <div class="d-flex align-center">
                  <div class="d-flex">
                    <v-icon class="mr-2 text-primary">mdi-folder-cog</v-icon>
                    <span class="text-body-1 font-weight-medium">{{ value.name }}</span>
                  </div>

                </div>

                <div class="d-flex align-center mb-1">
                  <v-icon class="mr-2 text-blue">mdi-map-marker</v-icon>
                  <span class="text-body-2 text-grey">{{ value.address }}</span>
                </div>

                <div class="text-body-2">
                  <v-icon class="mr-2">mdi-account-hard-hat</v-icon>
                  <span class="text-grey-darken-2">{{ value.engineer
                    || 'Unassigned' }}</span>
                </div>

                <div class="mt-2">
                  <v-menu :close-on-content-click="false" location="end">
                    <template v-slot:activator="{ props }">
                      <v-btn v-bind="props" density="compact" color="primary">Manage</v-btn>
                    </template>
                    <v-card min-width="300">
                      <v-list>
                        <v-list-item title="Manage Project">
                          <template v-slot:append>
                            <v-icon color="green darken-4" size="24">mdi-folder</v-icon>
                          </template>
                        </v-list-item>
                      </v-list>
                      <v-divider></v-divider>
                      <v-list lines="two">
                        <v-list-item title="Update Project" subtitle="Modify project details."
                          @click="update_project_dialog = true">
                          <template v-slot:prepend>
                            <v-icon color="primary" size="22">mdi-pencil-outline</v-icon>
                          </template>
                        </v-list-item>
                        <v-list-item title="View Project" subtitle="Modify project details.">
                          <template v-slot:prepend>
                            <v-icon color="primary" size="22">mdi-eye</v-icon>
                          </template>
                        </v-list-item>
                        <v-list-item title="Archive Project" subtitle="Move project to archive.">
                          <template v-slot:prepend>
                            <v-icon color="primary" size="22">mdi-archive-outline</v-icon>
                          </template>
                        </v-list-item>
                      </v-list>
                      <v-card-actions>
                        <v-spacer />
                        <v-btn variant="text" color="error">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </div>
              </v-card-text>
            </v-card>
          </template>

          <template v-slot:table="{ items }">
            <v-sheet border>
              <v-data-table :items="items" :headers="project_headers">
                <template v-slot:item.status="{ item }">
                  <v-chip density="compact" :color="item.status === 'pending' ? 'error' : 'success'" variant="tonal">{{
                    item.selectable.status }}</v-chip>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-btn density="compact" color="primary" @click="manageProject(item)">
                    Manage
                  </v-btn>
                </template>
              </v-data-table>
            </v-sheet>
          </template>
        </commons-sms>
      </v-col>
    </v-row>

    <!-- Create Project Dialog -->
    <v-dialog v-model="project_create_dialog" max-width="40%">
      <v-sheet>
        <v-toolbar color="green darken-4" border>
          <v-list-item class="pl-2" density="compact">
            <template v-slot:prepend>
              <v-avatar class="mr-1" variant="text">
                <v-icon icon="mdi-folder" dark />
              </v-avatar>
            </template>
            <v-list-item-title>Create New Project</v-list-item-title>
            <v-list-item-subtitle>Enter Project Details</v-list-item-subtitle>
          </v-list-item>
          <v-spacer />
          <v-btn @click="project_create_dialog = false" class="mr-0" rounded="0" icon="mdi-close" />
        </v-toolbar>
        <v-card-text>
          <v-form ref="project_form">
            <v-row dense>
              <v-col cols="12">
                <v-text-field v-model="project.name" label="Project Name" required />
              </v-col>
              <!-- <v-col cols="6">
                <v-text-field v-model="project.manager" label="Project Manager" required />
              </v-col> -->
              <v-col cols="6">
                <v-text-field v-model="project.engineer" label="Deadline" type="date" />
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="project.address" label="Address" />
              </v-col>
              <v-col cols="6">
                <v-text-field v-model="project.status" label="Status" />
              </v-col>
              <v-col cols="6">
                <v-sheet class="pa-2 rounded-md bg-blue-lighten-5">
                  <span class="text-body-2 text-grey-darken-3">
                    The control number is auto-generated in the format:
                    <strong>Project Acronym + Form Code + Year + Sequence (e.g., AT-PR-2025-001)</strong>.
                  </span>
                </v-sheet>
                <v-text-field v-model="project.control_number" label="Control Number" class="mt-2" variant="outlined" />
              </v-col>

            </v-row>
          </v-form>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-row dense justify="center">
            <v-col cols="4">
              <v-btn @click="create_project" variant="tonal" color="green darken-4" block>
                <v-icon class="pr-2" size="28">mdi-folder-plus</v-icon> Create Project
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-sheet>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const { $rest } = useNuxtApp();
onBeforeMount(() => {
  Promise.all([
    get_project(),

  ])
})
definePageMeta({ layout: "barren" });

const project_create_dialog = ref(false);
const project_data = ref([]);
const project = ref({ name: "", engineer: "", address: "", status: "", control_number: "" });

const project_headers = ref([
  { title: "Project Name", key: "name" },
  { title: "Assigned Engineer", key: "engineer" },
  { title: "Address", key: "address" },
  { title: "Status", key: "status" },
  { title: "Actions", key: "actions" },
]);

async function create_project() {
  const { data, error } = await $rest('projects/create-project', {
    method: "POST",
    body: { ...project.value }
  });
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: false });
  swal({ title: "Success", text: data, icon: "success", buttons: false });
  project_create_dialog.value = false;
  get_project();
}

async function get_project() {
  const { data } = await $rest('projects/get-project', { method: "GET" });
  project_data.value = data;
}


</script>