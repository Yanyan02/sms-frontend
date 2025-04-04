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
              <v-col cols="12" class="mb-3">
                <v-select label="Year" outlined hide-details></v-select>
              </v-col>
              <v-col cols="12" class="mb-3">
                <v-select label="Status" outlined hide-details></v-select>
              </v-col>
              <v-col cols="12" class="mb-3">
                <v-select label="Type" outlined hide-details></v-select>
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

              <v-card class="mx-auto reclass-item" rounded="lg" variant="tonal" color="primary">
                <v-card-text>
                  <div class="d-flex mt-1">
                    <div class="pr-3">
                      <v-img :width="80" aspect-ratio="4/3" cover>
                        <v-avatar v-bind="$attrs" class="ml-2" color="primary" style="cursor: pointer" size="62">
                          <span class="text-h6">{{ value.owner.charAt(0) }}</span>
                        </v-avatar>
                      </v-img>
                    </div>
                    <div>
                      <div class="w-40 text-body-1 text-primary font-weight-bold text-uppercase d-flex">
                        {{ value.name }}
                      </div>
                      <span> Address : {{ value.address }}</span> <br />
                      <span> Owner : {{ value.owner }}</span> <br />

                      <span> Contact Person : {{ value.contact_person }}</span> <br />
                      <span> Contact Number : {{ value.contact_number }}</span> <br />
                      <v-menu :close-on-content-click="false" location="end">
                        <template v-slot:activator="{ props }">
                          <v-btn v-bind="props" density="compact" color="primary">Manage</v-btn>
                        </template>
                        <v-card min-width="300">
                          <v-list>
                            <v-list-item title="Manage Supplier">
                              <template v-slot:append>
                                <v-icon color="green darken-4" size="24">mdi-truck</v-icon>
                              </template>
                            </v-list-item>
                          </v-list>
                          <v-divider></v-divider>
                          <v-list lines="two" class="elevation-1" density="compact">
                            <v-list-item title="Information Sheet" subtitle="External Provider Information Sheet">
                              <template v-slot:prepend>
                                <v-icon color="primary" size="22">mdi-eye</v-icon>
                              </template>
                            </v-list-item>
                            <v-list-item title="Qualification Form" subtitle="External Provider Qualification Sheet">
                              <template v-slot:prepend>
                                <v-icon color="primary" size="22">mdi-printer</v-icon>
                              </template>
                            </v-list-item>
                            <v-list-item title="Performance Evaluation" subtitle="Performance Evaluation Qualification
                              Sheet">
                              <template v-slot:prepend>
                                <v-icon color="primary" size="22">mdi-printer</v-icon>
                              </template>
                            </v-list-item>

                          </v-list>
                          <v-card-actions>
                            <v-spacer />
                            <v-btn variant="text" color="error">Close</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-menu>
                    </div>
                  </div>
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
              <v-text-field label="Company Name*" v-model="supplier.name" required />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field label="Owner*" v-model="supplier.owner" required />
            </v-col>

            <v-col cols="12">
              <v-text-field label="Address*" v-model="supplier.address" required />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field label="Nature of Business*" v-model="supplier.nature" required />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field label="Email*" v-model="supplier.email" type="email" required />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field label="Contact Number*" v-model="supplier.contact_number" required />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field label="Contact Person*" v-model="supplier.contact_person" required />
            </v-col>


            <v-col cols="12">
              <v-autocomplete label="Products/Services" v-model="supplier.products" multiple></v-autocomplete>
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


  </v-sheet>
</template>


<script lang="ts" setup>
import useAuth from "~/store/auth";

const { $rest } = useNuxtApp();
const auth = useAuth();
const user = useAuth().user;

onBeforeMount(() => {
  Promise.all([
    get_supplier(),

  ])
})
definePageMeta({ layout: "std-systems" });
const supplierInvitationDialog = ref(false)
const supplierDialog = ref(false);



interface Supplier {
  name: string;
  owner: string;
  address: string;
  nature: string;
  email: string;
  contact_number: string;
  contact_person: string;
  products: string[];
  company_profile: Array;
  catalog: Array;
}



const supplier = ref<Supplier>({
  name: "",
  owner: "",
  address: "",
  nature: "",
  email: "",
  contact_number: "",
  contact_person: "",
  products: [],
  company_profile: [],
  catalog: [],
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
</script>

<style scoped>
.active-btn {
  text-decoration: underline;
  background-color: "blue"
}
</style>