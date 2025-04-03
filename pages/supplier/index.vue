<template>
  <!-- <v-container fluid>

    <v-row dense>

      <v-col cols="12" md="6" sm="12">
        <h2 class="font-weight-medium text-primary">
          Master List of External Providers
        </h2>
        <small class="font-weight-thin" style="color: #B1D182;">
          Overview of external providers items and services
        </small>
      </v-col>


      <v-col cols="12" md="6" sm="12" class="d-flex">
        <v-btn @click="supplierDialog = true" variant="text" class="mr-2">
          <v-icon class="pr-3" color="#228B22">mdi-account</v-icon>
          Add External Supplier
        </v-btn>
        <v-btn @click="supplierInvitationDialog = true" variant="text">
          <v-icon class="pr-3" color="#228B22">mdi-email</v-icon>
          Invite Supplier
        </v-btn>

      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12">
        <hr class="mb-2" color="#115D33" />
      </v-col>
      <v-col cols="12" xl="2" lg="3" xs="12" sm="12" md="3">
        <v-sheet border color="#E8F5E9" height="44vh">
          <v-card-text>
            <v-row dense>
              <v-col cols="12">
                <h3 class="font-weight-medium text-primary">Filter External Providers</h3>
                <small style="color: #B1D182;">
                  Use the filters below to narrow down the external providers by Year and Status. After applying the
                  filters, you can print the filtered results.
                </small>
              </v-col>
              <v-col cols="12" class="mb-3">
                <v-select label="Year" outlined hide-details></v-select>
              </v-col>
              <v-col cols="12" class="mb-3">
                <v-select label="Status" outlined hide-details></v-select>
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
      </v-col>

      <v-col cols="12" xl="10" lg="9" xs="12" sm="12" md="9">
        <v-sheet border>
          <commons-item-container title="Suppliers" icon="mdi-note-text-outline" :items="sampleSupplier"
            :display_types="['grid', 'table']">
            <template v-slot:table="{ items }">
              <v-data-table :items="items" :headers="supplier_header">
                <template v-slot:item.actions="{ item }">
                  <v-btn density="compact" color="primary">Actions</v-btn>
                </template>
</v-data-table>
</template>
<template v-slot:item="{ value }">
              <v-card class="mx-auto reclass-item" rounded="lg" border>
                <v-card-text>
                  <div class="d-flex mt-1 flex-wrap">

                    <div>
                      <div class="w-100 text-body-1 text-primary font-weight-bold">
                        {{ value.company }}
                      </div>
                      <small>Owner: {{ value.owner }}</small><br />
                      <small>Contact Person: {{ value.contact_person }}</small><br />
                      <small>Contact Number: {{ value.contact_person_number }}</small>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </template>
</commons-item-container>
</v-sheet>
</v-col>
</v-row>
<v-row no-gutters class="mt-3">

  <v-col cols="12" xl="2" lg="3" xs="12" sm="12" md="3">
    <v-sheet border color="#E8F5E9" height="44vh">
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <h3 class="font-weight-medium text-primary">Filter Requests</h3>
            <small style="color: #B1D182;">
              Use the filters below to narrow down the external providers by Year and Status. After applying the
              filters, you can print the filtered results.
            </small>

          </v-col>
          <v-col cols="12" class="mb-3">
            <v-select label="Year" outlined hide-details></v-select>
          </v-col>
          <v-col cols="12" class="mb-3">
            <v-select label="Status" outlined hide-details></v-select>
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
  </v-col>

  <v-col cols="12" xl="10" lg="9" xs="12" sm="12" md="9">
    <v-sheet border>
      <commons-item-container title="Requests" icon="mdi-note-text-outline" :items="sampleSupplier"
        :display_types="['grid', 'table']">
        <template v-slot:table="{ items }">
              <v-data-table :items="items" :headers="supplier_header">
                <template v-slot:item.actions="{ item }">
                  <v-btn density="compact" color="primary">Actions</v-btn>
                </template>
        </v-data-table>
        </template>
        <template v-slot:item="{ value }">
              <v-card class="mx-auto reclass-item" rounded="lg" border>
                <v-card-text>
                  <div class="d-flex mt-1 flex-wrap">

                    <div>
                      <div class="w-100 text-body-1 text-primary font-weight-bold">
                        {{ value.company }}
                      </div>
                      <small>Owner: {{ value.owner }}</small><br />
                      <small>Contact Person: {{ value.contact_person }}</small><br />
                      <small>Contact Number: {{ value.contact_person_number }}</small>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </template>
      </commons-item-container>
    </v-sheet>
  </v-col>
