<template>
  <div class="ma-4">
    <v-row no-gutters>
      <v-col cols="12" class="py-2">
        <v-row align="center" dense>
          <v-col cols="12" md="3">
            <v-select :items="['2025']" label="Year" variant="comfortable" rounded="xl" hide-details density="compact"
              prepend-inner-icon="mdi-calendar" bg-color="grey-lighten-1" clearable />
          </v-col>

          <v-col cols="12" md="3">
            <v-select label="Project" item-title="name" item-value="_id" :items="project_data" variant="comfortable"
              rounded="xl" hide-details density="compact" prepend-inner-icon="mdi-folder" bg-color="grey-lighten-1"
              clearable />
          </v-col>

          <v-col cols="12" md="3">
            <v-select label="Equipment Type" :items="['calibration', 'preventive-maintenance']" variant="comfortable"
              rounded="xl" hide-details density="compact" prepend-inner-icon="mdi-filter-variant"
              bg-color="grey-lighten-1" clearable />
          </v-col>

          <v-col cols="auto">
            <v-btn color="success" class="white--text px-6" rounded="xl" elevation="2">
              Filter
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn color="primary" rounded="xl" elevation="2" class="white--text px-6">
              Print
            </v-btn>
          </v-col>
          <v-spacer />
          <v-col cols="12" md="auto" class="px-2 text-right">
            <v-btn prepend-icon="mdi-plus-circle" @click="vehicle_dialog = true" color="primary" rounded="xl"
              elevation="2" size="large" class="px-6">
              Add Vehicle
            </v-btn>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" class="mt-2">
        <commons-sms title="Vehicle and Heavy Equipment" subtitle="Overview of vehicles and equipment inventory."
          icon="mdi-car-side" :items="vehicle_data" :display_types="['grid', 'table']" rounded="xl" elevation="5">

          <template v-slot:table="{ items }">
            <v-card-text border style="max-height: 80vh; overflow-y: auto;">
              <v-data-table :items="vehicle_data" :headers="vehicle_header">
                <template v-slot:item.type="{ item }">
                  <v-chip class="text-capitalize" color="primary" density="compact" variant="tonal">
                    {{ item.selectable.type }}
                  </v-chip>
                </template>

                <template v-slot:item.pm_schedule="{ item }">
                  <v-chip color="primary" density="compact" variant="tonal">
                    {{ item.selectable.pm_schedule }}
                  </v-chip>
                </template>

                <template v-slot:item.status="{ item }">
                  <v-chip
                    :color="['breakdown', 'undermaintenance'].includes(item.selectable.status) ? 'error' : 'primary'"
                    density="compact" variant="tonal">
                    {{ item.selectable.status }}
                  </v-chip>
                </template>

                <template v-slot:item.actions="{ item }">
                  <v-btn density="compact" color="primary">Actions</v-btn>
                </template>
              </v-data-table>
            </v-card-text>
          </template>

          <template v-slot:item="{ value, index }">
            <v-card :key="index" class="ma-1 elevation-1" rounded="xl" border="sm"
              style="border-color: #f0f0f0 !important; transition: transform 0.2s ease-in-out;"
              @mouseover="hover = index" @mouseout="hover = null"
              :style="{ transform: hover === index ? 'translateY(-4px)' : 'translateY(0px)' }">
              <v-list-item class="px-2 pt-4 py-2">
                <template v-slot:prepend>
                  <v-avatar color="primary" rounded="lg" size="48" class="mr-3">
                    <v-icon color="white">{{ value.type === 'vehicle' ? 'mdi-car-side' : 'mdi-cog' }}</v-icon>
                  </v-avatar>
                </template>

                <v-list-item-title class="text-subtitle-1 font-weight-black text-primary">
                  {{ value.name }} {{ value.brand }}
                </v-list-item-title>

                <v-list-item-subtitle class="text-caption d-flex align-center mt-1">
                  <v-icon size="14" color="indigo" class="mr-1">mdi-identifier</v-icon>
                  {{ value.id }}
                </v-list-item-subtitle>

                <template v-slot:append>
                  <v-menu :close-on-content-click="false" location="bottom end" transition="scale-transition">
                    <template v-slot:activator="{ props }">
                      <v-btn v-bind="props" icon="mdi-dots-vertical" variant="text" color="grey-lighten-1"
                        density="comfortable" />
                    </template>

                    <v-card min-width="300" rounded="xl" elevation="12">
                      <v-list bg-color="primary" class="py-2">
                        <v-list-item title="Manage Equipment" base-color="white">
                          <template v-slot:append>
                            <v-icon size="24">mdi-tools</v-icon>
                          </template>
                        </v-list-item>
                      </v-list>

                      <v-divider />

                      <v-list lines="two" density="compact" class="pa-2">
                        <v-list-group v-for="item in menu_items" :key="item.text" :value="item.text">
                          <template v-slot:activator="{ props }">
                            <v-list-item v-bind="props" :prepend-icon="item.icon" :title="item.text" />
                          </template>

                          <v-list-item v-for="(child, j) in item.children" :key="j" :title="child.text"
                            :prepend-icon="child.icon" @click="handleMenuClick(child.value, value._id)" rounded="md"
                            class="mb-1" color="primary">
                            <template v-slot:prepend>
                              <v-avatar size="32" color="grey-lighten-4" class="mr-2">
                                <v-icon color="primary" size="20">{{ child.icon }}</v-icon>
                              </v-avatar>
                            </template>
                          </v-list-item>
                        </v-list-group>
                      </v-list>

                      <v-divider />

                      <v-card-actions class="pa-2">
                        <v-spacer />
                        <v-btn variant="text" color="error" class="text-none font-weight-bold">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </template>
              </v-list-item>

              <v-card-text class="px-4 py-2">
                <div class="d-flex align-center mb-4 bg-grey-lighten-3 pa-2 rounded-lg"
                  style="border-left: 4px solid #0288D1;">
                  <v-icon size="18" class="mr-2 text-info">mdi-information-outline</v-icon>
                  <span class="text-body-2 text-grey-darken-3">
                    {{ value.make }} - <strong>{{ value.model }}</strong>
                  </span>
                </div>

                <div class="mb-1 px-1">
                  <div class="d-flex align-center text-body-2 mb-1">
                    <v-icon class="mr-2 text-info" size="18">mdi-wrench-clock</v-icon>
                    <span class="font-weight-bold text-grey-darken-4">{{ value.pm_schedule }}</span>
                  </div>
                  <div class="d-flex align-center text-caption text-grey-darken-1">
                    <v-icon class="mr-2 text-blue-darken-1" size="18">mdi-folder-outline</v-icon>
                    {{ value.project?.name || 'Unassigned' }}
                  </div>
                </div>
              </v-card-text>

              <v-divider />
              <v-card-actions class="bg-primary px-4 py-2" style="min-height: 48px;">
                <span class="text-button text-white" style="letter-spacing: 1px !important;">TYPE</span>
                <v-spacer />
                <v-chip size="small" color="white" variant="flat"
                  class="font-weight-black text-info px-3 text-button text-capitalize">
                  {{ value.type }}
                </v-chip>
              </v-card-actions>
            </v-card>
          </template>
        </commons-sms>
      </v-col>
    </v-row>

    <!-- Add Vehicle Dialog -->
    <v-dialog v-model="vehicle_dialog" max-width="800" persistent>
      <v-card rounded="xl" class="pa-4">
        <v-card-title class="d-flex align-center pt-4 px-4 pb-0">
          <v-avatar color="info" variant="tonal" rounded="lg" size="54" class="mr-4">
            <v-icon size="32">mdi-car-side</v-icon>
          </v-avatar>
          <div>
            <div class="text-h5 font-weight-black text-primary">
              Register Vehicle/Equipment
            </div>
            <div class="text-caption text-grey-darken-1">
              Add a new vehicle or equipment to the motorpool inventory.
            </div>
          </div>
          <v-spacer />
          <v-btn icon="mdi-close" variant="text" color="grey-lighten-1" @click="vehicle_dialog = false" />
        </v-card-title>

        <v-card-text class="mt-6">
          <v-container fluid>
            <!-- Vehicle Type -->
            <v-row dense>
              <v-col cols="12">
                <p class="text-subtitle- mb-1 font-weight-bold">Select Type</p>
                <v-radio-group v-model="vehicle.type" density="compact" inline hide-details>
                  <v-radio class="pr-2" label="Equipment" value="equipment" color="primary" />
                  <v-radio label="Vehicle" value="vehicle" color="primary" />
                </v-radio-group>
              </v-col>
            </v-row>

            <!-- Basic Info -->
            <v-divider class="my-4"></v-divider>
            <v-row dense>
              <v-col cols="12" md="6">
                <v-text-field v-model="vehicle.name" label="Vehicle Name" variant="underlined" color="primary"
                  density="compact" hide-details />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field v-model="vehicle.id" label="Vehicle ID" variant="underlined" color="primary"
                  density="compact" hide-details />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field v-model="vehicle.make" label="Make" variant="underlined" color="primary" density="compact"
                  hide-details />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field v-model="vehicle.serial_no" label="Serial Number" variant="underlined" color="primary"
                  density="compact" hide-details />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field v-model="vehicle.brand" label="Brand" variant="underlined" color="primary"
                  density="compact" hide-details />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field v-model="vehicle.model" label="Model" variant="underlined" color="primary"
                  density="compact" hide-details />
              </v-col>
            </v-row>

            <v-divider class="my-4"></v-divider>

            <v-row dense>
              <v-col cols="12" md="6">
                <v-select v-model="vehicle.project" :items="project_data" label="Project Assignment" item-title="name"
                  item-value="_id" density="compact" variant="underlined" color="primary" clearable />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field v-model="vehicle.date_purchased" label="Date Purchased" type="date" density="compact"
                  variant="underlined" color="primary" hide-details />
              </v-col>

              <v-col cols="12" md="6">
                <v-select v-model="vehicle.pm_schedule" label="PM Schedule" density="compact" variant="underlined"
                  color="primary" :items="['Annual', 'Semi-Annual', 'Quarterly', 'Monthly', 'Weekly', 'Daily']"
                  hide-details />
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field v-model="vehicle.other" label="Other Information" variant="underlined" color="primary"
                  density="compact" />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions class="px-6 pb-6 pt-4">
          <v-spacer />
          <v-btn color="grey-lighten-1" variant="outlined" size="large" class="px-10 rounded-pill font-weight-bold"
            @click="vehicle_dialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary" variant="elevated" size="large" class="text-none px-10 rounded-pill font-weight-bold"
            elevation="4" @click="create_vehicle">
            SAVE VEHICLE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Calibration Dialog -->
    <commons-dialog v-model="calibration_dialog" max-width="500" icon="mdi-tune" title="Equipment Calibration"
      submitText="Submit" @submit="">
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Year" variant="underlined" color="primary" hide-details />
          </v-col>
          <v-col cols="6">
            <v-text-field label="Planned Date" type="date" variant="underlined" color="primary" />
          </v-col>
          <v-col cols="6">
            <v-text-field label="Actual Date" type="date" variant="underlined" color="primary" />
          </v-col>
        </v-row>
      </v-card-text>
    </commons-dialog>

    <!-- Preventive Maintenance Dialog -->
    <commons-dialog v-model="pm_dialog" max-width="800" icon="mdi-wrench-clock" title="Preventive Maintenance Checklist"
      submitText="Submit" @submit="">
      <v-card-text style="max-height: 80vh; overflow-y: auto;">
        <!-- Legend -->
        <v-alert class="pa-4" variant="tonal" color="info" border>
          <v-row no-gutters class="ml-2">
            <v-col cols="12" class="pb-2 font-weight-bold text-primary">Legend:</v-col>
            <v-col cols="6" class="py-1 d-flex align-center" style="font-size: 0.875rem;">
              <v-chip color="blue" variant="tonal" density="compact" size="small" class="mr-3">NA</v-chip>
              Not Applicable
            </v-col>
            <v-col cols="6" class="py-1 d-flex align-center" style="font-size: 0.875rem;">
              <v-chip color="green" variant="tonal" density="compact" size="small" class="mr-3">P</v-chip>
              Passed
            </v-col>
            <v-col cols="6" class="py-1 d-flex align-center" style="font-size: 0.875rem;">
              <v-chip color="orange" variant="tonal" density="compact" size="small" class="mr-3">M</v-chip>
              Maintenance Required
            </v-col>
            <v-col cols="6" class="py-1 d-flex align-center" style="font-size: 0.875rem;">
              <v-chip color="red" variant="tonal" density="compact" size="small" class="mr-3">R</v-chip>
              Rejected
            </v-col>
          </v-row>
        </v-alert>

        <!-- Checklist Sections -->
        <v-expansion-panels multiple class="my-4">
          <v-expansion-panel v-for="(section, index) in checklistSections" :key="index">
            <v-expansion-panel-title>{{ section.title }}</v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-simple-table dense>
                <thead>
                  <tr>
                    <th width="600px" class="text-start">Item</th>
                    <th class="text-start pl-1" width="100px">NA</th>
                    <th class="text-start pl-2" width="100px">P</th>
                    <th class="text-start pl-1" width="100px">M</th>
                    <th class="text-start pl-1" width="100px">R</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in section.items" :key="item.key">
                    <td>{{ item.label }}</td>
                    <td>
                      <v-radio :value="'NA'" v-model="calibration[section.model][item.key]" color="blue"
                        density="compact" hide-details />
                    </td>
                    <td>
                      <v-radio :value="'P'" v-model="calibration[section.model][item.key]" color="green"
                        density="compact" hide-details />
                    </td>
                    <td>
                      <v-radio :value="'M'" v-model="calibration[section.model][item.key]" color="orange"
                        density="compact" hide-details />
                    </td>
                    <td>
                      <v-radio :value="'R'" v-model="calibration[section.model][item.key]" color="red" density="compact"
                        hide-details />
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-row no-gutters>
          <v-col cols="6"> <v-checkbox label="Equipment Passed" /></v-col>
          <v-col cols="6"> <v-checkbox label="Equipment Failed" color="error" /></v-col>
          <v-col cols="12">
            <p class="text-subtitle-2 font-weight-medium">Work Required</p>
            <v-row no-gutters class="align-center">
              <v-col cols="6">
                <span class="text-body-2 font-weight-regular">
                  1. Driver's Compartment &gt; Sun Visors
                </span>
              </v-col>
              <v-col cols="3" class="pl-4">
                <v-text-field label="Remarks" variant="underlined" density="compact" hide-details />
              </v-col>
              <v-col cols="3" class="pl-4">
                <v-text-field label="Assigned to" variant="underlined" density="compact" hide-details />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </commons-dialog>

    <!-- Daily Checklist Dialog -->
    <commons-dialog v-model="checklist_dialog" max-width="500" icon="mdi-check-circle-outline"
      title="Daily Vehicle Checklist" submitText="Generate Report" @submit="print_checklist">
      <v-card-text>
        <v-row dense>
          <v-col cols="6">
            <v-text-field v-model="check.from" label="From" hide-details type="month" variant="underlined"
              color="primary" />
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="check.to" label="To" hide-details type="month" variant="underlined"
              color="primary" />
          </v-col>
          <v-col cols="12">
            <v-select v-model="check.project" class="mb-2" label="Project" item-title="name" item-value="_id"
              :items="project_data" density="compact" variant="underlined" color="primary" hide-details clearable />
          </v-col>
        </v-row>
      </v-card-text>
    </commons-dialog>
  </div>
