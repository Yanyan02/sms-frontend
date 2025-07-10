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
              Equipment History Record

            </div>
          </div>

          <div class="py-2">Updated as of :</div>

          <!-- Table -->
          <table class="mb-3">
            <tr>
              <th width="5%" class="text-start">EQUIPMENT NAME:
              </th>
              <th width="15%"></th>
            </tr>
            <tr>
              <th width="5%" class="text-start">EQUIPMENT ID:
              </th>
              <th width="15%"></th>
            </tr>
            <tr>
              <th width="5%" class="text-start">LOCATION:
              </th>
              <th width="15%"></th>
            </tr>
          </table>

          <table>
            <tr style="border-bottom: 2px solid black;">
              <th class="text-center pt-3" colspan="3">BASIC INFORMATION
              </th>

            </tr>
            <tr>
              <th width="30%" class="text-start pb-5"> Make:</th>
              <th width="30%" class="text-start pb-5">Serial No.</th>
              <th width="30%" class="text-start pb-5">Brand :</th>
            </tr>
            <tr>
              <th width="30%" class="text-start pb-5">Model :</th>
              <th width="30%" class="text-start pb-5">Date Purchased/Reference: </th>
              <th width="30%" class="text-start pb-5">Supplier :</th>
            </tr>
            <tr>
              <th class="text-start pb-5" colspan="3">Other information:

              </th>

            </tr>
          </table>

          <table>
            <thead>
              <tr style="border-bottom: 2px solid black;">
                <td colspan="5" class="text-center font-weight-bold pt-3">
                  HISTORY RECORD

                </td>
              </tr>
              <tr>
                <th width="2%">Date</th>
                <th width="15%">Job Request #</th>
                <th width="5%">Repaired by</th>
                <th width="5%">Parts Used</th>
                <th width="10%">Remarks</th>

              </tr>

            </thead>

            <tbody style="border-bottom: 2px solid black;">
              <tr v-for="row in 25" :key="row">
                <td class="empty-row"></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
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
