<template>

  <v-sheet class="ma-4">
    <v-toolbar flat class="py-2" color="transparent">
      <template v-slot:title>
        <v-row dense>
          <v-col cols="12">
            <h2 class="font-weight-medium text-primary">Trip Ticket and Gas Requisition</h2>
            <small class="font-weight-thin" style="color: #B1D182;">
              Overview of trip tickets and gas requestion
            </small>
          </v-col>
        </v-row>
      </template>
      <v-spacer></v-spacer>



    </v-toolbar>
    <hr class="mb-2" color="#115D33" />
    <v-row dense>

      <v-col cols="12" class="d-flex">
        <v-sheet width="20%" border color="#F9FBE7" min-height="80vh">
          <v-card-text class="mt-8">
            <v-row dense>
              <v-col cols="12">

                <v-select v-model="search.project" class="mb-2" label="Project" item-title="name" item-value="_id"
                  :items="project_data" density="compact" variant="outlined" hide-details clearable />
                <v-select v-model="search.type" label="Request type" :items="print_items" item-title="text"
                  item-value="value" density="compact" variant="outlined" hide-details clearable />
              </v-col>

              <v-col cols="12">
                <v-btn @click="get_trip_ticket" block color="success" class="white--text">
                  Filter
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn @click="print_result(search.type)" block color="blue darken-4" class="white--text">
                  Print
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn block color="amber" @click="trip_gas_dialog = true">
                  Create Request
                </v-btn>
              </v-col>

            </v-row>
          </v-card-text>
        </v-sheet>
        <v-sheet border width="80%" height="80vh">
          <commons-sms title="TRIP TICKET & DIESEL REQUISITION" icon="mdi-note-text-outline" :items="trip_ticket_data"
            :display_types="['table', 'grid']">
            <template v-slot:table="{ items }">
              <v-sheet border>
                <v-data-table :items="trip_ticket_data" :headers="request_header">
                  <template v-slot:item.vehicle="{ item }">
                    {{ item.selectable.vehicle.name ? item.selectable.vehicle.name + ' ' + item.selectable.vehicle.id
                      : '' }}
                  </template>
                  <template v-slot:item.type="{ item }">
                    <v-chip class="text-capitalize" color="primary" density="compact" variant="outlined">{{
                      item.selectable.type ? item.selectable.type : ''
                    }}</v-chip>
                  </template>
                  <template v-slot:item.status="{ item }">
                    <v-chip
                      :color="['breakdown', 'undermaintenance'].includes(item.selectable.status) ? 'error' : 'primary'"
                      density="compact" variant="outlined">
                      {{ item.selectable.status ? item.selectable.status : '' }}
                    </v-chip>
                  </template>


                  <template v-slot:item.actions="{ item }">
                    <v-menu>
                      <template #activator="{ props }">
                        <v-btn color="primary" density="compact" v-bind="props">Actions</v-btn>
                      </template>
                      <v-card min-width="300">
                        <v-list>
                          <v-list-item title="Trip Ticket">
                            <template v-slot:append>
                              <v-icon color="green darken-4" size="24">mdi-car</v-icon>
                            </template>
                          </v-list-item>
                        </v-list>
                        <v-divider />
                        <v-list lines="two" class="elevation-1" density="compact">
                          <v-list-item v-if="!item.selectable.checklist" title="Daily Checklist"
                            @click="openChecklist(item.selectable._id)">
                            <template v-slot:prepend>
                              <v-icon color="primary" size="22">mdi-clipboard-check-outline</v-icon>
                            </template>
                          </v-list-item>
                          <v-list-item v-if="item.selectable.status === 'checked'" title="Return Form"
                            @click="openReturnForm(item.selectable._id)">
                            <template v-slot:prepend>
                              <v-icon color="primary" size="22">mdi-clipboard-check-outline</v-icon>
                            </template>
                          </v-list-item>
                          <v-list-item v-if="item.selectable.status === 'checked'"
                            @click="openBreakdown(item.selectable.vehicle_id, item.selectable._id)" title="Breakdown">
                            <template v-slot:prepend>
                              <v-icon color="primary" size="22">mdi-car-wrench</v-icon>
                            </template>
                          </v-list-item>
                          <v-list-item @click="openJoborder(item.selectable.vehicle_id, item.selectable._id)"
                            title="Job Order">
                            <template v-slot:prepend>
                              <v-icon color="primary" size="22">mdi-car-wrench</v-icon>
                            </template>
                          </v-list-item>
                        </v-list>
                      </v-card>
                    </v-menu>

                  </template>
                </v-data-table>
              </v-sheet>
            </template>
            <template v-slot:item="{ value, index, display }">
              <v-card class="mx-auto" rounded="lg" color="primary" variant="tonal">
                <v-card-text>
                  <v-row no-gutters justify="end">

                    <v-col cols="12" class="d-flex"> Name : <b> {{ value.vehicle.name }}</b></v-col>

                    <v-col cols="12"> Type: <v-chip color="blue-darken-4">{{ value.vehicle.type }}</v-chip></v-col>
                    <v-col cols="12">
                      Driver: {{ value.driver }}
                    </v-col>


                  </v-row>
                </v-card-text>
              </v-card>
            </template>

          </commons-sms>

        </v-sheet>
      </v-col>



    </v-row>
    <commons-dialog v-model="trip_gas_dialog" max-width="600" title="Vehicle / Equipment Information"
      submitText="Submit" @submit="request_trip_ticket">
      <v-card-text style="max-height: 70vh; overflow-y: auto;">
        <v-row dense>
          <v-col cols="12">
            <p class="text-subtitle- mb-1 font-weight-bold">Select Vehicle Type</p>
            <v-radio-group v-model="trip_ticket.type" density="compact" inline hide-details>
              <v-radio class="pr-2" label="Equipment" value="equipment" color="primary" />
              <v-radio label="Vehicle" value="vehicle" color="primary" />
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="6">
            <v-select class="mb-2" v-model="trip_ticket.project" label="Project" item-title="name" item-value="_id"
              :items="project_data" density="compact" variant="outlined" hide-details clearable />
          </v-col>
          <v-col cols="6">
            <v-select label="Vehicle / Tools" v-model="trip_ticket.vehicle_id" item-title="name" item-value="_id"
              :items="vehicle_data" density="compact" variant="outlined" hide-details clearable />
          </v-col>
          <v-col cols="6">
            <v-text-field label="Driver's Name" density="compact" variant="outlined" v-model="trip_ticket.driver"
              hide-details />
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="trip_ticket.diesel" label="Diesel" hint="Current estimated diesel amount"
              persistent-hint density="compact" variant="outlined" />

          </v-col>
          <v-col cols="6">
            <v-checkbox label="Include Gas Request" density="compact" variant="outlined" v-model="trip_ticket.with_gas"
              hide-details />
          </v-col>
        </v-row>
        <v-card class="mt-2" title="Trip Details" subtitle="Enter the origin, destination, and trip schedule">
          <v-card-text>
            <v-list class="mt-0 pt-0" :lines="false" density="compact" nav v-if="trip_ticket.destination.length">
              <v-list-item density="compact">
                <template v-slot:prepend>
                  <v-icon class="ma-0 pa-0 pr-2" color="primary">mdi-car</v-icon>
                </template>
                <v-list-item-title class="text-sm font-weight-medium ma-0 pa-0">
                  Destination Details
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-for="(des, i) in trip_ticket.destination" :key="i" density="compact">
                <v-list-item-title class="text-sm">
                  <span class="text-blue-darken-2">{{ new Date(des.date).toLocaleDateString() }}</span>:
                  {{ des.from }} → {{ des.to }} ({{ des.departure }}–{{ des.arrival }})
                  <span v-if="des.purpose">— {{ des.purpose }}</span>
                </v-list-item-title>
              </v-list-item>
            </v-list>


            <v-row dense>
              <v-col cols="6">
                <v-text-field label="From" v-model="destination.from" density="compact" variant="filled" hide-details />
              </v-col>
              <v-col cols="6">
                <v-text-field label="To" v-model="destination.to" density="compact" variant="filled" hide-details />
              </v-col>
              <v-col cols="4">
                <v-text-field label="Date" v-model="destination.date" density="compact" variant="filled" hide-details
                  type="date" />
              </v-col>
              <v-col cols="4">
                <v-text-field label="Departure Time" v-model="destination.departure" type="time" density="compact"
                  variant="filled" hide-details />
              </v-col>
              <v-col cols="4">
                <v-text-field label="Arrival Time" v-model="destination.arrival" type="time" density="compact"
                  variant="filled" hide-details />
              </v-col>
              <v-col cols="12">
                <v-textarea label="Purpose of Travel" v-model="destination.purpose" variant="filled" rows="2"
                  hide-details />
              </v-col>
              <v-col cols="6">
                <v-btn color="primary" variant="tonal" block @click="
                  destination.from && destination.to && destination.departure && destination.arrival && destination.purpose &&
                  (trip_ticket.destination.push({ ...destination }),
                    destination.from = '',
                    destination.to = '',
                    destination.departure = '',
                    destination.arrival = '',
                    destination.purpose = '')
                  ">
                  Add
                </v-btn>

              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-card v-if="trip_ticket.with_gas" class="mt-2" title="Fuel Details"
          subtitle="Provide fuel request and related information" border>
          <v-card-text>
            <v-list class="mt-0 pt-0" :lines="false" density="compact" nav v-if="trip_ticket.gas.length">
              <v-list-item density="compact">
                <template v-slot:prepend>
                  <v-icon class="ma-0 pa-0 pr-2" color="primary">mdi-fuel</v-icon>
                </template>
                <v-list-item-title class="text-sm font-weight-medium">
                  Gas Details
                </v-list-item-title>
              </v-list-item>
              <v-list-item v-for="(gas, i) in trip_ticket.gas" :key="i" density="compact">
                <v-list-item-title class="text-sm">
                  <span class="text-blue-darken-2 font-medium pr-2">{{ gas.desc }} -</span>
                  <span class="text-grey-darken-1">
                    {{ gas.liters }} Ltrs &mdash;
                    ₱{{ (Number(gas.cost) * Number(gas.liters)).toFixed(2) }}
                    <span class="text-caption">
                      (₱{{ Number(gas.cost).toFixed(2) }}/L)
                    </span>
                  </span>
                </v-list-item-title>
              </v-list-item>
            </v-list>


            <v-row dense>
              <v-col cols="6">
                <v-text-field label="Fuel Type / Description" v-model="gas.desc" density="compact" variant="filled"
                  hide-details />
              </v-col>
              <v-col cols="6">
                <v-text-field label="Liters" v-model="gas.liters" type="number" density="compact" variant="filled"
                  hide-details />
              </v-col>
              <v-col cols="6">
                <v-text-field label="Estimated Cost" v-model="gas.cost" type="number" density="compact" variant="filled"
                  hide-details />
              </v-col>
              <v-col cols="6">
                <v-text-field label="Remarks" v-model="gas.remarks" density="compact" variant="filled" hide-details />
              </v-col>
              <v-col cols="12">
                <v-file-input label="Attach photo receipts" prepend-icon="mdi-camera" variant="filled" />
              </v-col>
              <v-col cols="6">
                <v-btn color="primary" variant="tonal" block @click="
                  trip_ticket.gas.push({ ...gas });
                gas.desc = '';
                gas.liters = 0;
                gas.cost = 0;
                gas.remarks = '';
                ">
                  Add
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <!-- Reason -->
        <v-row dense>
          <v-col cols="12" class="mt-2">
            <v-textarea label="Justification / Additional Notes" v-model="trip_ticket.reason" rows="2" hide-details
              variant="filled" />
          </v-col>
        </v-row>
      </v-card-text>
    </commons-dialog>




    <commons-dialog v-model="checklist_dialog" max-width="600" title="Daily/Monthly Preventive Maintenance Checklist"
      submitText="Submit" @submit="update_checklist" icon="mdi-clipboard-check">
      <v-sheet style="max-height: 70vh; overflow-y: auto;">
        <v-list select-strategy="leaf">
          <v-list-item v-for="(item, index) in checklistMeta" :key="index" class="py-3" :class="{
            'text-success': checklist[item.key],
            'bg-green-lighten-5': checklist[item.key]
          }" @click="checklist[item.key] = !checklist[item.key]" style="cursor: pointer">
            <v-list-item-title class="text-uppercase"> <v-icon start class="mr-2 ">{{ item.icon }}</v-icon>{{
              item.category
            }}</v-list-item-title>
            <p class="text-caption pr-10 justify-text text-high-emphasis">{{ item.description }}</p>
            <template v-slot:append>
              <v-list-item-action class="flex-column align-end">
                <v-spacer></v-spacer>
                <v-icon v-if="checklist[item.key]" color="yellow-darken-3">
                  mdi-checkbox-marked-circle
                </v-icon>
                <v-icon v-else class="opacity-30">
                  mdi-checkbox-blank-outline
                </v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-list>


        <v-textarea class="pa-2" v-model="checklist.remarks" label="Remarks if any" rows="3" variant="solo" />
      </v-sheet>
    </commons-dialog>

    <commons-dialog v-model="breakdown_dialog" max-width="600" title="Breakdown Report" submitText="Submit"
      @submit="update_breakdown">
      <v-card-text style="max-height: 70vh; overflow-y: auto;">
        <v-textarea v-model="breakdown.problem" label="TROUBLE / PROBLEM" rows="4" auto-grow variant="filled" />
        <v-textarea v-model="breakdown.work_desc" label="DESCRIPTION OF WORK" rows="4" auto-grow variant="filled" />
        <v-textarea v-model="breakdown.parts" label="PARTS TO BE REPAIRED / REPLACED" rows="4" auto-grow
          variant="filled" />
      </v-card-text>
    </commons-dialog>

    <commons-dialog v-model="job_order_dialog" max-width="700" title="Job Order Form" submitText="Submit"
      @submit="create_job_order">
      <v-card-text style="max-height: 70vh; overflow-y: auto;">
        <v-row dense>
          <v-col cols="12">
            <v-textarea v-model="job_order.problems_encounter" label="Problems Encountered" rows="3" auto-grow outlined
              hide-details />
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="job_order.work_done" label="Details of Work Done" rows="3" auto-grow outlined
              hide-details />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="job_order.conducted_by" label="Conducted By" outlined
              prepend-inner-icon="mdi-account" hide-details />
          </v-col>
          <v-col cols="6" md="3">
            <v-text-field v-model="job_order.date_started" label="Date Started" type="date" outlined
              prepend-inner-icon="mdi-calendar-start" hide-details />
          </v-col>

          <v-col cols="6" md="3">
            <v-text-field v-model="job_order.date_completed" label="Date Completed" type="date" outlined
              prepend-inner-icon="mdi-calendar-end" hide-details />
          </v-col>

          <v-col cols="6" md="3">
            <v-text-field v-model="job_order.time_started" label="Time Started" type="time" outlined
              prepend-inner-icon="mdi-clock-start" hide-details />
          </v-col>
          <v-col cols="6" md="3">
            <v-text-field v-model="job_order.time_completed" label="Time Completed" type="time" outlined
              prepend-inner-icon="mdi-clock-end" hide-details />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="job_order.estimated_days_repair" label="Estimated Days for Repair" type="number"
              outlined prepend-inner-icon="mdi-calendar-clock" hide-details />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="job_order.inspected_by" label="Inspected By" outlined
              prepend-inner-icon="mdi-account-search" hide-details />
          </v-col>
          <v-col cols="6">
            <v-btn variant="tonal" block color="primary" prepend-icon="mdi-plus" @click="dialog = true">
              Add Material Request
            </v-btn>
            <v-dialog v-model="dialog" max-width="420" persistent>
              <v-card title="Material Details" prepend-icon="mdi-cart">
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12">
                      <v-text-field v-model="material.material" label="Material Description" outlined hide-details />
                    </v-col>
                    <v-col cols="6">
                      <v-text-field v-model="material.quantity" label="Quantity" type="number" outlined hide-details />
                    </v-col>
                    <v-col cols="6">
                      <v-text-field v-model="material.unit" label="Unit" outlined hide-details />
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn variant="text" @click="dialog = false">Close</v-btn>
                  <v-btn variant="flat" color="primary" @click="
                    material.material && material.quantity && material.unit &&
                    (
                      job_order.materials.push({ ...material }),
                      material.material = '',
                      material.quantity = '',
                      material.unit = '',
                      dialog = false
                    )">
                    Add
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>

          <!-- Materials Section -->
          <v-col cols="12" v-if="job_order.materials && job_order.materials.length">
            <v-card elevation="2" class="pa-4">
              <p class="text-subtitle-1 font-weight-medium d-flex align-center mb-0">
                <v-icon class="mr-1">mdi-tools</v-icon>
                Material / Spare Part Requirements
              </p>


              <!-- Display Added Materials -->
              <v-list density="compact">
                <v-list-item v-for="(m, i) in job_order.materials" :key="i"
                  :title="`${i + 1}. ${m.material} - ${m.quantity} ${m.unit}`" />
              </v-list>


              <v-divider class="my-3" />
              <v-btn color="success" block prepend-icon="mdi-clipboard-edit">
                Create as Purchase Request
              </v-btn>
            </v-card>
          </v-col>

          <!-- Turnover Fields -->
          <v-col cols="12">
            <v-textarea v-model="job_order.turnover.results" label="Results" rows="3" auto-grow outlined hide-details />
          </v-col>

          <v-col cols="6" md="6">
            <v-text-field v-model="job_order.turnover.conducted_by" label="Turnover Conducted By" outlined
              hide-details />
          </v-col>

          <v-col cols="6" md="6">
            <v-text-field v-model="job_order.turnover.date" label="Turnover Date" type="date" outlined hide-details />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="job_order.turnover.accepted_by" label="Accepted By" outlined hide-details />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field v-model="job_order.turnover.acceptance_date" label="Acceptance Date" type="date" outlined
              hide-details />
          </v-col>
        </v-row>
      </v-card-text>
    </commons-dialog>


    <commons-dialog v-model="return_dialog" max-width="400" title="Return Form" submitText="Submit"
      icon="mdi-clipboard-check">
      <v-card-text style="max-height: 70vh; overflow-y: auto;">
        <!-- Date and Time Display with Icon -->
        <div class="d-flex align-center mb-4">
          <v-icon color="blue darken-2" class="mr-2">mdi-clock-outline</v-icon>
          <span class="text-subtitle-2 font-weight-medium">{{ now }}</span>
        </div>

        <!-- Textarea with Icon -->
        <v-textarea label="Remarks" prepend-inner-icon="mdi-note-text-outline" rows="4" auto-grow outlined
          color="blue darken-2" />
      </v-card-text>
    </commons-dialog>



  </v-sheet>
