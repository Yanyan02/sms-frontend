<template>

  <v-sheet class="ma-4">
    <v-toolbar flat class="py-2" color="transparent">
      <template v-slot:title>
        <v-row dense>
          <v-col cols="12">
            <h2 class="font-weight-medium text-primary"> Inventory</h2>
            <small class="font-weight-thin" style="color: #B1D182;">
              Overview of external providers items and services
            </small>
          </v-col>
        </v-row>
      </template>
      <v-spacer></v-spacer>
      <v-btn>
        <v-icon class="pr-3" color="#228B22">mdi-hammer</v-icon>
        Add new Tool
      </v-btn>
      <v-btn>
        <v-icon class="pr-3" color="#228B22">mdi-database</v-icon>
        import
      </v-btn>

    </v-toolbar>
    <hr class="mb-2" color="#115D33" />
    <v-row dense>

      <v-col cols="12" class="d-flex">
        <v-sheet width="20%" border color="#F9FBE7" min-height="80vh">
          <v-card-text class="mt-8">
            <v-row dense>
              <v-col cols="12">
                <v-select class="mb-2" :items="['2025']" label="Year" outlined hide-details clearable></v-select>
                <v-select class="mb-2" label="Project" item-title="name" item-value="_id" density="compact"
                  variant="outlined" hide-details clearable />
                <v-select label="Request type" item-title="text" item-value="value" density="compact" variant="outlined"
                  hide-details clearable />
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
          <commons-sms title="Summary of Vehicles & Heavy Equipment" icon="mdi-note-text-outline"
            :display_types="['grid', 'table']">


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
                <v-radio class="pr-2" label="Equipment" value="Equipment" color="primary" />
                <v-radio label="Vehicle" value="Vehicle" color="primary" />
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

            <!-- <v-col cols="6">
              <v-select v-model="vehicle.project" label="Project" density="compact" variant="outlined" hide-details />
            </v-col> -->

            <v-col cols="6">
              <v-text-field v-model="vehicle.other" label="Other Information" density="compact" variant="outlined"
                hide-details />
            </v-col>

            <v-col cols="6">
              <v-text-field v-model="vehicle.date_purchased" label="Date Purchased" type="date" density="compact"
                variant="outlined" hide-details />
            </v-col>
          </v-row>
        </v-container>
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
  ])
})
definePageMeta({ layout: "std-systems" });



interface Vehicle {
  type: string;
  name: string;
  id: string;
  // project?: string;
  make: string;
  serial_no: string;
  brand: string;
  model: string;
  date_purchased: Date;
  // supplier?: string;
  other?: string;
}


const vehicle = ref<Vehicle>({
  type: "",
  name: "",
  id: "",
  // project: "",
  make: "",
  serial_no: "",
  brand: "",
  model: "",
  date_purchased: new Date(),
  // supplier: "",
  other: ""
});
const vehicle_dialog = ref(false)



async function create_vehicle() {
  const { data, error } = await $rest('motorpool/create-vehicle', {
    method: "POST",
    body: { ...vehicle.value }
  });
  if (error) return swal({ title: "Error", text: error, icon: "error" });

  swal({ title: "Success", text: data, icon: "success" });
  vehicle_dialog.value = false;
}



</script>

<style scoped></style>