</template>



<script lang="ts" setup>
import useAuth from "~/store/auth";
import swal from 'sweetalert';
import { useChecklist } from '~/store/motorpool';
const { $rest } = useNuxtApp();
const auth = useAuth();
const user = useAuth().user;
const router = useRouter();

onBeforeMount(() => {
  Promise.all([
    get_vehicle(),
    get_project(),
    get_checklist(),
  ])
})
definePageMeta({ layout: "std-systems" });
const checklistStore = useChecklist()
const hover = ref<number | null>(null);


interface Vehicle {
  type: string;
  name: string;
  id: string;
  project?: string;
  make: string;
  serial_no: string;
  brand: string;
  model: string;
  date_purchased: Date;
  // supplier?: string;
  other?: string;
  pm_schedule: string;
}


const vehicle = ref<Vehicle>({
  type: "",
  name: "",
  id: "",
  project: "",
  make: "",
  serial_no: "",
  brand: "",
  model: "",
  date_purchased: new Date(),
  // supplier: "",
  other: "",
  pm_schedule: "",

});
const vehicle_dialog = ref(false)
const calibration_dialog = ref(false)
const pm_dialog = ref(false)

async function create_vehicle() {
  const { data, error } = await $rest('motorpool/create-vehicle', {
    method: "POST",
    body: { ...vehicle.value }
  });
  if (error) return swal({ title: "Error", text: error, icon: "error" });

  swal({ title: "Success", text: data, icon: "success" });
  vehicle_dialog.value = false;
}