</template>


<script lang="ts" setup>
import useAuth from "~/store/auth";
import swal from 'sweetalert';
import { usePurchaseOrder } from '~/store/purchasing';
const { $rest } = useNuxtApp();
const auth = useAuth();
const user = useAuth().user;
const router = useRouter();

onBeforeMount(() => {
  Promise.all([
    get_vehicle(),
    get_project(),
    get_trip_ticket()
  ])
})
definePageMeta({ layout: "std-systems" });
const now = ref(new Date().toLocaleString())

onMounted(() => {
  setInterval(() => {
    now.value = new Date().toLocaleString()
  }, 1000)
})
const purchasingStore = usePurchaseOrder()

const dialog = ref(false)
interface Tripticket {
  vehicle_id: string;
  destination: Array;
  diesel: string;
  type: string;
  project: string;
  status: string;
  with_gas: boolean;
  gas: Array;
  driver: string;
  reason: string;

}

const trip_ticket = ref<Tripticket>({
  vehicle_id: "",
  destination: [],
  diesel: "",
  type: "",
  project: "",
  status: "",
  with_gas: false,
  gas: [],
  driver: "",
  reason: "",

});

const destination = ref({
  from: "",
  to: "",
  date: "",
  departure: "",
  arrival: "",
  purpose: "",
});

