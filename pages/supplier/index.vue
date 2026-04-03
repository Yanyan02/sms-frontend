<template>
  <div class="ma-4">
    <v-row no-gutters>
      <v-col cols="12" class="py-2">
        <v-row align="center" dense>
          <v-col cols="12" md="4">
            <v-select v-model="sup.supplier" label="Supplier" :items="supplier_data" item-title="name" item-value="_id"
              variant="comfortable" rounded="xl" hide-details density="compact" prepend-inner-icon="mdi-magnify"
              bg-color="grey-lighten-1" clearable />
          </v-col>

          <v-col cols="12" md="4">
            <v-select v-model="sup.type" label="Evaluation Type" :items="menu_items" item-title="text"
              item-value="value" variant="comfortable" rounded="xl" hide-details density="compact"
              prepend-inner-icon="mdi-filter-variant" bg-color="grey-lighten-1" clearable />
          </v-col>

          <v-col cols="auto">
            <v-btn color="success" class="white--text px-6" rounded="xl" elevation="2" @click="get_evaluations()">
              Filter
            </v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn color="blue darken-4" rounded="xl" elevation="2" @click="print_result(sup.type)"
              class="white--text px-6">
              Print
            </v-btn>
          </v-col>
          <v-spacer />
          <v-col cols="12" md="auto" class="px-2 text-right">
            <v-btn prepend-icon="mdi-plus-circle" @click="supplierDialog = true" color="primary" rounded="xl"
              elevation="2" size="large" class="px-6">
              Add Supplier
            </v-btn>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" class="mt-2">
        <commons-sms title="Master List of External Providers" subtitle="Overview of external suppliers and services."
          icon="mdi-account-multiple-outline" :items="supplier_data" :display_types="['grid', 'table']" rounded="xl"
          elevation="5">

          <template v-slot:table="{ items }">
            <v-card-text border style="max-height: 80vh; overflow-y: auto;">
              <v-data-table :items="supplier_data" :headers="supplier_header">
                <template v-slot:item.status="{ item }">
                  <v-chip size="small" :color="item.selectable.status === 'Qualified' ? 'success' : 'warning'"
                    variant="tonal" class="text-capitalize">
                    {{ item.selectable.status }}
                  </v-chip>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-btn density="compact" color="primary" @click="openManageMenu(item)">Actions</v-btn>
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
                  <v-avatar color="success" rounded="lg" size="48" class="mr-3">
                    <v-icon color="white">mdi-account-tie-outline</v-icon>
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
                  <v-menu :close-on-content-click="false" location="bottom end" transition="scale-transition">
                    <template v-slot:activator="{ props }">
                      <v-btn v-bind="props" icon="mdi-dots-vertical" variant="text" color="grey-lighten-1"
                        density="comfortable" />
                    </template>

                    <v-card min-width="300" rounded="xl" elevation="12">
                      <v-list bg-color="success" class="py-2">
                        <v-list-item title="Manage Supplier" base-color="white">
                          <template v-slot:append>
                            <v-icon size="24">mdi-account-check</v-icon>
                          </template>
                        </v-list-item>
                      </v-list>

                      <v-divider />

                      <v-list lines="two" density="compact" class="pa-2">
                        <v-list-item v-for="item in menu_items" :key="item.value" :title="item.text"
                          :subtitle="item.subtitle" @click="handleAction(item, value._id)" rounded="md" class="mb-1"
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
                          @click="closeMenu">Close</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </template>
              </v-list-item>

              <v-card-text class="px-4 py-2">
                <div class="d-flex align-center mb-4 bg-grey-lighten-3 pa-2 rounded-lg"
                  style="border-left: 4px solid #43A047;">
                  <v-icon size="18" class="mr-2 text-success">mdi-account-circle-outline</v-icon>
                  <span class="text-body-2 text-grey-darken-3">
                    Owner: <strong>{{ value.owner }}</strong>
                  </span>
                </div>

                <div class="mb-1 px-1">
                  <div class="d-flex align-center text-body-2 mb-1">
                    <v-icon class="mr-2 text-success" size="18">mdi-briefcase-outline</v-icon>
                    <span class="font-weight-bold text-grey-darken-4">{{ value.nature }}</span>
                  </div>
                  <div class="d-flex align-center text-caption text-grey-darken-1">
                    <v-icon class="mr-2 text-blue-darken-1" size="18">mdi-email-outline</v-icon>
                    {{ value.email }}
                  </div>
                </div>
              </v-card-text>

              <v-divider />
              <v-card-actions class="bg-success px-4 py-2" style="min-height: 48px;">
                <span class="text-button text-white" style="letter-spacing: 1px !important;">STATUS</span>
                <v-spacer />
                <v-chip size="small" color="white" variant="flat"
                  class="font-weight-black text-success px-3 text-button">
                  {{ value.status || 'Nominated' }}
                </v-chip>
              </v-card-actions>
            </v-card>
          </template>
        </commons-sms>
      </v-col>
    </v-row>


    <v-dialog v-model="supplierDialog" max-width="700" persistent>
      <v-card rounded="xl" class="pa-4">
        <v-card-title class="d-flex align-center pt-4 px-4 pb-0">
          <v-avatar color="success" variant="tonal" rounded="lg" size="54" class="mr-4">
            <v-icon size="32">mdi-account-tie</v-icon>
          </v-avatar>
          <div>
            <div class="text-h5 font-weight-black text-primary">
              Add External Supplier
            </div>
            <div class="text-caption text-grey-darken-1">
              Register a new supplier in the system.
            </div>
          </div>
          <v-spacer />
          <v-btn icon="mdi-close" variant="text" color="grey-lighten-1" @click="supplierDialog = false" />
        </v-card-title>

        <v-card-text class="mt-6">
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field label="Company Name*" v-model="supplier.name" variant="underlined" color="primary"
                placeholder="Enter company name" hide-details />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field label="Owner*" v-model="supplier.owner" variant="underlined" color="primary"
                placeholder="Enter owner name" hide-details />
            </v-col>

            <v-col cols="12">
              <v-text-field label="Address*" v-model="supplier.address" variant="underlined" color="primary"
                prepend-inner-icon="mdi-map-marker-outline" hide-details />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field label="Nature of Business*" v-model="supplier.nature" variant="underlined" color="primary"
                placeholder="e.g., Construction Materials" hide-details />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field label="Email*" v-model="supplier.email" type="email" variant="underlined" color="primary"
                placeholder="supplier@company.com" hide-details />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field label="Contact Number*" v-model="supplier.contact_number" variant="underlined"
                color="primary" hide-details />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field label="Contact Person*" v-model="supplier.contact_person" variant="underlined"
                color="primary" hide-details />
            </v-col>

            <v-col cols="12" md="6">
              <v-combobox label="Terms of Payment*" v-model="supplier.terms" :items="termsOptions" variant="underlined"
                color="primary" hide-details />
            </v-col>

            <v-col cols="12" md="6">
              <v-combobox label="Status*" v-model="supplier.status" :items="['Nominated', 'Qualified', 'Outsource']"
                variant="underlined" color="primary" hide-details />
            </v-col>

            <v-col cols="12" md="6">
              <v-combobox label="Year Accredited" v-model="supplier.accredited" :items="[2025, 2024]"
                variant="underlined" color="primary" hide-details />
            </v-col>

            <v-col cols="12">
              <v-combobox label="Products/Services" v-model="supplier.products" :items="['Metal',
                'Electrical', 'Paints', 'Plumbing', 'Construction Materials', 'Tools', 'Heavy Equipment',
                'Insulation', 'HVAC', 'Landscaping']" multiple chips variant="underlined" color="primary" />
            </v-col>

            <v-col cols="12" md="6">
              <v-file-input label="Company Profile" v-model="supplier.company_profile" show-size variant="underlined" />
            </v-col>

            <v-col cols="12" md="6">
              <v-file-input label="Product Catalog" v-model="supplier.catalog" show-size variant="underlined" />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="px-6 pb-6 pt-4">
          <v-spacer />
          <v-btn color="grey-lighten-1" variant="outlined" size="large" class="px-10 rounded-pill font-weight-bold"
            @click="supplierDialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary" variant="elevated" size="large" class="text-none px-10 rounded-pill font-weight-bold"
            elevation="4" @click="create_supplier">
            SAVE SUPPLIER
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-dialog v-model="supplierInvitationDialog" max-width="500" persistent>
      <v-card rounded="xl" class="pa-4">
        <v-card-title class="d-flex align-center pt-4 px-4 pb-0">
          <v-avatar color="primary" variant="tonal" rounded="lg" size="54" class="mr-4">
            <v-icon size="32">mdi-email-outline</v-icon>
          </v-avatar>
          <div>
            <div class="text-h5 font-weight-black text-primary">
              Invite Supplier
            </div>
            <div class="text-caption text-grey-darken-1">
              Send an invitation email to complete information.
            </div>
          </div>
          <v-spacer />
          <v-btn icon="mdi-close" variant="text" color="grey-lighten-1" @click="supplierInvitationDialog = false" />
        </v-card-title>

        <v-card-text class="mt-6">
          <v-row dense>
            <v-col cols="12">
              <v-text-field label="Supplier Email*" variant="underlined" color="primary"
                placeholder="supplier@company.com" hide-details />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="px-6 pb-6 pt-4">
          <v-spacer />
          <v-btn color="grey-lighten-1" variant="outlined" size="large" class="px-10 rounded-pill font-weight-bold"
            @click="supplierInvitationDialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary" variant="elevated" size="large" class="text-none px-10 rounded-pill font-weight-bold"
            elevation="4">
            SEND INVITATION
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <commons-dialog v-model="evaluation_dialog" max-width="60%" icon="mdi-clipboard-check-outline"
      title="External Provider Evaluation Form" submitText="Submit Evaluation" @submit="submit_evaluation">
      <v-card-text style="max-height: 70vh; overflow-y: auto;">
        <v-row dense>
          <v-col cols="12">
            <v-text-field label="Evaluation Date" v-model="evaluation_criteria.date" type="date" variant="underlined"
              color="primary" hide-details />
          </v-col>
          <v-col cols="6">
            <v-text-field label="Period From" v-model="evaluation_criteria.from" type="month" variant="underlined"
              color="primary" hide-details />
          </v-col>
          <v-col cols="6">
            <v-text-field label="Period To" v-model="evaluation_criteria.to" type="month" variant="underlined"
              color="primary" hide-details />
          </v-col>
          <v-col cols="12">
            <v-card class="pa-4" variant="outlined" color="grey">
              <v-row dense>
                <v-col cols="5" class="font-weight-bold text-primary">
                  <v-icon class="mr-2" color="primary">mdi-clipboard-text-outline</v-icon>CRITERIA
                </v-col>
                <v-col cols="7" class="text-center font-weight-bold">
                  <v-row no-gutters>
                    <v-col cols="2" class="text-end text-primary">5</v-col>
                    <v-col cols="2" class="text-end text-primary">4</v-col>
                    <v-col cols="2" class="text-end text-primary">3</v-col>
                    <v-col cols="2" class="text-end text-primary">2</v-col>
                    <v-col cols="2" class="text-end text-primary">1</v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-divider class="my-2" />
              <v-card class="mt-2" variant="tonal" color="primary" v-for="(item, i) in evaluation_criteria.criteria"
                :key="item.label">
                <v-card-text>
                  <v-row dense>
                    <v-col cols="5" class="text-subtitle-2 font-weight-bold">
                      {{ i + 1 }}. {{ item.label }}
                    </v-col>
                    <v-col cols="7">
                      <v-radio-group v-model="item.rating" class="d-flex" inline>
                        <v-radio class="px-2" :value="5" color="primary" />
                        <v-radio class="px-2" :value="4" color="primary" />
                        <v-radio class="px-2" :value="3" color="primary" />
                        <v-radio class="px-2" :value="2" color="primary" />
                        <v-radio class="px-2" :value="1" color="primary" />
                      </v-radio-group>
                    </v-col>
                  </v-row>
                  <v-textarea v-model="item.remarks" label="Remarks, if any" rows="2" auto-grow variant="outlined"
                    class="mt-2" />
                </v-card-text>
              </v-card>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="evaluation_criteria.recommendations" label="Recommendations" rows="3" auto-grow
              variant="outlined" />
          </v-col>
        </v-row>
      </v-card-text>
    </commons-dialog>
  </div>
