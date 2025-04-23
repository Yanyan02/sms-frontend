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
                <v-select class="mb-2" label="Project" :items="project_data" item-title="name" item-value="_id"
                  density="compact" variant="outlined" hide-details clearable />
                <v-select label="Request type" :items="print_items" item-title="text" item-value="value"
                  density="compact" variant="outlined" hide-details clearable />
              </v-col>

              <v-col cols="12">
                <v-btn block color="success" class="white--text" @click="get_purchase_request">
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
            :items="purchase_request_data" :display_types="['grid', 'table']">

            <template v-slot:table="{ items }">
              <v-card-text border style="max-height: 80vh; overflow-y: auto;">
                <v-data-table :items="purchase_request_data" :headers="purchase_request_header">
                  <template v-slot:item.no="{ item }">
                    <v-chip density="compact" class="text-caption" color="amber" variant="tonal">
                      {{ item.selectable.no }} </v-chip>
                  </template>
                  <template v-slot:item.date_requested="{ item }">
                    <span class="text-success">{{ new Date(item.selectable.date_requested).toDateString()
                    }}</span>
                  </template>
                  <template v-slot:item.items="{ item }">
                    <v-chip size="small" color="info">
                      {{ item.selectable.items.length }} item(s)
                    </v-chip>

                  </template>
                  <template v-slot:item.actions="{ item }">
                    <v-btn density="compact" color="primary">Actions</v-btn>
                  </template>
                </v-data-table>
              </v-card-text>
            </template>
            <template v-slot:item="{ value, index, display }">
              <v-card class="mx-auto" rounded="lg" color="primary" variant="tonal">
                <v-card-text>
                  <v-row no-gutters>

                    <v-col cols="6"> Date Requested : <b>{{ new Date(value.date_requested).toDateString()
                    }}</b></v-col>
                    <v-col cols="6" class="text-end align-end"> PR No. : <v-chip density="compact" class="text-caption"
                        color="amber" variant="tonal">
                        {{ value.no }} </v-chip></v-col>
                    <v-col cols="12"> Requested by : <b>{{ value.requested_by }}</b></v-col>
                    <v-col cols="12"> <v-divider class="my-2"></v-divider> </v-col>

                    <v-col cols="12"> <v-icon class="mr-2 text-primary">mdi-folder-cog</v-icon> {{
                      value.project
                    }}</v-col>
                    <v-col cols="12"> <v-icon class="mr-2 text-blue">mdi-map-marker</v-icon>{{ value.address
                    }}</v-col>
                    <v-col cols="12" class="d-flex align-center justify-space-between">
                      <div class="d-flex align-center">
                        <v-icon class="mr-2 text-orange">mdi-cart</v-icon>
                        <v-chip size="small" color="info">
                          {{ value.items.length }} item(s)
                        </v-chip>
                      </div>

                      <v-menu :close-on-content-click="false" location="end">
                        <template v-slot:activator="{ props }">
                          <v-btn v-bind="props" density="compact" color="primary" @click="get_pr(value._id)"> Manage
                          </v-btn>
                        </template>
                        <v-card min-width="300">
                          <v-list>
                            <v-list-item title="Manage Purchasing">
                              <template v-slot:append>
                                <v-icon color="green darken-4" size="24">mdi-cart</v-icon>
                              </template>
                            </v-list-item>
                          </v-list>
                          <v-divider></v-divider>
                          <v-list lines="two" class="elevation-1" density="compact">

                            <v-list-item v-for="item in menu_items" :key="item.value" :title="item.text"
                              :subtitle="item.subtitle" @click="print_request(item.value)">
                              <template v-slot:prepend>
                                <v-icon :color="'primary'" :size="22">{{ item.icon }}</v-icon>
                              </template>
                            </v-list-item>

                          </v-list>
                          <v-card-actions>
                            <v-spacer />
                            <v-btn variant="text" color="error">Close</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-menu>
                    </v-col>

                  </v-row>
                </v-card-text>
              </v-card>
            </template>
          </commons-sms>
        </v-sheet>
      </v-col>



    </v-row>

    <commons-dialog v-model="vehicle_dialog" max-width="50%" icon="mdi-car" title="Vehicle/Heavy Equipment Info"
      submitText="Submit" @submit="create_vehicle_info">
      <v-card-text style="max-height: 70vh; overflow-y: auto;">

        <v-row dense>
          <v-col cols="6">
            <v-text-field v-model="vehicle.type" label="Vehicle Type" density="compact" variant="outlined"
              hide-details />
          </v-col>

          <v-col cols="6">
            <v-text-field v-model="vehicle.name" label="Vehicle Name" density="compact" variant="outlined"
              hide-details />
          </v-col>

          <v-col cols="6">
            <v-text-field v-model="vehicle.id" label="Vehicle ID" density="compact" variant="outlined" hide-details />
          </v-col>

          <v-col cols="6">
            <v-text-field v-model="vehicle.location" label="Location" density="compact" variant="outlined"
              hide-details />
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

          <v-col cols="6">
            <v-text-field v-model="vehicle.supplier" label="Supplier" density="compact" variant="outlined"
              hide-details />
          </v-col>

          <v-col cols="6">
            <v-text-field v-model="vehicle.other" label="Other Information" density="compact" variant="outlined"
              hide-details />
          </v-col>

          <v-col cols="6">
            <v-text-field v-model="vehicle.date_purchased" label="Date Purchased" type="date" density="compact"
              variant="outlined" hide-details />
          </v-col>
        </v-row>
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
    // get_project(),
    // get_supplier(),
    // get_purchase_request(),


  ])
})
definePageMeta({ layout: "std-systems" });

