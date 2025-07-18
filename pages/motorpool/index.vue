<template>

  <v-sheet class="ma-4">
    <v-toolbar flat class="py-2" color="transparent">
      <template v-slot:title>
        <v-row dense>
          <v-col cols="12">
            <h2 class="font-weight-medium text-primary"> Vehicle and Heavy Equipment</h2>
            <small class="font-weight-thin" style="color: #B1D182;">
              Overview of vehicles and heavy equipment.
            </small>
          </v-col>
        </v-row>
      </template>
      <v-spacer></v-spacer>
      <v-btn @click="route_trip_ticket" color="success" class="text-white" prepend-icon="mdi-car-side" variant="tonal"
        rounded>
        Trip Tickets
      </v-btn>

      <v-btn>
        <v-icon class="pr-3" color="#228B22">mdi-database</v-icon>
        import
      </v-btn>

    </v-toolbar>
    <hr class="mb-2" color="#115D33" />

    <v-row dense>
      {{ checklist_data }}
      <v-col cols="12" class="d-flex">
        <v-sheet width="20%" border color="#F9FBE7" min-height="80vh">
          <v-card-text class="mt-8">
            <v-row dense>
              <v-col cols="12">
                <v-select class="mb-2" :items="['2025']" label="Year" outlined hide-details clearable></v-select>
                <v-select class="mb-2" label="Project" item-title="name" item-value="_id" :items="project_data"
                  density="compact" variant="outlined" hide-details clearable />
                <v-select label="Request type" :items="['calibration', 'preventive-maintenance']" item-title="text"
                  item-value="value" density="compact" variant="outlined" hide-details clearable />
              </v-col>

              <v-col cols="12">
                <v-btn block color="success" class="white--text">
                  Filter
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn block color="blue darken-4" class="white--text">
                  Print
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn block color="amber" @click="vehicle_dialog = true">
                  Create
                </v-btn>
              </v-col>

            </v-row>
          </v-card-text>
        </v-sheet>
        <v-sheet border width="80%" height="80vh">
          <commons-sms title="Tools and Vehicle" icon="mdi-note-text-outline" :items="vehicle_data"
            :display_types="['table', 'grid']">
            <template v-slot:table="{ items }">
              <v-sheet border>
                <v-data-table :items="vehicle_data" :headers="vehicle_header">
                  <template v-slot:item.type="{ item }">
                    <v-chip class="text-capitalize" color="primary" density="compact" variant="outlined">
                      {{ item.selectable.type }}
                    </v-chip>
                  </template>

                  <template v-slot:item.pm_schedule="{ item }">
                    <v-chip color="blue darken-4" density="compact" variant="outlined">
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
                    <v-menu v-model="menuOpen[item.id]" :close-on-content-click="false" offset-y>
                      <template #activator="{ props }">
                        <v-btn color="primary" density="compact" v-bind="props">Actions</v-btn>
                      </template>

                      <v-card width="auto">
                        <v-list v-model:opened="open[item.id]" lines="two" density="compact">
                          <v-list-group v-for="(menu, i) in menu_items.filter(m => m.children && m.children.length > 0)"
                            :key="i" :value="menu.text">
                            <template v-slot:activator="{ props }">
                              <v-list-item v-bind="props" :prepend-icon="menu.icon" :title="menu.text" />
                            </template>

                            <v-list-item v-for="(child, j) in menu.children" :key="j" :title="child.text"
                              :prepend-icon="child.icon" @click="handleMenuClick(child.value, item.id)" />
                          </v-list-group>
                        </v-list>
                      </v-card>
                    </v-menu>
                  </template>


                </v-data-table>
                <template v-slot:table="{ items }">
                  <v-data-table :items="items" :headers="vehicle_header">
                    <!-- Don't use vehicle_data here again -->
                    <template v-slot:item.actions="{ item }">
                      <v-menu v-model="menuOpen[item.id]" :close-on-content-click="false" offset-y>
                        <template #activator="{ props }">
                          <v-btn color="primary" density="compact" v-bind="props">Actions</v-btn>
                        </template>

                        <v-card width="auto">
                          <v-list v-model:opened="open[item.id]" lines="two" density="compact">
                            <v-list-group v-for="(menu, i) in menu_items.filter(m => m.children?.length)" :key="i"
                              :value="menu.text">
                              <template v-slot:activator="{ props }">
                                <v-list-item v-bind="props" :prepend-icon="menu.icon" :title="menu.text" />
                              </template>
                              <v-list-item v-for="(child, j) in menu.children" :key="j" :title="child.text"
                                :prepend-icon="child.icon" @click="handleMenuClick(child.value, item.id)" />
                            </v-list-group>
                          </v-list>
                        </v-card>
                      </v-menu>
                    </template>
                  </v-data-table>
                </template>

              </v-sheet>
            </template>

            <template v-slot:item="{ value }">
              <v-card class="mx-auto" rounded="lg" color="primary" variant="tonal">
                <v-card-text>
                  <v-row no-gutters justify="end">
                    <v-col cols="12" class="d-flex align-end">
                      PM Schedule:
                      <v-chip class="mx-2 mb-1 text-uppercase" density="compact" color="amber" variant="outlined">
                        {{ value.pm_schedule }}
                      </v-chip>
                    </v-col>
                    <v-col cols="12" class="d-flex">Name: <b>{{ value.name }} {{ value.brand }}</b></v-col>
                    <v-col cols="12">Plate/ID No: <b>{{ value.id }}</b></v-col>
                    <v-col cols="12">Project Assign: {{ value.project.name }}</v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </template>
          </commons-sms>
        </v-sheet>
      </v-col>



    </v-row>

    <commons-dialog v-model="vehicle_dialog" max-width="600" icon="mdi-school"
      title="Vehicle / Heavy Equipment Information" submitText="Submit" @submit="create_vehicle">
      <v-card-text style="max-height: 70vh; overflow-y: auto;">
        <v-container fluid>
          <!-- Vehicle Type -->
          <v-row dense>
            <v-col cols="12">
              <p class="text-subtitle- mb-1 font-weight-bold">
                Select Vehicle Type</p>
              <v-radio-group v-model="vehicle.type" density="compact" inline hide-details>
                <v-radio class="pr-2" label="Equipment" value="equipment" color="primary" />
                <v-radio label="Vehicle" value="vehicle" color="primary" />
              </v-radio-group>
            </v-col>
          </v-row>
          <!-- Basic Info -->
          <hr class="my-3" color="primary" />
          <v-row dense>
            <v-col cols="6">
              <v-text-field v-model="vehicle.name" label="Vehicle Name" density="compact" variant="outlined"
                hide-details />
            </v-col>

            <v-col cols="6">
              <v-text-field v-model="vehicle.id" label="Vehicle ID" density="compact" variant="outlined" hide-details />
            </v-col>

            <v-col cols="6">
              <v-text-field v-model="vehicle.make" label="Make" density="compact" variant="outlined" hide-details />
            </v-col>

            <v-col cols="6">
              <v-text-field v-model="vehicle.serial_no" label="Serial Number" density="compact" variant="outlined"
                hide-details />
            </v-col>

            <v-col cols="6">
              <v-text-field v-model="vehicle.brand" label="Brand" density="compact" variant="outlined" hide-details />
            </v-col>

            <v-col cols="6">
              <v-text-field v-model="vehicle.model" label="Model" density="compact" variant="outlined" hide-details />
            </v-col>
          </v-row>

          <hr class="my-3" color="primary" />

          <v-row dense>
            <!-- <v-col cols="6">
              <v-select v-model="vehicle.supplier" label="Supplier" density="compact" variant="outlined" hide-details />
            </v-col> -->

            <v-col cols="6">
              <v-select v-model="vehicle.project" :items="project_data" label="Project" item-title="name"
                item-value="_id" density="compact" variant="outlined" clearable />
            </v-col>

            <v-col cols="6">
              <v-text-field v-model="vehicle.other" label="Other Information" density="compact" variant="outlined" />
            </v-col>

            <v-col cols="6">
              <v-text-field v-model="vehicle.date_purchased" label="Date Purchased" type="date" density="compact"
                variant="outlined" hide-details />
            </v-col>

            <v-col cols="6">
              <v-select v-model="vehicle.pm_schedule" label="PM Schedule" density="compact" variant="outlined"
                :items="['Annual', 'Semi-Annual', 'Quarterly', 'Monthly', 'Weekly', 'Daily']" hide-details />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </commons-dialog>
    <commons-dialog v-model="calibration_dialog" max-width="400" icon="mdi-school" title="Calibration"
      submitText="Submit" @submit="">
      <v-card-text>
        <v-row>
          <v-col cols="12"> <v-text-field label="Year" hide-details /></v-col>
          <v-col cols="6"> <v-text-field label="Plan" type="date" /></v-col>
          <v-col cols="6"> <v-text-field label="Actual" type="date" /></v-col>
        </v-row>
      </v-card-text>
    </commons-dialog>
    <commons-dialog v-model="pm_dialog" max-width="700" icon="mdi-tune" title="Preventive Maintenance Checklist"
      submitText="Submit" @submit="">
      <v-card-text style="max-height: 80vh; overflow-y: auto;">
        <!-- Legend -->
        <v-alert class="pa-5" variant="tonal" color="info" border closable>
          <v-row no-gutters class="ml-2">
            <v-col cols="12" class="pb-1" style="font-size: 10px;">Legend:</v-col>
            <v-col cols="6" class="py-1 d-flex align-center" style="font-size: 10px;">
              <v-chip color="blue" variant="outlined" density="compact" class="px-4 mr-3"
                style="font-size: 10px; height: 18px;">NA</v-chip>
              Not Applicable
            </v-col>
            <v-col cols="6" class="py-0 d-flex align-center" style="font-size: 10px;">
              <v-chip color="green" variant="outlined" density="compact" class="px-4 mr-4"
                style="font-size: 10px; height: 18px;">P</v-chip>
              Passed in good condition
            </v-col>
            <v-col cols="6" class="py-0 d-flex align-center" style="font-size: 10px;">
              <v-chip color="orange" variant="outlined" density="compact" class="px-4 mr-4"
                style="font-size: 10px; height: 18px;">M</v-chip>
              Maintenance required
            </v-col>

            <v-col cols="6" class="py-0 d-flex align-center" style="font-size: 10px;">
              <v-chip color="red" variant="outlined" density="compact" class="px-4 mr-4"
                style="font-size: 10px; height: 18px;">R</v-chip>
              Rejected – repair needed
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
    <commons-dialog v-model="checklist_dialog" max-width="400" icon="mdi-school" title="Checklist Form"
      submitText="PRINT" @submit="print_checklist">
      <v-card-text>
        <v-row dense>
          <v-col cols="6"> <v-text-field v-model="check.from" label="From" hide-details type="month" /></v-col>
          <v-col cols="6"> <v-text-field v-model="check.to" label="To" hide-details type="month" /></v-col>
          <v-col cols="12"> <v-select v-model="check.project" class="mb-2" label="Project" item-title="name"
              item-value="_id" :items="project_data" density="compact" variant="outlined" hide-details
              clearable /></v-col>
        </v-row>
      </v-card-text>
    </commons-dialog>





  </v-sheet>
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
    console.log('Ngeee');
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
  project: ""
})
const checklist_dialog = ref(false)
const checklist_data = ref([])
async function get_checklist() {
  const payload = {};
  if (check?.value) {
    payload.from = check?.value?.from
    payload.to = check?.value?.to
    payload.project = check?.value?.project
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
