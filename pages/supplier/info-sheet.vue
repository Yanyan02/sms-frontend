<template>
  <div>


    <body class="printable-page">
      <div class="pa-2 pt-5">
        <!-- Loop through the PR twice -->
        <v-sheet class="mx-5">
          <div style="display: flex; align-items: stretch;">
            <div
              style="width: 40%; text-align: right; border: 2px solid black; display: flex; align-items: center; justify-content: center;">
              <v-img class="ma-2" src="/hawkstow.png" />
            </div>
            <div
              style="width: 60%; font-size: 24px; font-weight: bold; text-align: left; border: 2px solid black; padding: 20px;"
              class="text-uppercase text-center">
              EXTERNAL PROVIDER INFORMATION SHEET
            </div>
          </div>
          <div style="width: 100%;display: flex; align-items: center; line-height: 23px;">
            <div style="width: 20%;">Comapany</div>
            <div style="width: 80%; display: flex; align-items: center;">
              : <input type="text" style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                disabled>
            </div>
          </div>
          <div style="display: flex;  line-height: 23px;">
            <div style=" width: 70%;">
              <div style="display: flex; align-items: center;">
                <div style="width: 37%;">Name of Owner:</div>
                <div style="width: 80%; display: flex; align-items: center;">
                  : <input type="text" style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                    disabled>
                </div>
              </div>
            </div>
            <div style="display: flex; align-items: center; width: 40%;">
              <div style="width: 45%;">Nature of Company</div>
              <div style="width:45%; display: flex; align-items: center;">
                : <input type="text" style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                  disabled>
              </div>
            </div>
          </div>
          <div style="width: 100%;display: flex; align-items: center;  line-height: 23px;">
            <div style=" width: 20%;">Office Address:</div>
            <div style="width: 80%; display: flex; align-items: center;">
              : <input type="text" style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                disabled>
            </div>
          </div>
          <div style="display: flex;  line-height: 23px;">
            <div style=" width: 70%;">
              <div style="display: flex; align-items: center;">
                <div style="width: 37%;">Contact Person:</div>
                <div style="width: 80%; display: flex; align-items: center;">
                  : <input type="text" style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                    disabled>
                </div>
              </div>
            </div>
            <div style="display: flex; align-items: center; width: 40%;">
              <div style="width: 25%;">Title</div>
              <div style="width:75%; display: flex; align-items: center;">
                : <input type="text" style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                  disabled>
              </div>
            </div>
          </div>
          <div style="display: flex;  line-height: 23px;">
            <div style=" width: 70%;">
              <div style="display: flex; align-items: center;">
                <div style="width: 37%;">Contact Number/s:</div>
                <div style="width: 80%; display: flex; align-items: center;">
                  : <input type="text" style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                    disabled>
                </div>
              </div>
            </div>
            <div style="display: flex; align-items: center; width: 40%;">
              <div style="width: 25%;">Email</div>
              <div style="width:75%; display: flex; align-items: center;">
                : <input type="text" style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                  disabled>
              </div>
            </div>
          </div>

          <div class="my-5">PRODUCTS: (Attach list if space is not enough)</div>
          <table class="mt-3 product-table">
            <thead>
              <tr>
                <th width="70%" class="text-start">Description (SKU name, grammage and packaging)</th>
                <th width="15%">Cost</th>
                <th width="15%">SRP</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="n in 20" :key="n">
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div class="d-flex mt-10" style="gap: 30px;">
            <div style="width: 55%;">
              <div style="border-top: 1px solid #ccc; margin-top: 7px;" class="text-uppercase text-center">
                Supplier's Signature over Printed Name
              </div>
            </div>
            <div style="width: 20%;">
              <div style="border-top: 1px solid #ccc; margin-top: 7px;" class="text-uppercase text-center">
                Date
              </div>
            </div>
          </div>


          <div class="font-weight-bold font-italic"> Note: <br />
            Please attach the following documents if available: <br />
            1. Company profile (ppt presentation may do) <br />
            2. Product Catalog (pictures with product description)
          </div>


          <div class="d-flex mt-5">
            <div class="w-33 footer-text">Doc. Ref.:HCD-QF-PUR-005</div>
            <div class="w-33 text-center footer-text">Revision No.:00</div>
            <div class="w-33 text-end footer-text">Effectivity Date: November 04, 2022</div>
          </div>
        </v-sheet>
      </div>
    </body>

    <div style="position: fixed; bottom: 20px; right: 20px;" class="d-print-none">
      <v-btn color="primary" icon="mdi-printer" size="large" class="mb-2" @click="print()"></v-btn>
      <br />
      <v-btn icon="mdi-keyboard-return" size="large" @click="$router.back()"></v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
import useAuth from "~/store/auth";
const { $rest } = useNuxtApp();
const route = useRoute();


function print() {
  window.print();
}


</script>

<style scoped>
.printable-page {
  width: 210mm;
  height: 297mm;
  margin: 0 auto;
  box-shadow: 0 0.5mm 2mm rgba(0, 0, 0, 0.3);
}

* {
  font-size: 13px;
}

.footer-text {
  font-size: 11px;
}

.product-table {
  font-family: Arial, sans-serif;
  border-collapse: separate;
  width: 80%;
  margin-top: 10px;
}

.product-table th {
  font-weight: bold;
  font-size: 14px;
  text-align: left;
  text-align: center;
}

.product-table td {
  font-size: 12px;
  line-height: normal;
  padding: 12px 10px;
  border-bottom: 1px solid black;
  text-align: center;
}

.empty-row {
  height: 22.5px;

}

@media print {
  body {
    margin: 0;
  }

  .printable-page {
    margin: 0 auto;
    box-shadow: none;
  }
}
</style>
