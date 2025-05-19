<template>

  <v-sheet class="ma-4">
    <v-toolbar flat class="py-2" color="transparent">
      <template v-slot:title>
        <v-row dense>
          <v-col cols="12">
            <h2 class="font-weight-medium text-primary">Summary of Purchase Requisition</h2>
            <small class="font-weight-thin" style="color: #B1D182;">
              Overview of external providers items and services
            </small>
          </v-col>
        </v-row>
      </template>
      <v-spacer></v-spacer>
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

                <v-select class="mb-2" v-model="searchData.project" label="Project" :items="project_data"
                  item-title="name" item-value="_id" density="compact" variant="outlined" hide-details clearable />
                <v-select class="mb-2" v-model="searchData.type" label="Request type" :items="print_items"
                  item-title="text" item-value="value" density="compact" variant="outlined" hide-details clearable />

                <v-text-field class="mb-2" v-if="searchData.type === 'stock-card'" v-model="searchData.year"
                  label="Year & Month" type="month" density="compact" variant="outlined" hide-details clearable />

              </v-col>

              <v-col cols="12">
                <v-btn block color="success" class="white--text" @click="get_purchase_request">
                  Filter
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn block color="blue darken-4" @click="print_result(searchData.type)" class="white--text">
                  Print
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn block color="amber" @click="purchase_request_dialog = true">
                  Create
                </v-btn>
              </v-col>

            </v-row></v-card-text>
        </v-sheet>
        <v-sheet border width="80%" height="80vh">

          <commons-sms title="Summary of Purchase Requisition" icon="mdi-note-text-outline"
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


    <commons-dialog v-model="purchase_request_dialog" max-width="50%" icon="mdi-school"
      title="Purchase Requisition Slip" submitText="Submit" @submit="create_purchase_requisition">
      <v-card-text style="max-height: 70vh; overflow-y: auto;">
        <v-row dense>
          <!-- Left Panel: Add Item Section -->
          <v-col cols="12">
            <v-card flat>
              <v-card-text>
                <v-row dense>
                  <v-col cols="12">
                    <v-select v-model="pr.project" label="Project" :items="project_data" item-title="name"
                      item-value="_id" density="compact" variant="outlined" hide-details />
                  </v-col>

                  <v-col cols="12" v-if="pr.project" class="py-2">
                    <v-icon color="blue">mdi-map-marker</v-icon> {{(project_data.find(p => p?._id === pr.project) ||
                      {}).address ||
                      ''}}
                  </v-col>

                  <v-col cols="12"> <v-select v-model="pr.supplier" label="Supplier" :items="supplier_data"
                      item-title="name" item-value="_id" density="compact" variant="outlined" hide-details /></v-col>
                  <v-col cols="12">
                    <v-text-field v-model="pr.requested_by" label="Requested by" density="compact" variant="outlined"
                      hide-details />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="pr.type" label=" Delivery Receipt/Invoice Number" density="compact"
                      variant="outlined" hide-details />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="pr.date_requested" label="Date Requested" type="date" density="compact"
                      variant="outlined" hide-details />
                  </v-col>
                  <v-col cols="4">
                    <v-checkbox v-model="pr.delivery" color="primary" label="Mark if for Pick-up" hide-details
                      density="comfortable" inset />


                  </v-col>

                  <v-divider class="my-3"></v-divider>
                  <!-- Heading for Item Details Section -->
                  <h4 class="mb-2 text-primary font-weight-bold">Item Details</h4>

                  <v-col cols="12">
                    <v-textarea v-model="newItem.description" rows="2" label="Item Description" density="compact"
                      variant="outlined" hide-details />
                  </v-col>

                  <v-col cols="3">
                    <v-combobox v-model="newItem.unit" :items="unitOptions" label="Unit" density="compact"
                      variant="outlined" hide-details />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field v-model="newItem.quantity" type="number" label="Quantity" density="compact"
                      variant="outlined" hide-details />
                  </v-col>

                  <v-col cols="3">
                    <v-text-field v-model="newItem.cost" type="number" label="Cost" density="compact" variant="outlined"
                      hide-details />
                  </v-col>

                  <!-- Add Item Button -->
                  <v-col cols="3">
                    <v-btn block color="primary" variant="tonal" prepend-icon="mdi-plus" class="my-1 py-2 rounded-lg"
                      @click="addItem">
                      Add Item
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Right Panel: Display Added Items -->
          <v-col cols="12" v-if="pr.items.length">
            <v-card class="elevation-1">
              <v-card-text>
                <!-- Heading for Added Items -->
                <h4 class="mb-2 text-primary font-weight-bold">Added Items</h4>
                <v-divider class="my-2"></v-divider>

                <v-table density="compact">
                  <thead class="bg-green-lighten-3 text-white">
                    <tr>
                      <th class="text-left px-3">Action</th>
                      <th class="text-left px-3">Description</th>
                      <th class="text-left px-3">Unit</th>
                      <th class="text-left px-3">Quantity</th>
                      <th class="text-left px-3">Cost</th>
                      <th class="text-left px-3">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in pr.items" :key="index" class="hover:bg-grey-lighten-3">
                      <td class="px-3">
                        <v-btn icon="mdi-delete" color="error" variant="text"
                          class="hover:scale-110 transition-transform" @click="removeItem(index)" />
                      </td>
                      <td class="px-3">{{ item.description }}</td>
                      <td class="px-3">{{ item.unit }}</td>
                      <td class="px-3">{{ item.quantity }}</td>
                      <td class="px-3">₱{{ Number(item.cost).toLocaleString() }}</td>
                      <td class="px-3">₱{{ (item.quantity * item.cost).toLocaleString() }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-card-text>
            </v-card>
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
    get_project(),
    get_supplier(),
    get_purchase_request(),


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

interface SearchData {
  project: string;
  type: string;
  year: string;
}
interface PR {
  project: string;
  requested_by: string;
  date_requested: string;
  type: string;
  supplier: string;
  items: {
    description: string;
    unit: string;
    quantity: number | null;
    cost: number | null;
  }[];
  delivery: boolean
}

const searchData = ref<SearchData>({
  project: "",
  type: "",
  year: ""
});
const pr = ref<PR>({
  project: "",
  requested_by: "",
  date_requested: "",
  supplier: "",
  items: [],
  type: "",
  delivery: false
});
const purchase_request_dialog = ref(false)

const newItem = ref({
  description: "",
  unit: "",
  quantity: null,
  cost: null,
});

const addItem = () => {
  if (newItem.value.description && newItem.value.unit && newItem.value.quantity && newItem.value.cost) {
    pr.value.items.push({ ...newItem.value });
    newItem.value = { description: "", unit: "", quantity: null, cost: null };
  }
};

const unitOptions = ref(["pcs", "roll", "kilo", "meter", "box", "liters"]);

async function create_purchase_requisition() {
  const { data, error } = await $rest('purchasing/create-purchase-request', {
    method: "POST",
    body: { ...pr.value }
  });
  if (error) return swal({ title: "Error", text: error, icon: "error", buttons: false });

  swal({ title: "Success", text: data, icon: "success", buttons: false });

  pr.value = { project: "", type: "", requested_by: "", items: [] };
  get_purchase_request()
  purchase_request_dialog.value = false;
}

const purchase_request_data = ref([]);

async function get_purchase_request() {
  const payload = {};
  if (searchData?.value?.project) {
    payload.project = searchData.value.project;
  }
  if (searchData?.value?.type) {
    payload.type = searchData.value.type;
  }
  if (searchData?.value?.year) {
    payload.year = searchData.value.year;
  }
  console.log("Payloadddd", payload);


  const { data } = await $rest("purchasing/get-purchase-request", {
    method: "GET",
    query: Object.keys(payload).length ? payload : {},
  });
  purchase_request_data.value = data;
}


const project_data = ref([])
async function get_project() {
  const { data } = await $rest('projects/get-project', { method: "GET" });
  project_data.value = data;
}

const print_result = (type: string) => {
  const result = purchase_request_data.value
  console.log("purchasingStore", purchasingStore);

  purchasingStore.putData(result)
  if (type === 'stock-card') {
    router.push({
      name: `warehouse-${type}`
    })
  } else {

    router.push({
      name: `printable-${type}`
    })
  }

}

const pr_data = ref([])
async function get_pr(id: any) {
  const { data, error } = await $rest('purchasing/get-purchase-request-id', {
    method: "GET",
    query: { id: id }
  });
  pr_data.value = data
  console.log("PRRRRRRRRRRRRRRRRRR", pr_data);

}

const print_request = (type: string) => {
  console.log('Typeeeeee', type);

  if (!pr_data.value || pr_data.value.length === 0) {
    return swal({ text: "No data found!", icon: "error" });
  }


  const result = pr_data.value;
  purchasingStore.putData(result);

  router.push({
    name: `printable-${type}`,
    query: {
      result: JSON.stringify(result)
    }
  });
}



const supplier_data = ref([])
async function get_supplier() {
  const { data } = await $rest('supplier/get-supplier', { method: "GET" });
  supplier_data.value = data;
}


const print_items = ref([
  {
    text: "Purchase Requisition",
    value: "purchase-request"

  },
  {
    text: "Purchase Order",
    value: "purchase-order"
  },
  {
    text: "Material Receiving",
    value: "purchase-receiving"
  },
  {
    text: "Stock Card",
    value: "stock-card"
  }
])
const menu_items = ref([
  {
    text: "Purchase Requisition",
    subtitle: "Print & View PR",
    value: "purchase-request",
    icon: "mdi-file-document"
  },
  {
    text: "Purchase Order",
    subtitle: "Print & View PO",
    value: "purchase-order",
    icon: "mdi-cart"
  },
  {
    text: "Material Receiving",
    subtitle: "Print & View Receiving",
    value: "purchase-receiving",
    icon: "mdi-package-variant-closed"
  }

]);


</script>

<style scoped></style>