const gas = ref({
  desc: "",
  liters: 0,
  cost: 0,
  remarks: ""
})


const return_dialog = ref(false)
const trip_gas_dialog = ref(false)



async function request_trip_ticket() {
  trip_ticket.value.status = "available";
  const { data, error } = await $rest('trip-ticket/request-trip-ticket', {
    method: "POST",
    body: { ...trip_ticket.value }
  });
  if (error) return swal({ title: "Error", text: error, icon: "error" });

  swal({ title: "Success", text: data, icon: "success" });
  trip_gas_dialog.value = false;
}

const vehicle_data = ref([])
async function get_vehicle() {
  const { data } = await $rest('motorpool/get-vehicle', { method: "GET" });
  vehicle_data.value = data;
}

const trip_ticket_data = ref([])
async function get_trip_ticket() {
  const payload = {};
  if (search?.value?.project) {
    payload.project = search?.value?.project
  }
  const { data } = await $rest('trip-ticket/get-trip-ticket', {
    method: "GET",
    query: Object.keys(payload)?.length ? payload : {},
  });
  trip_ticket_data.value = data;
}
const request_header = ref([
  { title: "Vehicle/Tools", key: "vehicle", sortable: false },
  { title: "Project", key: "type", sortable: false },
  { title: "Driver", key: "driver", sortable: false },
  { title: "Status", key: "status", sortable: false },
  { title: "Actions", key: "actions", sortable: false, align: "center" },
])
const project_data = ref([])
async function get_project() {
  const { data } = await $rest('projects/get-project', { method: "GET" });
  project_data.value = data;
}

