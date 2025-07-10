<template>
  <div>

    <body class="printable-page">
      <div class="pa-2 pt-5">
        <v-sheet class="mx-5">

          <!-- Header -->
          <div style="display: flex; align-items: stretch;">
            <div
              style="width: 30%; text-align: right; border: 2px solid black; display: flex; align-items: center; justify-content: center;">
              <v-img class="px-2" src="/hawkstow.png" />
            </div>
            <div
              style="width: 70%; font-size: 24px; font-weight: bold; text-align: left; border: 2px solid black; padding: 30px;"
              class="text-uppercase text-center">
              Masterlist of Equipment/Measuring Equipment
            </div>
          </div>

          <div class="py-2">Updated as of :</div>

          <!-- Table -->
          <table>
            <thead>
              <tr>
                <th width="2%" rowspan="2">No</th>
                <th width="15%" rowspan="2">Equipment</th>
                <th width="5%" rowspan="2">Date Acquired</th>
                <th width="5%" rowspan="2">ID Number</th>
                <th width="10%" rowspan="2">Location</th>
                <th width="20%" colspan="6">Frequency of Preventive Maintenance</th>
              </tr>
              <tr>
                <th>Daily</th>
                <th>Weekly</th>
                <th>Monthly</th>
                <th>Quarterly</th>
                <th>Semi-Annual</th>
                <th>Annual</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="row in 15" :key="row">
                <td class="empty-row"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>

          <!-- Signatures -->
          <table class="mt-5">
            <tbody>
              <tr>
                <td class="pt-5">Prepared by:</td>
                <td class="pt-5">Checked by:</td>
              </tr>
              <tr>
                <td class="text-center">Signature over Printed Name/Date</td>
                <td class="text-center">Signature over Printed Name/Date</td>
              </tr>
            </tbody>
          </table>

          <!-- Fixed Footer -->
          <div class="footer">
            <div>Doc. Ref: HCD-QF-MOT-002</div>
            <div style="text-align: center;">Revision No.: 00</div>
            <div style="text-align: right;">Effectivity Date: November 04, 2022</div>
          </div>
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
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

function print() {
  window.print();
}
</script>

<style scoped>
.printable-page {
  position: relative;
  width: 297mm;
  height: 210mm;
  margin: 0 auto;
  box-shadow: 0 0.5mm 2mm rgba(0, 0, 0, 0.3);
  background: white;
  overflow: hidden;
  page-break-after: always;
}

* {
  font-size: 13px;
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
  padding: 3px;
  font-size: 12px;
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
    width: 297mm;
    height: 210mm;
    box-shadow: none;
  }

  .d-print-none {
    display: none !important;
  }
}
</style>
