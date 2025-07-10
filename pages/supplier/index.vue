<template>

  <v-sheet class="ma-4">
    <v-toolbar flat class="py-2" color="transparent">
      <template v-slot:title>
        <v-row dense>
          <v-col cols="12">
            <h2 class="font-weight-medium text-primary">Master List of External Providers</h2>
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
      <v-btn @click="supplierDialog = true" text>
        <v-icon class="pr-3" color="#228B22">mdi-account</v-icon>
        Add External Supplier
      </v-btn>
      <v-btn @click="supplierInvitationDialog = true" text>
        <v-icon class="pr-3" color="#228B22">mdi-email</v-icon>
        Invite Supplier
      </v-btn>
    </v-toolbar>
    <hr class="mb-2" color="#115D33" />
    <v-row dense>
      <v-col cols="12" class="d-flex">
        <v-sheet width="20%" border color="#F9FBE7" min-height="80vh">
          <v-card-text class="mt-8">
            <v-row dense>

              <v-col cols="12"> <v-select v-model="sup.supplier" label="Supplier" :items="supplier_data"
                  item-title="name" item-value="_id" density="compact" variant="outlined" hide-details /></v-col>
              <v-col cols="12" class="mb-3">
                <v-select label="Request type" v-model="sup.type" :items="menu_items" item-title="text"
                  item-value="value" density="compact" variant="outlined" hide-details />
              </v-col>
              <v-col cols="12">
                <v-btn block color="success" class="white--text" @click="get_evaluations()">
                  Filter
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn @click="print_result(sup.type)" block color="blue darken-4" class="white--text">
                  Print
                </v-btn>
              </v-col>

            </v-row>
          </v-card-text>
        </v-sheet>
        <v-sheet border width="80%" height="80vh">
          <commons-sms title="Suppliers" icon="mdi-note-text-outline" :items="supplier_data"
            :display_types="['grid', 'table']">
            <template v-slot:table="{ items }">
              <v-sheet border>
                <v-data-table :items="supplier_data" :headers="supplier_header">
                  <template v-slot:item.actions="{ item }">
                    <v-btn density="compact" color="primary">Actions</v-btn>
                  </template>
                </v-data-table>
              </v-sheet>
            </template>
            <template v-slot:item="{ value, index, display }">
              <v-card class="mx-auto" rounded="lg" color="primary" variant="tonal">
                <v-card-text>
                  <v-row no-gutters>


                    <v-col cols="12"> Status : <b> {{ value.status ? value.status : 'Nominated'
                        }}</b></v-col>

                    <v-col cols="12"> Owner: <b>{{ value.owner }}</b></v-col>
                    <v-col cols="12"> <v-divider class="my-2"></v-divider> </v-col>

                    <v-col cols="12" class="text-uppercase"> <v-icon class="mr-2 text-amber">mdi-cart</v-icon>
                      {{ value.name }}
                    </v-col>
                    <v-col cols="12"> <v-icon class="mr-2 text-blue">mdi-map-marker</v-icon> {{ value.address }}</v-col>
                    <v-col cols="12" class="d-flex align-center justify-space-between">
                      <div class="d-flex align-center">
                        <v-icon class="mr-2 text-red">mdi-email</v-icon> <i class="text-blue">{{ value.email }}</i>
                      </div>

                      <v-menu :close-on-content-click="false" location="end">
                        <template v-slot:activator="{ props }">
                          <v-btn v-bind="props" density="compact" color="primary">Manage</v-btn>
                        </template>
                        <v-card min-width="300">
                          <v-list>
                            <v-list-item title="Supplier">
                              <template v-slot:append>
                                <v-icon color="green darken-4" size="24">mdi-cart</v-icon>
                              </template>
                            </v-list-item>
                          </v-list>
                          <v-divider></v-divider>
                          <v-list lines="two" class="elevation-1" density="compact">
                            <v-list-item v-for="item in menu_items" :key="item.value" :title="item.text"
                              :subtitle="item.subtitle" @click="handleAction(item, value._id)">
                              <template v-slot:prepend>
                                <v-icon color="primary" size="22">{{ item.icon }}</v-icon>
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


    <v-dialog v-model="supplierDialog" max-width="600">
      <v-card>
        <v-card-title> Supplier Information Sheet</v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field label="Company Name*" v-model="supplier.name" hide-details />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field label="Owner*" v-model="supplier.owner" hide-details />
            </v-col>

            <v-col cols="12">
              <v-text-field label="Address*" v-model="supplier.address" hide-details />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field label="Nature of Business*" v-model="supplier.nature" hide-details />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field label="Email*" v-model="supplier.email" type="email" hide-details />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field label="Contact Number*" v-model="supplier.contact_number" hide-details />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field label="Contact Person*" v-model="supplier.contact_person" required />
            </v-col>

            <v-col cols="12" md="6">
              <v-combobox label="Terms of Payment*" v-model="supplier.terms" :items="termsOptions" hide-details />
            </v-col>

            <v-col cols="12" md="6">
              <v-combobox label="Status*" v-model="supplier.status" :items="['Nominated', 'Qualified', 'Outsource']"
                hide-details />
            </v-col>

            <v-col cols="12" md="6">
              <v-combobox label="Year Accredited" v-model="supplier.accredited" required :items="[2025, 2024]" />
            </v-col>

            <v-col cols="12">
              <v-combobox label="Products/Services" v-model="supplier.products" :items="['Metal',
                'Electrical',
                'Paints',
                'Plumbing',
                'Construction Materials',
                'Tools',
                'Heavy Equipment',
                'Insulation',
                'HVAC',
                'Landscaping']" multiple chips />
            </v-col>

            <v-col cols="12" md="6">
              <v-file-input label="Company Profile" v-model="supplier.company_profile" show-size></v-file-input>
            </v-col>

            <v-col cols="12" md="6">
              <v-file-input label="Product Catalog" v-model="supplier.catalog" show-size></v-file-input>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain"></v-btn>
          <v-btn color="primary" @click="create_supplier" text="Save" variant="tonal"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="supplierInvitationDialog" max-width="450">
      <v-card title="Supplier Invitation Form" subtitle="Suppliers receives an email to complete information sheet.">
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="12">
              <v-text-field label="Supplier Email" required />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>

          <v-btn block color="primary" variant="default"> Send Invitation</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <commons-dialog v-model="evaluation_dialog" max-width="40%" icon="mdi-school"
      title="External Provider Evaluation Form" submitText="Submit" @submit="submit_evaluation">
      <v-card-text style="max-height: 70vh; overflow-y: auto;">

        <v-row dense>
          <v-col cols="12">
            <v-text-field label="Date" v-model="evaluation_criteria.date" hide-details type="date" />
          </v-col>
          <v-col cols="6">
            <v-text-field label="From" v-model="evaluation_criteria.from" hide-details type="month" />
          </v-col>
          <v-col cols="6">
            <v-text-field label="To" v-model="evaluation_criteria.to" hide-details type="month" />
          </v-col>
          <v-col cols="12">
            <v-card class="pa-2" variant="outlined" color="grey">
              <v-row dense>
                <v-col cols="5" class="font-weight-bold text-primary"> <v-icon class="mr-2"
                    color="primary">mdi-clipboard-text-outline</v-icon>CRITERIA</v-col>
                <v-col cols="7" class="text-center font-weight-bold">
                  <v-row no-gutters>
                    <v-col cols="2" class="text-end  text-primary">5</v-col>
                    <v-col cols="2" class="text-end  text-primary">4</v-col>
                    <v-col cols="2" class="text-end  text-primary">3</v-col>
                    <v-col cols="2" class="text-end  text-primary">2</v-col>
                    <v-col cols="2" class="text-end  text-primary">1</v-col>
                    <v-col cols="2"></v-col>
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
                      <v-row no-gutters>

                        <v-radio-group v-model="item.rating" class="d-flex" inline>
                          <v-radio class="px-2" :value="5" color="primary" />
                          <v-radio class="px-2" :value="4" color="primary" />
                          <v-radio class="px-2" :value="3" color="primary" />
                          <v-radio class="px-2" :value="2" color="primary" />
                          <v-radio class="px-2" :value="1" color="primary" />
                        </v-radio-group> </v-row>
                    </v-col>
                  </v-row>
                  <v-textarea v-model="item.remarks" label="Remarks, if any" rows="2" auto-grow variant="outlined"
                    class="mt-2" />
                </v-card-text>
              </v-card>

            </v-card>
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="evaluation_criteria.recommendations" label="Recommendation/s" rows="3" auto-grow
              variant="outlined" />
          </v-col>
        </v-row>
      </v-card-text>
    </commons-dialog>

  </v-sheet>
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