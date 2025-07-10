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
              PREVENTIVE MAINTENANCE SCHEDULE
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
                <th rowspan="2">No</th>
                <th rowspan="2">Type of Vehicle/Equipment</th>
                <th rowspan="2">Model</th>
                <th rowspan="2">Plate No.</th>
                <th colspan="12">
                  Months
                </th>

              </tr>
              <tr>
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
                <td v-for="d in 4" :key="d" class="empty-row"></td>
                <td v-for="d in 12" :key="d" class="empty-row slanted-divider"></td>
              </tr>
            </tbody>

          </table>

          <div class="d-flex justify-center my-5">
            <v-row no-gutters justify="center" class="w-100">
              <v-col cols="4">
                <v-row no-gutters justify="center">
                  <v-col cols="12" class="font-weight-bold ">
                    Prepared By/Date:
                  </v-col>
                  <v-col cols="12" class="d-flex mt-2">
                    <input type="text" style="width: 80%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                      disabled />
                  </v-col>

                </v-row>
              </v-col>

              <v-col cols="4">
                <v-row no-gutters justify="center">
                  <v-col cols="12" class="font-weight-bold">
                    Checked By/Date :
                  </v-col>
                  <v-col cols="12" class="d-flex mt-2">
                    <input type="text" style="width: 80%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                      disabled />
                  </v-col>

                </v-row>
              </v-col>
              <v-col cols="4">
                <v-row no-gutters justify="center">
                  <v-col cols="12" class="font-weight-bold">
                    Approved By/Date:
                  </v-col>
                  <v-col cols="12" class="d-flex mt-2">
                    <input type="text" style="width: 80%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                      disabled />
                  </v-col>

                </v-row>
              </v-col>
            </v-row>
          </div>

          <v-row no-gutters>
            <v-col cols="1"> Legend :</v-col>
            <v-col cols="4" class="d-flex mb-1"><v-sheet color="amber" class="mx-4" style="border: 2px solid black"
                min-height="20px" min-width="50px">
              </v-sheet>
              Plan</v-col>

          </v-row>
          <v-row no-gutters>
            <v-col cols="1"> </v-col>
            <v-col cols="4" class="d-flex mb-1"><v-sheet color="success" class="mx-4" style="border: 2px solid black"
                min-height="20px" min-width="50px">
              </v-sheet>
              Done</v-col>

          </v-row>
          <v-row no-gutters>
            <v-col cols="1"> </v-col>
            <v-col cols="4" class="d-flex"><v-sheet color="red" class="mx-4" style="border: 2px solid black"
                min-height="20px" min-width="50px">
              </v-sheet>
              Re-scheduled/Cancelled</v-col>

          </v-row>



          <!-- Fixed Footer -->
          <div class="footer">
            <div>Doc. Ref: HCD-QF-MOT-009</div>
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

.empty-row.slanted-divider {
  border: 1px solid black;
  position: relative;
  height: 25px;
  min-width: 30px;
}

.empty-row.slanted-divider::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, transparent 49%, black 49%, black 51%, transparent 51%);
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