const vehicle_data = ref([])
async function get_vehicle() {
  const { data } = await $rest('motorpool/get-vehicle', { method: "GET" });
  vehicle_data.value = data;
}
const vehicle_header = ref([
  { title: "Name", key: "name", sortable: false },
  { title: "Type", key: "type", sortable: false },
  { title: "ID Number", key: "id", sortable: false },
  { title: "PM Schedule", key: "pm_schedule", sortable: false },
  { title: "Status", key: "status", sortable: false },
  { title: "Actions", key: "actions", sortable: false, align: "center" },
])
const project_data = ref([])
async function get_project() {
  const { data } = await $rest('projects/get-project', { method: "GET" });
  project_data.value = data;
}

const route_trip_ticket = () => {
  router.push({ name: 'trip-ticket' });
};

const open = ref({})

const menuOpen = ref({})
const handleMenuClick = (routeName: any, id: any) => {
  if (routeName === 'motorpool-calibration-form') {
    calibration_dialog.value = true;
  } else if (routeName === 'motorpool-pm-form') {
    pm_dialog.value = true
  } else if (routeName === 'motorpool-daily-checklist') {
    console.log("ISSSSSSSSSSSSSSSSSSSSSSSSS", id)
    console.log('check.value BEFORE:', JSON.stringify(check.value))
    check.value.vehicle = id
    console.log('check.value AFTER:', JSON.stringify(check.value))
    checklist_dialog.value = true
  } else {
    router.push({ name: routeName });
  }
  menuOpen.value[id] = false;

}