interface Search {
  project: string;
  type: string;
}
const search = ref<Search>({
  project: "",
  type: "",
});
const print_items = ref([
  {
    text: "Trip Ticket",
    value: "trip-ticket"
  },
  {
    text: "Gas Requisition",
    value: "gas-requisition"
  }
])
const print_result = (type: string) => {
  if (!type) {
    return swal({
      title: "Missing Type",
      text: "Please select a print type before proceeding.",
      icon: "info"
    });
  }

  const result = trip_ticket_data.value;
  purchasingStore.putData(result);
  router.push({
    name: `motorpool-${type}`
  });
}

const checklist_dialog = ref(false)
const checklist = ref({
  brakes: false,
  lights: false,
  oil: false,
  water: false,
  battery: false,
  air: false,
  gas: false,
  seatbelt: false,
  remarks: "",
});

const checklistMeta = [
  {
    key: 'brakes',
    category: 'Brakes',
    icon: 'mdi-car-brake-alert',
    description:
      "Make sure that you have sufficient (near the maximum level) brake fluid. Have an extra bottle of brake fluid just in case. Also consult your mechanic to check if your brake pads are in still good condition. When both metrics are OK, also check if you are happy with the brakes. Check if it is too hard or too springy for stepping.",
  },
  {
    key: 'lights',
    category: 'Lights',
    icon: 'mdi-car-light-high',
    description:
      'Check all of your vehicle lights (head lights, brake lights, taillights, signal lights, etc.) if they are in good working condition.',
  },
  {
    key: 'oil',
    category: 'Oil',
    icon: 'mdi-oil',
    description:
      'Use the oil dipstick to find out if you have full oil levels. Do this while having the vehicle parked on a level surface. You will get different reading at different times because of the temperature. Get the readings when the temperature is similar to the conditions during your road trip. Have an extra can of oil ready.',
  },
  {
    key: 'water',
    category: 'Water',
    icon: 'mdi-water-pump',
    description:
      'Check the radiator of your vehicle if the water level is full to avoid overheating. Bring with you at least 5 gallons of water. Check your windshield water bottle to ensure that you have enough windshield water. Lastly, check for possible water leaks.',
  },
  {
    key: 'battery',
    category: 'Battery',
    icon: 'mdi-car-battery',
    description:
      "Be careful when handling vehicle batteries. Check if the positive and negative terminals are clean (don't touch the positive terminal with your bare hand!). If your battery still has removable caps, take them off and see if the electrolyte levels still touch the metal inside. If not, fill it up with distilled water.",
  },
  {
    key: 'air',
    category: 'Air',
    icon: 'mdi-car-tire-alert',
    description:
      'Check if you have good tire pressure levels when your tires are cold. This includes the tires you currently use and your spare tire. Check for potential damages in your tires.',
  },
  {
    key: 'gas',
    category: 'Gas',
    icon: 'mdi-gas-station',
    description:
      'Look at your gas gauge if it still provides accurate reading.',
  },
  {
    key: 'seatbelt',
    category: 'Seatbelt',
    icon: 'mdi-seatbelt',
    description:
      'Double-check that the tension in the straps is correct or fits tightly.',
  },
];