</template>

<script lang="ts" setup>
import useAuth from "~/store/auth";
import { supplierEvaluations } from '~/store/purchasing';


const { $rest } = useNuxtApp();
const auth = useAuth();
const user = useAuth().user;
const router = useRouter();

onBeforeMount(() => {
  Promise.all([
    get_supplier(),
    get_evaluations()

  ])
})
definePageMeta({ layout: "std-systems" });
const evaluationStore = supplierEvaluations()
const supplierInvitationDialog = ref(false)
const supplierDialog = ref(false);
const hover = ref<number | null>(null);

const evaluation_dialog = ref(false)

interface Supplier {
  name: string;
  owner: string;
  address: string;
  nature: string;
  email: string;
  contact_number: string;
  contact_person: string;
  terms: string;
  status: string;
  accredited: number;
  products: string[];
  company_profile: Array;
  catalog: Array;
}
interface Sup {
  supplier: string;
  type: string;

}



const supplier = ref<Supplier>({
  name: "",
  owner: "",
  address: "",
  nature: "",
  email: "",
  contact_number: "",
  contact_person: "",
  terms: "",
  status: "",
  accredited: 2025,
  products: [],
  company_profile: [],
  catalog: [],
});

const sup = ref<Sup>({
  supplier: "",
  type: ""
});



