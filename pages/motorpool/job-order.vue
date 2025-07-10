<template>
  <div>

    <body class="printable-page">
      <div class="pa-2 pt-5">
        <v-sheet class="mx-5">

          <!-- Header -->
          <div style="display: flex; align-items: stretch;">
            <div
              style="width: 40%; text-align: right; border: 1px solid black; display: flex; align-items: center; justify-content: center;">
              <v-img class="px-2" src="/hawkstow.png" />
            </div>
            <div
              style="width: 60%; font-size: 28px; font-weight: bold; text-align: left; border: 1px solid black; padding: 20px;"
              class="text-uppercase text-center">
              Job Order


            </div>
          </div>



          <!-- Table -->

          <table class="mt-3">
            <thead>
              <tr>
                <th width="20%">Job Order No.</th>
                <th width="2%">:</th>
                <th width="20%"></th>
                <th width="20%">Date</th>
                <th width="2%">:</th>
                <th width="20%"></th>
              </tr>
              <tr>
                <th>Department/Site</th>
                <th>:</th>
                <th></th>
                <th>Equipment/Plate No.</th>
                <th>:</th>
                <th></th>
              </tr>
              <tr>
                <th>Driver’s Name</th>
                <th>:</th>
                <th></th>
                <th>Project Manager/Engineer</th>
                <th>:</th>
                <th></th>
              </tr>
              <tr>
                <th colspan="6">
                  <div style="height: 10vh;">Problems Encountered:</div>
                </th>
              </tr>
              <tr>
                <th colspan="3" class="pb-3"> Inspected by:</th>
                <th colspan="3" class="pb-3"> Estimated Day(s) for Repair:</th>

              </tr>
              <tr style="border-bottom: 2px solid black; border-top: 2px solid black;">
                <th colspan="6">
                  <div style="height: 10vh;">Details of Work Done:
                  </div>
                </th>
              </tr>
              <tr style="border-top: 2px solid black;">
                <th colspan="3" rowspan="2" style="text-align: left; vertical-align: top;">Conducted by:</th>

                <th colspan="2" class="pb-3"> Date Started: </th>
                <th colspan="2" class="pb-3"> Date Completed</th>
              </tr>
              <tr>
                <th colspan="2" class="pb-3"> Time Started: </th>
                <th colspan="2" class="pb-3"> Time Completed</th>
              </tr>
              <tr>
                <th colspan="3" class="pb-3"> Inspected by:</th>
                <th colspan="3" class="pb-3"> Date: </th>
              </tr>
              <tr style="border-top: 2px solid black;">
                <th colspan="6" class="font-weight-bold my-0 py-0"> Material/Spare Part Requirements:
                </th>
              </tr>

              <tr>
                <th colspan="3" class="text-center">Materials</th>
                <th class="text-center">Qty</th>
                <th colspan="2" class="text-center">Request No.</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="row in 8" :key="row">
                <td colspan="3" class="empty-row"></td>
                <td class="empty-row"> </td>
                <td colspan="2" class="empty-row"></td>
              </tr>
              <tr style="border-top: 2px solid black;">
                <td colspan="6" class="pb-3"> Trial Run/Turn-over:</td>
              </tr>
              <tr>
                <td colspan="3" class="pb-3"> Conducted by:</td>
                <td colspan="3" class="pb-3"> Date:</td>
              </tr>
              <tr>
                <td colspan="6">
                  <div style="height: 10vh;">Results:
                  </div>
                </td>
              </tr>
              <tr>
                <td colspan="3" class="pb-3"> Accepted by:</td>
                <td colspan="3" class="pb-3"> Date:</td>
              </tr>
            </tbody>

          </table>




          <!-- Fixed Footer -->
          <div class="footer">
            <div>Doc. Ref: HCD-QF-MOT-005 </div>
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
  font-size: 13px;
  line-height: normal;
  word-break: break-word;
  font-weight: normal;
  text-align: start;
}

/* tr,
th {
  font-weight: bold;
} */

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