const menu_items = ref([
  {
    text: 'Reports',
    icon: 'mdi-file-chart',
    children: [
      {
        text: 'View Breakdown Report',
        value: 'motorpool-breakdown',
        icon: 'mdi-file-document'
      },
      {
        text: 'View Job Order',
        value: 'motorpool-job-order',
        icon: 'mdi-clipboard-text'
      },
      {
        text: 'View Preventive Maintenance',
        value: 'motorpool-pm-checklist',
        icon: 'mdi-wrench-clock'
      },
      {
        text: 'View Equipment Utilization',
        value: 'motorpool-utilization-report',
        icon: 'mdi-truck-check'
      },
      {
        text: 'View Checklist',
        value: 'motorpool-daily-checklist',
        icon: 'mdi-check'
      }
    ]
  },
  {
    text: 'Forms',
    icon: 'mdi-file-document-edit',
    children: [
      {
        text: 'Calibration Form',
        value: 'motorpool-calibration-form',
        icon: 'mdi-tune'
      },
      {
        text: 'Preventive Maintenance Checklist',
        value: 'motorpool-pm-form',
        icon: 'mdi-clipboard-check'
      }
    ]
  }
])





const calibration = reactive({
  company: '',
  unit_no: '',
  make_model: '',
  mileage: '',
  datetime: '',
  fluid_levels: {},
  drivers_compartment: {},
  body_exterior: {},
  under_hood: {},
  undercarriage: {},
  brakes_tires: {},
  work_required: ['', ''],
  assigned_to: '',
  completion: '',
  repairman: '',
  supervisor: '',
  prepared_by: '',
  checked_by: '',
  approved_by: ''
})