const supplier_header = ref([
  { title: "Company Name", key: "name", sortable: false },
  { title: "Owner", key: "owner", sortable: false },
  { title: "Contact Person", key: "contactPerson", sortable: false },
  { title: "Nature", key: "nature", sortable: false },
  { title: "Status", key: "status", sortable: false },
  { title: "Actions", key: "actions", sortable: false, align: "center" },
])

async function create_supplier() {
  const { data, error } = await $rest('supplier/create-supplier', {
    method: "POST",
    body: { ...supplier.value }
  });
  if (error) return swal({ title: "Error", text: error, icon: "error" });
  swal({ title: "Success", text: data, icon: "success" });
  get_supplier()


}
const supplier_data = ref([])
async function get_supplier() {
  const { data } = await $rest('supplier/get-supplier', { method: "GET" });
  supplier_data.value = data;
}

const evaluations_data = ref([])
async function get_evaluations() {
  const payload = {};
  if (sup?.value?.supplier) {
    payload.supplier = sup.value.supplier;
  }
  if (sup?.value?.type) {
    payload.type = sup.value.type;
  }
  console.log("Payloadddd", payload);
  const { data } = await $rest('supplier/get-supplier-evaluations', { method: "GET", query: payload });
  evaluations_data.value = data;
}

const termsOptions = [
  '61 - 90 days (5)',
  '31 - 60 days (4)',
  '16 - 30 days (3)',
  '8 - 15 days (2)',
  '1 – 7 days (1)',
  'Cash on Delivery (1)',
  'With Downpayment / Progress Billing (1)',
  'PDC’s (1)'
];

