<template>
  <div>

    <body class="printable-page">
      <div class="pa-2 pt-5" v-for="trip in 2" :key="trip">
        <v-sheet class="mx-5" height="50%" style="border: 2px solid black">
          <div style="display: flex; align-items: stretch; border-bottom: 2px solid black;">
            <div
              style="width: 30%; text-align: right;  display: flex; align-items: center; justify-content: center;border-right: 2px solid black; ">
              <v-img class=" px-2" src="/hawkstow.png" />
            </div>
            <div style="width: 70%; font-size: 25px; font-weight: bold; text-align: left;  padding: 30px;"
              class="text-uppercase text-center">
              BREAKDOWN REPORT
            </div>
          </div>

          <div class="pa-2">
            <v-row no-gutters class="mt-2 ">
              <v-col cols="1">ITEM :</v-col>
              <v-col cols="3">
                <input type="text" style="width: 100%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                  disabled />
              </v-col>

              <v-col cols="2" class="text-end">MODEL :</v-col>
              <v-col cols="3">
                <input type="text" style="width: 100%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                  disabled />
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="1">BRAND :</v-col>
              <v-col cols="3">
                <input type="text" style="width: 100%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                  disabled />
              </v-col>

              <v-col cols="2" class="text-end">Control No. :</v-col>
              <v-col cols="3">
                <input type="text" style="width: 100%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                  disabled />
              </v-col>
            </v-row>



            <v-row no-gutters justify="end">
              <v-col cols="12"> TROUBLE/PROBLEM : </v-col>
              <v-col cols="10">
                <input v-for="col in 3" :key="col" type="text"
                  style="width: 100%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled />
              </v-col>

            </v-row>
            <v-row no-gutters justify="end">
              <v-col cols="12"> DESCRIPTION OF WORK : </v-col>
              <v-col cols="10">
                <input v-for="col in 3" :key="col" type="text"
                  style="width: 100%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled />
              </v-col>

            </v-row>
            <v-row no-gutters justify="end">
              <v-col cols="12"> PARTS TO BE REPAIR/REPLACE:</v-col>
              <v-col cols="10">
                <input v-for="col in 3" :key="col" type="text"
                  style="width: 100%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled />
              </v-col>

            </v-row>
          </div>
          <v-row class="mx-5 mt-2">
            <v-col cols="4" class="text-left" align-self="start">
              <strong>Prepared by:</strong>
              <input type="text" style="width: 100%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                disabled />
            </v-col>

            <v-col cols="4" class="text-left" align-self="start">
              <strong>Checked by:</strong>
              <input type="text" style="width: 100%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" />
            </v-col>

            <v-col cols="4" class="text-left" align-self="start">
              <strong>Acknowledged by:</strong>
              <input type="text" style="width: 100%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4" class="text-left text-caption font-weight-regular">
              Doc. Ref: HCD-QF-MOT-001
            </v-col>
            <v-col cols="4" class="text-center text-caption  font-weight-regular">
              Revision No.: 00
            </v-col>
            <v-col cols="4" class="text-right text-caption  font-weight-regular">
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
  font-size: 13px;
  font-weight: bold;
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