const purchasingStore = usePurchaseOrder()


const purchase_request_header = ref([
  { title: "PR NO", key: "no", sortable: false },
  { title: "Project", key: "project", sortable: false },
  { title: "Requested by", key: "requested_by", sortable: false },
  { title: "Date Requested", key: "date_requested", sortable: false },
  { title: "Items", key: "items", sortable: false },
  { title: "Actions", key: "actions", sortable: false, align: "center" },
])

interface Vehicle {
  type: string;
  name: string;
  id: string;
  location: string;
  make: string;
  serial_no: string;
  brand: string;
  model: string;
  date_purchased: Date;
  supplier: string;
  other?: string;
}


const vehicle = ref<Vehicle>({
  type: "",
  name: "",
  id: "",
  location: "",
  make: "",
  serial_no: "",
  brand: "",
  model: "",
  date_purchased: new Date(),
  supplier: "",
  other: ""
});
const vehicle_dialog = ref(false)



// async function create_purchase_requisition() {
//   const { data, error } = await $rest('purchasing/create-purchase-request', {
//     method: "POST",
//     body: { ...pr.value }
//   });
//   if (error) return swal({ title: "Error", text: error, icon: "error", buttons: false });

//   swal({ title: "Success", text: data, icon: "success", buttons: false });

//   pr.value = { project: "", type: "", requested_by: "", items: [] };
//   get_purchase_request()
//   vehicle_dialog.value = false;
// }

// const purchase_request_data = ref([]);

// async function get_purchase_request() {
//   const payload = {};
//   if (pr?.value?.project) {
//     payload.project = pr.value.project;
//   }
//   if (pr?.value?.type) {
//     payload.type = pr.value.type;
//   }
//   console.log("Payloadddd", payload);


//   const { data } = await $rest("purchasing/get-purchase-request", {
//     method: "GET",
//     query: Object.keys(payload).length ? payload : {},
//   });
//   purchase_request_data.value = data;
// }


// const project_data = ref([])
// async function get_project() {
//   const { data } = await $rest('projects/get-project', { method: "GET" });
//   project_data.value = data;
// }

// const print_result = (type: string) => {
//   const result = purchase_request_data.value
//   console.log("purchasingStore", purchasingStore);

//   purchasingStore.putData(result)

//   router.push({
//     name: `printable-${type}`
//   })
// }

// const pr_data = ref([])
// async function get_pr(id: any) {
//   const { data, error } = await $rest('purchasing/get-purchase-request-id', {
//     method: "GET",
//     query: { id: id }
//   });
//   pr_data.value = data
// }

// const print_request = (type: string) => {
//   if (pr_data.value.length === 0) return swal({ text: "No data found!", icon: "error" });

//   const result = pr_data.value;
//   purchasingStore.putData(result);

//   router.push({
//     name: `printable-${type}`,
//     query: {
//       result: JSON.stringify(result)
//     }
//   });
// }



// const supplier_data = ref([])
// async function get_supplier() {
//   const { data } = await $rest('supplier/get-supplier', { method: "GET" });
//   supplier_data.value = data;
// }


// const print_items = ref([
//   {
//     text: "Material Requisition",
//     value: "purchase-request"

//   },
//   {
//     text: "Stock Card",
//     value: "purchase-order"
//   }
// ])
// const menu_items = ref([
//   {
//     text: "Purchase Requisition",
//     subtitle: "Print & View PR",
//     value: "purchase-request",
//     icon: "mdi-file-document"
//   },
//   {
//     text: "Purchase Order",
//     subtitle: "Print & View PO",
//     value: "purchase-order",
//     icon: "mdi-cart"
//   },
//   {
//     text: "Material Receiving",
//     subtitle: "Print & View Receiving",
//     value: "purchase-receiving",
//     icon: "mdi-package-variant-closed"
//   }
// ]);


</script>

<style scoped></style>