const evaluation_criteria = ref({
  supplier: "",
  date: "",
  from: "",
  to: "",
  recommendations: "",
  criteria: [
    {
      label: 'PRODUCT QUALITY',
      rating: 0,
      remarks: ''
    },
    {
      label: 'DELIVERY',
      rating: 0,
      remarks: ''
    },
    {
      label: 'WARRANTY',
      rating: 0,
      remarks: ''
    },
    {
      label: 'RESPONSE TO COMPLAINTS',
      rating: 0,
      remarks: ''
    }
  ]
});

const menu_items = ref([
  {
    text: "Information Sheet",
    subtitle: "External Provider Information Sheet",
    value: "info-sheet",
    icon: "mdi-eye",
    action: () => router.push({ name: 'supplier-info-sheet' })
  },
  {
    text: "Qualification Form",
    subtitle: "External Provider Qualification Sheet",
    value: "qualification-form",
    icon: "mdi-printer",
    action: null
  },
  {
    text: "Performance Evaluation",
    subtitle: "Performance Evaluation Qualification Sheet",
    value: "performance-evaluation",
    icon: "mdi-printer",
    action: "open_evaluation_form"
  }
]);

// Handle the dynamic action
const handleAction = (item: any, id: any) => {
  console.log("itemsssssssssssssss", item);

  if (typeof item.action === "function") {
    item.action();
  } else if (item.action === "open_evaluation_form") {
    open_evaluation_form(id);
  }
};

const closeMenu = () => {
  // Menu closes automatically with :close-on-content-click="false"
};

function open_evaluation_form(id: any) {
  evaluation_criteria.value.supplier = id;
  evaluation_dialog.value = true;
}


async function submit_evaluation() {
  const { data, error } = await $rest('supplier/submit-evaluation', {
    method: "POST",
    body: {
      ...evaluation_criteria.value,
      date: new Date(evaluation_criteria.value.date).toISOString(),
    }
  });
  if (error) return swal({ title: "Error", text: error, icon: "error" });
  swal({ title: "Success", text: data, icon: "success" });
}


const print_result = (type: string) => {
  if (evaluations_data.value.length === 0) return swal({ text: "No data found!", icon: "error" });

  const result = evaluations_data.value;
  evaluationStore.putData(result);

  router.push({
    name: `supplier-${type}`,

  });
}



</script>

<style scoped>
.active-btn {
  text-decoration: underline;
  background-color: "blue"
}
</style>
