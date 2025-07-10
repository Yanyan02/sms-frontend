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
              style="width: 70%; font-size: 28px; font-weight: bold; text-align: left; border: 2px solid black; padding: 30px;"
              class="text-uppercase text-center">
              ANNUAL CALIBRATION PLAN
            </div>
          </div>


          <div style="display: flex; align-items: center; margin-top: 2mm;">
            <div style="width: 5%; font-weight: bold;">YEAR</div>
            <div style="width: 10%; display: flex; align-items: center;">
              : <input type="text" style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                disabled>
            </div>
          </div>
          <!-- Table -->
          <table class="mt-2">
            <thead>
              <tr>
                <th>Instrument Name </th>
                <th>Instrument ID</th>
                <th>Issued to</th>
                <th>Frequency of <br /> External Calibration
                </th>
                <th>Jan</th>
                <th>Feb</th>
                <th>Mar</th>
                <th>Apr</th>
                <th>May</th>
                <th>Jun</th>
                <th>Jul</th>
                <th>Aug</th>
                <th>Sep</th>
                <th>Oct</th>
                <th>Nov</th>
                <th>Dec</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="row in 12" :key="10">
                <td v-for="d in 16" :key="d" class="empty-row"></td>
              </tr>
            </tbody>

          </table>
          <v-row no-gutters>
            <v-col cols="auto">NOTE :</v-col>
            <v-col cols="11" class="pl-2"> Write the planned date of calibration in the upper row; the actual date of
              calibration
              must be written below. <br />Frequency may be SEMI-ANNUAL, or ANNUAL</v-col>
          </v-row>


          <v-row no-gutters class="mt-4">
            <v-col cols="1">Prepared by :</v-col>
            <v-col cols="4" class="d-flex flex-column">
              <input type="text"
                style="width: 100%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38); margin-bottom: 4px;"
                disabled />
              <p class="text-center" style="margin: 0;">Signature over Printed Name/Date</p>
            </v-col>
            <v-col cols="12" class="my-2"></v-col>
            <v-col cols="1">Noted by :</v-col>
            <v-col cols="4" class="d-flex flex-column">
              <input type="text"
                style="width: 100%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38); margin-bottom: 4px;"
                disabled />
              <p class="text-center" style="margin: 0;">Signature over Printed Name/Date</p>
            </v-col>
          </v-row>



          <!-- Fixed Footer -->
          <div class="footer">
            <div>Doc. Ref: HCD-QF-MOT-013</div>
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
  font-size: 13px;
  line-height: normal;
  word-break: break-word;
  font-weight: normal;
}

tr,
th {
  font-weight: bold;
}

.empty-row {
  height: 24.5px;
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