async function update_checklist() {
  const { data, error } = await $rest('trip-ticket/update-checklist', {
    method: "PUT",
    body: {
      trip_id: trip_id.value,
      checklist: { ...checklist.value },
    },
  });

  if (error) {
    return swal({ title: "Error", text: error, icon: "error" });
  }
  swal({ title: "Success", text: data, icon: "success" });
}

const breakdown_dialog = ref(false)
const trip_id = ref("")
function openChecklist(id: any) {
  checklist_dialog.value = true;
  trip_id.value = id;
}

function openReturnForm(id: any) {
  return_dialog.value = true;
  trip_id.value = id;
}


const breakdown = ref({
  trip_id: "",
  vehicle_id: "",
  problem: "",
  work_desc: "",
  parts: ""
})
function openBreakdown(id: any, trip_id: any) {
  breakdown_dialog.value = true;
  breakdown.value.vehicle_id = id;
  breakdown.value.trip_id = trip_id;
}

async function update_breakdown() {
  const { data, error } = await $rest('trip-ticket/update-breakdown', {
    method: "PUT",
    body: {
      breakdown: { ...breakdown.value },
    },
  });

  if (error) {
    return swal({ title: "Error", text: error, icon: "error" });
  }
  swal({ title: "Success", text: data, icon: "success" });
}

