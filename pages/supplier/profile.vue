<template>
  <v-cointainer>
    <v-row dense class="align-center">
      <!-- Left Section -->
      <v-col cols="12" md="4">
        <v-card elevation="1">
          <v-card-text>
            <v-row no-gutters>
              <v-col cols="12" class="mb-3">
                <v-select label="Year" outlined hide-details></v-select>
              </v-col>
              <v-col cols="12" class="mb-3">
                <v-select label="Type" outlined hide-details></v-select>
              </v-col>
              <v-col cols="12">
                <v-btn block color="success" class="white--text">
                  Filter
                </v-btn>
              </v-col>
            </v-row></v-card-text>
        </v-card>
      </v-col>
      <!-- Right Section -->
      <v-col cols="12" md="8">
        <v-card elevation="1">

          <v-card-text>
            <v-row dense>
              <v-col cols="10" class="font-weight-bold">
                <v-icon color="green darken-4" class="mr-2">mdi-office-building</v-icon>
                Southern Convergence Technologies
              </v-col>
              <v-col cols="2"> <v-chip color="success"> QUALIFIED</v-chip></v-col>
              <v-col cols="12">
                <hr>
              </v-col>
              <v-col cols="12" class="mb-2">
                <v-icon small color="grey darken-2" class="mr-2">mdi-map-marker</v-icon>
                <small class="grey--text">Address: Antipolo, Rizal</small>
                <br />
                <v-icon small color="grey darken-2" class="mr-2">mdi-account</v-icon>
                <small class="grey--text">Owner: Marianne Mae Paclian</small>
              </v-col>
              <v-col cols="12" class="mb-2">
                <v-icon small color="grey darken-2" class="mr-2">mdi-account-box</v-icon>
                <small class="grey--text">Contact Person: </small>
                <br />
                <v-icon small color="grey darken-2" class="mr-2">mdi-phone</v-icon>
                <small class="grey--text">Number: </small>
              </v-col>
            </v-row>
          </v-card-text>

        </v-card>


      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="auto">
        <v-btn block color="#1B5E20" variant="text" density="compact" class="d-flex align-center">
          <v-icon left class="mr-2">mdi-file-check</v-icon>
          Evaluation Form
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn block color="#1B5E20" variant="text" density="compact" class="d-flex align-center">
          <v-icon left class="mr-2">mdi-account-check</v-icon>
          Qualification Form
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn block color="#1B5E20" variant="text" density="compact" class="d-flex align-center">
          <v-icon left class="mr-2">mdi-cart-outline</v-icon>
          Add Product Catalog
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn block color="#1B5E20" variant="text" density="compact" class="d-flex align-center">
          <v-icon left class="mr-2">mdi-office-building</v-icon>
          Add Company Profile
        </v-btn>
      </v-col>
      <v-spacer />
      <v-col cols="auto">
        <v-btn block color="#1B5E20" variant="text" density="compact" class="d-flex align-center">
          <v-icon left class="mr-2">mdi-eye</v-icon>
          View Waiver
        </v-btn>
      </v-col>
    </v-row>
    <hr class="my-2" />
    <v-row dense justify="end">
      <v-col cols="12">
        <commons-item-container title="External Provider Records" icon="mdi-note-text-outline"
          :display_types="['grid', 'table']">
          <template v-slot:table="{ items }">
            <v-sheet border>
              <v-data-table>

              </v-data-table>
            </v-sheet>
          </template>
          <template v-slot:item="{ value, index, display }">
            <v-card class="mx-auto reclass-item" rounded="lg" border>
              <v-card-text>
                <div class="d-flex mt-1">

                </div>
              </v-card-text>
            </v-card>
          </template>
        </commons-item-container>
      </v-col>
      <v-col cols="12">
        <commons-item-container title="External Provider Products and Services" icon="mdi-note-text-outline"
          :display_types="['grid', 'table']">
          <template v-slot:table="{ items }">
            <v-sheet border>
              <v-data-table>

              </v-data-table>
            </v-sheet>
          </template>
          <template v-slot:item="{ value, index, display }">
            <v-card class="mx-auto reclass-item" rounded="lg" border>
              <v-card-text>
                <div class="d-flex mt-1">

                </div>
              </v-card-text>
            </v-card>
          </template>
        </commons-item-container>
      </v-col>
    </v-row>
  </v-cointainer>
</template>
<script lang="ts" setup>
import useAuth from "~/store/auth";

const { $rest } = useNuxtApp();
const auth = useAuth();
const user = useAuth().user;


definePageMeta({ layout: "barren" }); 
</script>