const fluid_levels = [
  { label: 'Motor Oil', key: 'motor_oil' },
  { label: 'Rear End', key: 'rear_end' },
  { label: 'Air Filter', key: 'air_filter' },
  { label: 'Radiator', key: 'radiator' },
  { label: 'Brake Fluid', key: 'brake_fluid' },
  { label: 'Oil Change Required', key: 'oil_change' },
  { label: 'Power Steering', key: 'power_steering' },
  { label: 'Greasing Required', key: 'greasing' },
  { label: 'Oil Filter Changed', key: 'oil_filter' },
  { label: 'Windshield Washer', key: 'washer' },
]

const drivers_compartment = [
  { label: 'Sun Visors', key: 'sun_visors' },
  { label: 'Hom & Switches', key: 'hom_switches' },
  { label: 'Steering Power Assist', key: 'steering_power' },
  { label: 'Windshield Wipers', key: 'wipers' },
  { label: 'Windshield Defrost', key: 'defrost' },
  { label: 'Windshield', key: 'windshield' },
  { label: 'Side Windows', key: 'side_windows' },
  { label: 'Beam Indicator', key: 'beam_indicator' },
  { label: 'Instrument Lamps', key: 'instrument_lamps' },
  { label: 'Pedal Pads', key: 'pedal_pads' },
  { label: 'Fire Extinguisher', key: 'extinguisher' },
  { label: 'Air Pressure Gauge', key: 'air_pressure' },
  { label: 'Seats & Seatbelts', key: 'seatbelts' },
  { label: 'Acc. Pedal & Throttle', key: 'pedal_throttle' },
  { label: 'Steering Column Security', key: 'steering_security' },
  { label: 'Speedometer', key: 'speedometer' },
  { label: 'Compressed Air', key: 'compressed_air' },
]