</v-row>
</v-container> -->

  <v-sheet class="mt-4">
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
        <v-sheet width="20%" border color="#F9FBE7">
          <v-card-text class="mt-8">
            <v-row dense>
              <v-col cols="12">
                <v-select class="mb-1" label="Year" outlined hide-details></v-select>
                <v-select class="mb-1" label="Project" outlined hide-details></v-select>
                <v-select class="mb-1" label="Type" outlined hide-details></v-select>
                <v-select class="mb-1" label="Status" outlined hide-details></v-select>
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
                <v-btn block color="amber">
                  Create
                </v-btn>
              </v-col>

            </v-row></v-card-text>
        </v-sheet>
        <v-sheet border width="80%">
          <commons-item-container title="Summary of Purchase Requisition" icon="mdi-note-text-outline"
            :items="sampleSupplier" :display_types="['grid', 'table']">
            <template v-slot:table="{ items }">
              <v-sheet border>
                <v-data-table :items="items" :headers="supplier_header">
                  <template v-slot:item.actions="{ item }">
                    <v-btn density="compact" color="primary">Actions</v-btn>
                  </template>
                </v-data-table>
              </v-sheet>
            </template>
            <template v-slot:item="{ value, index, display }">

              <v-card class="mx-auto reclass-item" rounded="lg" border>

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
                      <div class="w-40 text-body-1 text-primary font-weight-bold d-flex">
                        {{ value.company }}
                      </div>
                      <small> Owner : {{ value.owner }}</small> <br />
                      <small> Contact Person : {{ value.contact_person }}</small> <br />
                      <small> Contact Number : {{ value.contact_person_number }}</small>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </template>
          </commons-item-container>
        </v-sheet>
      </v-col>
      <v-col cols="12" class="d-flex">
        <v-sheet width="20%" border color="#E8F5E9">
          <v-card-text class="mt-8">
            <v-row dense>
              <v-col cols="12" class="mb-3">
                <v-select label="Year" outlined hide-details></v-select>
              </v-col>
              <v-col cols="12" class="mb-3">
                <v-select label="Status" outlined hide-details></v-select>
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
        <v-sheet border width="80%">
          <commons-item-container title="Suppliers" icon="mdi-note-text-outline" :items="sampleSupplier"
            :display_types="['grid', 'table']">
            <template v-slot:table="{ items }">
              <v-sheet border>
                <v-data-table :items="items" :headers="supplier_header">
                  <template v-slot:item.actions="{ item }">
                    <v-btn density="compact" color="primary">Actions</v-btn>
                  </template>
                </v-data-table>
              </v-sheet>
            </template>
            <template v-slot:item="{ value, index, display }">

              <v-card class="mx-auto reclass-item" rounded="lg" border>

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
                      <div class="w-40 text-body-1 text-primary font-weight-bold d-flex">
                        {{ value.company }}
                      </div>
                      <small> Owner : {{ value.owner }}</small> <br />
                      <small> Contact Person : {{ value.contact_person }}</small> <br />
                      <small> Contact Number : {{ value.contact_person_number }}</small>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </template>
          </commons-item-container>

        </v-sheet>
      </v-col>


    </v-row>


    <v-dialog v-model="supplierDialog" max-width="600">
      <v-card>
        <v-card-title> Supplier Information Sheet</v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="6">
              <v-text-field label="Company Name*" v-model="supplier.company" required />
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
              <v-text-field label="Contact Number*" v-model="supplier.number" required />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field label="Contact Person*" v-model="supplier.contact_person" required />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field label="Contact Person Number*" v-model="supplier.contact_person_number" required />
            </v-col>

            <v-col cols="12">
              <v-autocomplete label="Products/Services" v-model="supplier.products" multiple></v-autocomplete>
            </v-col>

            <v-col cols="12" md="6">
              <v-file-input label="Company Profile" v-model="supplier.company_profile" show-size></v-file-input>
            </v-col>

            <v-col cols="12" md="6">
              <v-file-input label="Product Catalog" v-model="supplier.product_catalog" show-size></v-file-input>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain"></v-btn>
          <v-btn color="primary" text="Save" variant="tonal"></v-btn>
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


definePageMeta({ layout: "std-systems" });
const supplierInvitationDialog = ref(false)
const supplierDialog = ref(false);



interface Supplier {
  company: string;
  owner: string;
  address: string;
  nature: string;
  email: string;
  number: string;
  contact_person: string;
  contact_person_number: string;
  products: string[];
  company_profile: string;
  product_catalog: string;
}



const supplier = ref<Supplier>({
  company: "",
  owner: "",
  address: "",
  nature: "",
  email: "",
  number: "",
  contact_person: "",
  contact_person_number: "",
  products: [],
  company_profile: "",
  product_catalog: "",
});

const sampleSupplier = ref([
  {
    company: "Southern Convergence",
    owner: "Marianne Mae Paclian",
    address: "Antipolo",
    nature: "Service",
    contact_person: "098776654335"
  }
])


const supplier_header = ref([
  { title: "Company Name", key: "company", sortable: false },
  { title: "Owner", key: "owner", sortable: false },
  { title: "Contact Person", key: "contactPerson", sortable: false },
  { title: "Nature", key: "nature", sortable: false },
  { title: "Status", key: "status", sortable: false },
  { title: "Actions", key: "actions", sortable: false, align: "center" },
])

</script>

<style scoped>
.active-btn {
  text-decoration: underline;
  background-color: "blue"
}
</style>