const job_order_dialog = ref(false)
// async function request_breakdown_report() {
//   const { data, error } = await $rest('trip-ticket/create-breakdown', {
//     method: "POST",
//     body: { ...breakdown.value }
//   });

//   if (error) {
//     return swal({ title: "Error", text: String(error), icon: "error" });
//   }

//   swal({
//     title: "Success",
//     text: data.message || 'Breakdown submitted successfully!',
//     icon: "success"
//   });

//   breakdown_dialog.value = false;
// }

// Job Order
const material = reactive({
  material: '',
  quantity: 0,
  unit: ''
})

function openJoborder(vehicle_id: any, trip_id: any) {
  job_order_dialog.value = true;
  job_order.value.vehicle_id = vehicle_id;
  job_order.value.trip_id = trip_id;
}
const job_order = ref({
  trip_id: '',
  vehicle_id: '',
  problems_encounter: '',
  inspected_by: '',
  estimated_days_repair: null,
  work_done: '',
  conducted_by: '',
  date_started: '',
  date_completed: '',
  time_started: '',
  time_completed: '',
  inspected_date: '',
  materials: [],
  turnover: {
    conducted_by: '',
    date: '',
    results: '',
    accepted_by: '',
    acceptance_date: ''
  }
})
async function create_job_order() {
  const { data, error } = await $rest('trip-ticket/create-job-order', {
    method: "POST",
    body: { ...job_order.value }
  });
  if (error) return swal({ title: "Error", text: error, icon: "error" });
  swal({ title: "Success", text: data, icon: "success" });
}




</script>

<style scoped></style>