const body_exterior = [
  { label: 'Head Lamp Operation/Aim', key: 'headlamp' },
  { label: 'Clearance Lamps', key: 'clearance_lamps' },
  { label: 'Identification Lamps', key: 'id_lamps' },
  { label: 'Tail Lamps', key: 'tail_lamps' },
  { label: 'Stop Lamps', key: 'stop_lamps' },
  { label: 'Turn Signal Lamps', key: 'signal_lamps' },
  { label: 'Marker Lamps', key: 'marker_lamps' },
  { label: 'Hazard Lamps', key: 'hazard_lamps' },
  { label: 'Reflex Reflectors', key: 'reflectors' },
  { label: 'Trailer Hitch', key: 'hitch' },
  { label: 'TDG Placards', key: 'tdg_placards' },
  { label: 'Fenders/Mud Flaps', key: 'mud_flaps' },
  { label: 'Trailer Cord', key: 'trailer_cord' },
  { label: 'Paint', key: 'paint' },
  { label: 'Air Lines', key: 'air_lines' },
  { label: 'Tire Pressure', key: 'tire_pressure' },
  { label: 'Body & Doors', key: 'body_doors' },
  { label: 'Glad Hands & Air Systems', key: 'glad_hands' },
  { label: 'Bumpers & Cabs', key: 'bumpers' },
]

const under_hood = [
  { label: 'Hood', key: 'hood' },
  { label: 'Air Compressor Belt', key: 'ac_belt' },
  { label: 'Air Compressor', key: 'air_compressor' },
  { label: 'Power Steering System', key: 'steering_sys' },
  { label: 'Fuel Pump and System', key: 'fuel_pump' },
  { label: 'Battery & Wiring', key: 'battery' },
  { label: 'Fan & Belt', key: 'fan_belt' },
  { label: 'Cooling System', key: 'cooling' },
  { label: 'Carburetor', key: 'carburetor' },
  { label: 'Exhaust System', key: 'exhaust' },
  { label: 'Windshield Washer Pump', key: 'washer_pump' },
  { label: 'Distributor', key: 'distributor' },
]

