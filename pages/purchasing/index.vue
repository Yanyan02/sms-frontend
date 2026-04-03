<template>
  <div class="ma-4">
    <v-row no-gutters>
      <v-col cols=" 12" class="py-2">
        <v-row align="center" dense>
          <v-col cols="2">
            <v-select v-model="searchData.project" label="Project" :items="project_data" item-title="name"
              item-value="_id" variant="comfortable" rounded="xl" hide-details density="compact"
              prepend-inner-icon="mdi-magnify" bg-color="grey-lighten-1" clearable />
          </v-col>
          <v-col cols="2">
            <v-select v-model="searchData.type" label="Request type" :items="print_items" item-title="text"
              item-value="value" variant="comfortable" rounded="xl" hide-details density="compact"
              prepend-inner-icon="mdi-filter-variant" bg-color="grey-lighten-1" clearable />
          </v-col>
          <v-col cols="2" v-if="searchData.type === 'stock-card'">
            <v-text-field v-model="searchData.year" label="Year & Month" type="month" variant="comfortable" rounded="xl"
              hide-details density="compact" bg-color="grey-lighten-1" clearable />
          </v-col>

          <v-col cols="auto">
            <v-btn color="success" class="white--text px-6" rounded="xl" elevation="2" @click="get_purchase_request">
              Filter
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn color="blue darken-4" rounded="xl" elevation="2" @click="print_result(searchData.type)"
              class="white--text px-6">
              Print
            </v-btn>
          </v-col>
          <v-spacer />
          <v-col cols="2">
            <v-btn prepend-icon="mdi-plus-circle" @click="purchase_request_dialog = true" color="primary" rounded="xl"
              elevation="2" size="large" block class="px-6">
              Purchase Request
            </v-btn>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <commons-sms title="Summary of Purchase Requisition" subtitle="A brief overview of purchase requisitions."
          icon="mdi-note-text-outline" :items="purchase_request_data" :display_types="['grid', 'table']" rounded="xl"
          elevation="5">

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
          <template v-slot:item="{ value, index }">
            <v-card :key="index" class="ma-3 elevation-1" rounded="xl" border="sm"
              style="border-color: #f0f0f0 !important; transition: transform 0.2s ease-in-out;"
              @mouseover="hover = index" @mouseout="hover = null"
              :style="{ transform: hover === index ? 'translateY(-4px)' : 'translateY(0px)' }">
              <v-list-item class="px-4 pt-4 pb-2">
                <template v-slot:prepend>
                  <v-avatar color="primary" rounded="lg" size="48" class="mr-3">
                    <v-icon color="white">mdi-cart-outline</v-icon>
                  </v-avatar>
                </template>

                <v-list-item-title class="text-subtitle-1 font-weight-black text-primary">
                  PR No. {{ value.no }}
                </v-list-item-title>

                <v-list-item-subtitle class="text-button d-flex align-center mt-1">
                  <span>{{ value.supplier }}</span>
                  <v-spacer />
                  <v-icon size="14" color="primary" class="mr-1">mdi-calendar-edit</v-icon>
                  {{ new Date(value.date_requested).toDateString() }}
                </v-list-item-subtitle>

                <template v-slot:append>
                  <v-menu :close-on-content-click="false" location="bottom end" transition="scale-transition">
                    <template v-slot:activator="{ props }">
                      <v-btn v-bind="props" icon="mdi-dots-vertical" variant="text" color="grey-lighten-1"
                        density="comfortable" @click="get_pr(value._id)" />
                    </template>

                    <v-card min-width="300" rounded="xl" elevation="12">
                      <v-list bg-color="primary" class="py-2">
                        <v-list-item title="Manage Purchasing" base-color="white">
                          <template v-slot:append>
                            <v-icon size="24">mdi-cart-check</v-icon>
                          </template>
                        </v-list-item>
                      </v-list>

                      <v-divider />

                      <v-list lines="two" density="compact" class="pa-2">
                        <v-list-item v-for="item in menu_items" :key="item.value" :title="item.text"
                          :subtitle="item.subtitle" @click="print_request(item.value)" rounded="md" class="mb-1"
                          color="primary">
                          <template v-slot:prepend>
                            <v-avatar size="32" color="grey-lighten-4" class="mr-2">
                              <v-icon color="primary" size="20">{{ item.icon }}</v-icon>
                            </v-avatar>
                          </template>
                        </v-list-item>
                      </v-list>

                      <v-divider />

                      <v-card-actions class="pa-2">
                        <v-spacer />
                        <v-btn variant="text" color="error" class="text-none font-weight-bold"
                          @click="v_menu_model = false">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </template>
              </v-list-item>

              <v-card-text class="px-4 py-2">
                <div class="d-flex align-center mb-4 bg-grey-lighten-4 pa-2 rounded-lg"
                  style="border-left: 4px solid #1976D2;">
                  <v-icon size="18" class="mr-2 text-primary">mdi-account-circle-outline</v-icon>
                  <span class="text-body-2 text-grey-darken-3">
                    Requested by: <strong>{{ value.requested_by }}</strong>
                  </span>
                </div>

                <div class="mb-1 px-1">
                  <!-- <div class="d-flex align-center text-body-2 mb-1">
                    Supplier :
                    <span class="font-weight-bold text-grey-darken-4">{{ value.supplier }}</span>
                  </div> -->
                  <div class="d-flex align-center text-body-2 mb-1">
                    <v-icon class="mr-2 text-primary" size="18">mdi-folder-cog-outline</v-icon>
                    <span class="font-weight-bold text-grey-darken-4">{{ value.project }}</span>
                  </div>
                  <div class="d-flex align-center text-caption text-grey-darken-1">
                    <v-icon class="mr-2 text-blue-darken-1" size="18">mdi-map-marker-radius-outline</v-icon>
                    {{ value.address }}
                  </div>
                </div>
              </v-card-text>

              <v-divider />
              <v-card-actions class="bg-primary px-4 py-2" style="min-height: 48px;">
                <span class="text-button text-white" style="letter-spacing: 1px !important;">Material
                  Qty</span>
                <v-spacer />
                <v-chip size="small" color="white" variant="flat"
                  class="font-weight-black text-primary px-3 text-button">
                  {{ value.items.length }} items
                </v-chip>
              </v-card-actions>
            </v-card>
          </template>
        </commons-sms>

      </v-col>


    </v-row>
    <commons-dialog v-model="purchase_request_dialog" max-width="50%" icon="mdi-school"
      title="Purchase Requisition Slip" submitText="Submit" @submit="create_purchase_requisition">
      <v-card-text style="max-height: 70vh; overflow-y: auto;">
        <v-row dense>
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

          <v-col cols="12" v-if="pr.items.length">
            <v-card class="elevation-1">
              <v-card-text>
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
  </div>
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
  const payload: any = {};


  if (searchData?.value?.project) {
    payload.project = searchData.value.project;
  }

  if (searchData?.value?.type) {
    payload.type = searchData.value.type;
  }

  if (searchData?.value?.year) {
    payload.year = searchData.value.year;
  }

  console.log("Payload:", payload);

  const { data } = await $rest("purchasing/get-purchase-request", {
    method: "GET",
    query: payload,
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
  purchasingStore.putData(result)
  if (type === 'stock-card') {
    router.push({
      name: `warehouse-${type}`
    })
  } else if (type === 'logbook') {
    router.push({
      name: `warehouse-${type}`
    })
  }
  else {

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
}

const print_request = (type: string) => {
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
  },
  {
    text: "Logbook",
    value: "logbook"
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