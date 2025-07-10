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
              Daily Equipment Utilization Report


            </div>
          </div>

          <div class="py-2">Updated as of :</div>

          <!-- Table -->
          <table class="mb-3">
            <tr>
              <td class="text-start" width="10%">Equipment:</td>
              <td width="16.66%"></td>
              <td class="text-start" width="10%">Operator:</td>
              <td width="16.66%"></td>
              <td class="text-start" width="10%">Date:</td>
              <td width="16.66%"></td>
            </tr>
            <tr>
              <td class="text-start" width="10%">Project:</td>
              <td width="16.66%"></td>
              <td class="text-start" width="10%">Shift:</td>
              <td width="16.66%"></td>
              <td class="text-start" width="10%">Day:</td>
              <td width="16.66%"></td>
            </tr>


          </table>

          <table>
            <thead>
              <tr>
                <th colspan="2">Regular Hours</th>
                <th colspan="2">Overtime</th>
                <th rowspan="2">Remarks</th>
                <th rowspan="2">Location / Area of Work</th>
                <th rowspan="2">Description of Work Done</th>
              </tr>
              <tr>
                <th>IN</th>
                <th>OUT</th>
                <th>IN</th>
                <th>OUT</th>
              </tr>
            </thead>

            <tbody style="border-bottom: 2px solid black;">
              <tr v-for="row in 25" :key="row">
                <td class="empty-row"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>

          <table class="mt-4">
            <thead>
              <tr>
                <td class="text-start"> Prepared by: </td>
                <td class="text-start"> Checked by: </td>
                <td class="text-start"> Approved by: </td>
              </tr>
              <tr>
                <td class="empty-row"> </td>
                <td></td>
                <td> </td>
              </tr>
              <tr>
                <td class="text-start"> Signature over Printed Name/Position </td>
                <td class="text-start"> Signature over Printed Name/Position </td>
                <td class="text-start"> Signature over Printed Name/Position </td>
              </tr>
            </thead>
          </table>




          <!-- Fixed Footer -->
          <div class="footer">
            <div>Doc. Ref: HCD-QF-MOT-007 </div>
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
  font-weight: normal;
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