const undercarriage = [
  { label: 'Pin & Bushing Wear', key: 'bushing' },
  { label: 'Sprocket', key: 'sprocket' },
  { label: 'Springs', key: 'springs' },
  { label: 'Link Wear', key: 'link' },
  { label: 'Shock Absorbers', key: 'shock' },
  { label: 'Muffler', key: 'muffler' },
  { label: 'Oil Pan', key: 'oil_pan' },
  { label: 'Pittman Arm', key: 'pittman' },
  { label: 'Drag Link', key: 'drag_link' },
  { label: 'Differential', key: 'diff' },
  { label: 'Track Wear', key: 'track' },
  { label: 'Tie Rod', key: 'tie_rod' },
  { label: 'Suspension', key: 'suspension' },
  { label: 'Roller Guards', key: 'roller_guards' },
  { label: 'Frame Rails', key: 'frame_rails' },
  { label: 'Axles', key: 'axles' },
]

const brakes_tires = [
  { label: 'Brake Components', key: 'brake_components' },
  { label: 'Chock Block', key: 'chock' },
  { label: 'Road Clearance', key: 'clearance' },
  { label: 'Spring Caging Bolts', key: 'spring_caging' },
  { label: 'Brake Drum Condition', key: 'brake_drum' },
  { label: 'Brake Lining Thickness', key: 'lining_thickness' },
  { label: 'Disc Brakes', key: 'disc' },
  { label: 'Brake Lines & Hoses', key: 'brake_hoses' },
  { label: 'Brake Failure Indicator', key: 'failure_ind' },
  { label: 'Reservoirs and Valves', key: 'valves' },
  { label: 'Tire Pressure', key: 'tire_pressure' },
  { label: 'Park Brake', key: 'park_brake' },
  { label: 'Wheel Bearings', key: 'wheel_bearings' },
  { label: 'Vacuum System', key: 'vacuum_sys' },
  { label: 'Emergency Brake', key: 'emergency_brake' },
  { label: 'Proportioning Valve', key: 'prop_valve' },
  { label: 'Pump Operator', key: 'pump_operator' },
  { label: 'Brake Operation', key: 'brake_op' },
  { label: 'Brake Camshafts', key: 'camshafts' },
  { label: 'Tire Wear', key: 'tire_wear' },
  { label: 'Jack', key: 'jack' },
  { label: 'Tire Iron', key: 'tire_iron' },
  { label: 'Spare Tire', key: 'spare' },
  { label: 'Chains', key: 'chains' },
]
const checklistSections = [
  { title: 'Fluid Levels', items: fluid_levels, model: 'fluid_levels' },
  { title: "Driver's Compartment", items: drivers_compartment, model: 'drivers_compartment' },
  { title: 'Body Exterior', items: body_exterior, model: 'body_exterior' },
  { title: 'Under the Hood', items: under_hood, model: 'under_hood' },
  { title: 'Undercarriage', items: undercarriage, model: 'undercarriage' },
  { title: 'Brakes, Tires, and Wheels', items: brakes_tires, model: 'brakes_tires' }
];

const check = ref({
  from: "",
  to: "",
  project: "",
  vehicle: ""
})
const checklist_dialog = ref(false)
const checklist_data = ref([])
async function get_checklist() {
  console.log("NGEEEEEEEEEEEEEEE", check.value);

  const payload = {};
  if (check?.value) {
    payload.from = check?.value?.from
    payload.to = check?.value?.to
    payload.project = check?.value?.project
    payload.vehicle = check?.value?.vehicle
  }
  const { data } = await $rest('motorpool/get-checklist', {
    method: "GET",
    query: Object.keys(payload)?.length ? payload : {},
  });
  checklist_data.value = data;
}
const print_checklist = async () => {
  await get_checklist()
  const result = checklist_data.value
  checklistStore.putData(result)
  router.push({ name: 'motorpool-daily-checklist' });
}
</script>

<style scoped></style>
