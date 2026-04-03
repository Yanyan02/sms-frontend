<template>
  <div class="ma-4">
    <v-row no-gutters>
      <v-col cols=" 12" class="py-2">
        <v-row align="center" dense>
          <v-col cols="12" md="4">
            <v-text-field v-model="search_query" label="Search Projects" variant="comfortable" rounded="xl" hide-details
              density="compact" clearable prepend-inner-icon="mdi-magnify" bg-color="grey-lighten-1" />
          </v-col>

          <v-col cols="12" md="4">
            <v-select v-model="filter_status" label="Filter by Status"
              :items="['All', 'Planned', 'Ongoing', 'Delayed', 'Completed']" variant="comfortable" rounded="xl"
              hide-details density="compact" prepend-inner-icon="mdi-filter-variant" bg-color="grey-lighten-1"
              clearable />
          </v-col>

          <v-spacer />
          <v-col cols="12" md="auto" class="px-2 text-right">
            <v-btn prepend-icon="mdi-plus-circle" @click="open_create_project" color="primary" rounded="xl"
              elevation="2" size="large" block class="px-6">
              Create Project
            </v-btn>
          </v-col>

        </v-row>
      </v-col>


      <v-col cols="12" class="mt-2">
        <commons-sms class="mr-3" title="PROJECT MANAGEMENT" subtitle="A brief overview of projects." rounded="xl"
          elevation="5" :items="filtered_projects" :display_types="['grid', 'table']">
          <template v-slot:item="{ value, index }">
            <v-card :key="index" class="ma-1 elevation-1" rounded="xl" border="sm"
              style="border-color: #f0f0f0 !important; transition: transform 0.2s ease-in-out;"
              @mouseover="hover = index" @mouseout="hover = null"
              :style="{ transform: hover === index ? 'translateY(-4px)' : 'translateY(0px)' }">
              <v-list-item class="px-2 pt-4 py-2">
                <template v-slot:prepend>
                  <v-avatar color="primary" rounded="lg" size="48" class="mr-3">
                    <v-icon color="white">mdi-folder-outline</v-icon>
                  </v-avatar>
                </template>

                <v-list-item-title class="text-subtitle-1 font-weight-black text-primary">
                  {{ value.name }}
                </v-list-item-title>

                <v-list-item-subtitle class="text-caption d-flex align-center mt-1">
                  <v-icon size="14" color="indigo" class="mr-1">mdi-map-marker-outline</v-icon>
                  {{ value.address }}
                </v-list-item-subtitle>

                <template v-slot:append>
                  <v-menu location="bottom end" transition="scale-transition">
                    <template v-slot:activator="{ props }">
                      <v-btn v-bind="props" icon="mdi-dots-vertical" variant="text" color="grey-lighten-1"
                        density="comfortable" />
                    </template>
                    <v-list rounded="lg" elevation="12" min-width="180" class="pa-2">
                      <v-list-item prepend-icon="mdi-pencil-outline" title="Edit" @click="open_update_project(value)"
                        rounded="md" class="mb-1" />
                      <v-list-item prepend-icon="mdi-eye-outline" title="View" rounded="md" class="mb-1" />
                      <v-divider class="my-1" />
                      <v-list-item prepend-icon="mdi-archive-outline" title="Archive" color="error" rounded="md" />
                    </v-list>
                  </v-menu>
                </template>
              </v-list-item>

              <v-card-text class="px-4 py-2">
                <div class="d-flex align-center mb-4 bg-grey-lighten-3 pa-2 rounded-lg">
                  <v-icon size="18" class="mr-2 text-indigo">mdi-account-hard-hat</v-icon>
                  <span class=" font-weight-medium text-grey-darken-5">
                    Assign Engineer: <strong> {{ value.engineer || 'TBA' }}</strong>
                  </span>
                </div>

                <v-row no-gutters align="center" class="mb-2">
                  <v-col cols="8">
                    <div class="d-flex align-center">
                      <div class="text-center">
                        <div class="text-xxs text-grey-lighten-1 font-weight-bold text-uppercase"
                          style="font-size: 0.65rem;">Started
                        </div>
                        <div class="text-caption font-weight-bold">{{ formatDate(value.start_date) }}</div>
                      </div>
                      <v-icon size="16" class="mx-3 text-grey-lighten-2">mdi-arrow-right-thin</v-icon>
                      <div class="text-center">
                        <div class="text-xxs text-grey-lighten-1 font-weight-bold text-uppercase"
                          style="font-size: 0.65rem;">Deadline
                        </div>
                        <div class="text-caption font-weight-bold text-error">{{ formatDate(value.end_date) }}</div>
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="4" class="text-right">
                    <div class="text-h6 font-weight-black text-indigo-accent-4" style="line-height: 1;">
                      {{ daysBetween(value.start_date, value.end_date) }}
                      <span class="text-caption ml-1 font-weight-medium text-grey">Days</span>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-divider />
              <v-card-actions class="bg-primary px-4">
                <span class="text-button text-white">PROJECT STATUS</span>
                <v-spacer />
                <v-chip size="small" color="white" variant="flat"
                  class="font-weight-black text-button text-primary px-3">
                  {{ value.status || 'PENDING' }}
                </v-chip>
              </v-card-actions>
            </v-card>
          </template>

          <!-- Table View -->
          <template v-slot:table="{ items }">
            <v-sheet border>
              <v-data-table :items="items" :headers="project_headers">
                <template v-slot:item.status="{ item }">

                  <v-chip class="text-button" density="comfortable"
                    :color="item.status === 'pending' ? 'error' : 'success'" variant="elevated">
                    {{ item.selectable.status }}
                  </v-chip>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-btn density="compact" color="primary" @click="open_update_project(item)">Manage</v-btn>
                </template>
              </v-data-table>
            </v-sheet>
          </template>

        </commons-sms>
      </v-col>
    </v-row>

    <!-- Dialog -->
    <v-dialog v-model="project_dialog" max-width="850" persistent>
      <v-card rounded="xl" class="pa-4">
        <v-card-title class="d-flex align-center pt-4 px-4 pb-0">
          <v-avatar color="primary" variant="tonal" rounded="lg" size="54" class="mr-4">
            <v-icon size="32">
              {{ project_dialog_type === 'create' ? 'mdi-plus-box-multiple' : 'mdi-pencil-outline' }}
            </v-icon>
          </v-avatar>
          <div>
            <div class="text-h5 font-weight-black text-primary">
              {{ project_dialog_type === 'create' ? 'New Project' : 'Update Project' }}
            </div>
            <div class="text-caption text-grey-darken-1">
              {{ project_dialog_type === 'create' ? 'Initialize a new construction site record.'
                : 'Modify existing project parameters.' }}
            </div>
          </div>
          <v-spacer />
          <v-btn icon="mdi-close" variant="text" color="grey-lighten-1" @click="close_project_dialog" />
        </v-card-title>

        <v-card-text class="mt-6">
          <v-form ref="project_form">
            <v-row dense>
              <v-col cols="12" class="mb-4">
                <div class="text-overline text-primary font-weight-bold mb-2">Primary Information</div>
                <v-text-field v-model="selected_project.name" label="Project Title" variant="underlined" color="primary"
                  placeholder="Enter formal project name" class="mb-2" />
                <v-text-field v-model="selected_project.address" label="Site Location" variant="underlined"
                  color="primary" prepend-inner-icon="mdi-map-marker-outline" />
              </v-col>

              <v-col cols="12" md="6" class="pr-md-4">
                <div class="text-overline text-primary font-weight-bold mb-2">Timeline & Status</div>
                <v-row dense>
                  <v-col cols="6">
                    <v-text-field v-model="selected_project.start_date" label="Start Date" type="date" variant="filled"
                      density="comfortable" rounded="t-lg" flat />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="selected_project.end_date" label="End Date" type="date" variant="filled"
                      density="comfortable" rounded="t-lg" flat />
                  </v-col>
                </v-row>
                <v-select v-model="selected_project.status"
                  :items="['pending', 'planned', 'ongoing', 'delayed', 'completed']" label="Current Status"
                  variant="filled" density="comfortable" rounded="lg" flat class="mt-2 text-capitalize"
                  prepend-inner-icon="mdi-list-status" />
              </v-col>

              <v-col cols="12" md="6">
                <div class="text-overline text-primary font-weight-bold mb-2">Workforce</div>
                <v-text-field v-model="selected_project.engineer" label="Lead Engineer"
                  prepend-inner-icon="mdi-shield-check-outline" variant="filled" density="comfortable" rounded="lg"
                  flat />
                <v-text-field v-model="selected_project.manpower" label="Estimated Headcount" type="number"
                  prepend-inner-icon="mdi-account-group-outline" variant="filled" density="comfortable" rounded="lg"
                  flat class="mt-2" />
              </v-col>
              <v-col cols="12">

                <v-text-field v-model="selected_project.control_number" label="Control Number"
                  prepend-inner-icon="mdi-identifier" variant="filled" />

              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions class="px-6 pb-6 pt-4">
          <v-spacer /> <v-btn color="grey-lighten-1" variant="outlined" size="large"
            class="px-10 rounded-pill font-weight-bold" @click="close_project_dialog">
            Discard
          </v-btn>
          <v-btn color="primary" variant="elevated" size="large" class="text-none px-10 rounded-pill font-weight-bold"
            elevation="4" @click="project_dialog_type === 'create' ? create_project() : update_project()">
            {{ project_dialog_type === 'create' ? 'SUBMIT' : 'Save Changes' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue';
import swal from 'sweetalert';

const { $rest } = useNuxtApp();

definePageMeta({ layout: "std-systems" });

const project_dialog = ref(false);
const project_dialog_type = ref<'create' | 'update'>('create');
const selected_project = ref<any>({
  name: "",
  engineer: "",
  address: "",
  start_date: "",
  end_date: "",
  status: "",
  control_number: "",
  manpower: 0,
});

const search_query = ref('');
const filter_status = ref('All');
const hover = ref<number | null>(null);

const project_data = ref<any[]>([]);
const project_headers = ref([
  { title: "Project Name", key: "name" },
  { title: "Assigned Engineer", key: "engineer" },
  { title: "Address", key: "address" },
  { title: "Status", key: "status" },
  { title: "Actions", key: "actions" },
]);

// Computed for filtered projects
const filtered_projects = computed(() => {
  let items = project_data.value;
  if (search_query.value) {
    items = items.filter(p => p.name.toLowerCase().includes(search_query.value.toLowerCase()));
  }
  if (filter_status.value && filter_status.value !== 'All') {
    items = items.filter(p => p.status.toLowerCase() === filter_status.value.toLowerCase());
  }
  return items;
});


onBeforeMount(() => get_project());

function open_create_project() {
  project_dialog_type.value = 'create';
  selected_project.value = {
    name: "",
    engineer: "",
    address: "",
    start_date: "",
    end_date: "",
    status: "",
    control_number: "",
    manpower: 0,
  };
  project_dialog.value = true;
}

function open_update_project(projectItem: any) {
  project_dialog_type.value = 'update';
  selected_project.value = { ...projectItem };
  project_dialog.value = true;
}

function close_project_dialog() {
  project_dialog.value = false;
}


async function get_project() {
  const { data } = await $rest('projects/get-project', { method: "GET" });
  project_data.value = data;
}

async function create_project() {
  const { data, error } = await $rest('projects/create-project', {
    method: "POST",
    body: { ...selected_project.value }
  });
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: false });
  swal({ title: "Success", text: data, icon: "success", buttons: false });
  project_dialog.value = false;
  get_project();
}

async function update_project() {
  if (!selected_project.value?._id) return;

  const payload: any = { _id: selected_project.value._id };
  for (const key in selected_project.value) {
    if (key !== "_id" && selected_project.value[key] !== undefined && selected_project.value[key] !== null) {
      payload[key] = selected_project.value[key];
    }
  }

  const { data, error } = await $rest('projects/update-project', {
    method: "PUT",
    body: payload
  });
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: false });
  swal({ title: "Success", text: data, icon: "success", buttons: false });
  project_dialog.value = false;
  get_project();
}


const formatDate = (dateStr: string) => dateStr ? new Date(dateStr).toLocaleDateString() : 'N/A';
const daysBetween = (start: string, end: string) => {
  if (!start || !end) return '0';
  const diff = new Date(end).getTime() - new Date(start).getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};
</script>