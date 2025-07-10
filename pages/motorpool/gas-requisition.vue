<template>
  <div>


    <body class="printable-page" v-for="(gas, index) in purchaseData" :key="index">
      <div class="pa-2 pt-5" v-for="g in 2" :key="g">
        <v-sheet class="mx-5" height="50%">
          <div style="display: flex; align-items: stretch;">
            <div
              style="width: 30%; text-align: right; border: 2px solid black; display: flex; align-items: center; justify-content: center;">
              <v-img class="px-2" src="/hawkstow.png" />
            </div>
            <div
              style="width: 70%; font-size: 25px; font-weight: bold; text-align: left; border: 2px solid black; padding: 30px;"
              class="text-uppercase text-center">
              DIESEL & GASOLINE REQUISITION SLIP
            </div>
          </div>

          <v-row no-gutters justify="end">
            <v-col cols="2" class="text-end pr-1 font-weight-bold"> ROS NO. </v-col>
            <v-col cols="3"> : <input type="text"
                style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled></v-col>
          </v-row>


          <v-row no-gutters class="mb-2">
            <v-col cols="2" class="font-weight-bold">VEHICLE :</v-col>
            <v-col cols="10">
              <input :value="`${gas.vehicle.name} ${gas.vehicle.brand} ${gas.vehicle.id} `" type="text"
                style="width: 100%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled />
            </v-col>

            <v-col cols="2" class="font-weight-bold">PROJECT :</v-col>
            <v-col cols="10">
              <input :value="gas.project.name" type="text"
                style="width: 100%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled />
            </v-col>
          </v-row>

          <table>
            <thead>
              <tr>
                <th> Item no.</th>
                <th> Description</th>
                <th>Liters</th>
                <th>U/Cost</th>
                <th>T/Amount</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(des, index) in gas.gas" :key="des">
                <td class="empty-row text-center">{{ index + 1 }}</td>
                <td class="empty-row"> {{ des.desc }}</td>
                <td class="empty-row text-center"> {{ des.liters }}</td>
                <td class="empty-row text-center">{{ des.cost }}</td>
                <td class="empty-row text-center"> {{ des.cost * des.liters }}</td>
                <td class="empty-row"> {{ des.remarks }}</td>
              </tr>
              <tr v-for="n in 5 - gas.gas.length" :key="'empty-' + n">
                <td>&nbsp;</td>
                <td></td>
                <td class="text-center"></td>
                <td class="text-center"></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>

          </table>

          <v-row no-gutters class="my-2">
            <v-col cols="1">Reason :</v-col>
            <v-col cols="11">
              <input :value="gas.reason" type="text"
                style="width: 100%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled />
            </v-col>


          </v-row>
          <v-row>
            <v-col cols="1">
              Date :
            </v-col>
            <v-col cols="4"> <input :value="formatDate(gas.date)" type="text"
                style="width: 100%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled /></v-col>
            <v-col cols="1"></v-col>
            <v-col cols="2">
              Received by :
            </v-col>
            <v-col cols="4"> <input type="text"
                style="width: 100%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled />
              <p class="text-center">Print Name & Sign</p>
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="2">
              Prepared by :
            </v-col>
            <v-col cols="4"> <input type="text"
                style="width: 100%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled /></v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="2">
              Approved by :
            </v-col>
            <v-col cols="4"> <input type="text"
                style="width: 100%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled /></v-col>
          </v-row>
          <v-row>
            <v-col cols="4" class="text-left text-caption">
              Doc. Ref: HCD-QF-MOT-011
            </v-col>
            <v-col cols="4" class="text-center text-caption">
              Revision No.: 00
            </v-col>
            <v-col cols="4" class="text-right text-caption">
              Effectivity Date: November 04, 2022
            </v-col>
          </v-row>
        </v-sheet>
      </div>
    </body>

    <!-- Print & Back Buttons -->
    <div style="position: fixed; bottom: 20px; right: 20px;" class="d-print-none">
      <v-btn color="primary" icon="mdi-printer" size="large" class="mb-2" @click="print()" />
      <br />
      <v-btn icon="mdi-keyboard-return" size="large" @click="$router.back()" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();

import useAuth from "~/store/auth";
import { usePurchaseOrder } from "~/store/purchasing";
const { $rest } = useNuxtApp();
const purchasingStore = usePurchaseOrder()
const route = useRoute();

const items = purchasingStore.items
const purchaseData = computed(() => {
  return items;
});
function print() {
  window.print();
}
function formatDate(date: any) {
  return new Date(date).toLocaleDateString()
}
</script>

<style scoped>
.printable-page {
  position: relative;
  width: 210mm;
  height: 297mm;
  margin: 0 auto;
  box-shadow: 0 0.5mm 2mm rgba(0, 0, 0, 0.3);
  background: white;
  overflow: hidden;
  page-break-after: always;
}

* {
  font-size: 14px;
}

table {
  font-family: Arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  border: 1px solid black;
}

td,
th {
  border: 1px solid black;
  padding: 5px;
  font-size: 14px;
  line-height: normal;
  word-break: break-word;
  font-weight: normal;
}

tr,
th {
  font-weight: bold;
}

.empty-row {
  height: 22.5px;
}

.footer {
  position: absolute;
  bottom: 10mm;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 11px;
}

@media print {
  body {
    margin: 0;
  }

  .printable-page {
    width: 210mm;
    height: 297mm;
    box-shadow: none;
  }

  .d-print-none {
    display: none !important;
  }
}
</style>
