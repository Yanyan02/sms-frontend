<template>
  <div>

    <body class="printable-page" v-for="(stock, index) in stockcardData" :key="index">
      <div class="pa-5 pt-5">
        <div style="display: flex; align-items: stretch;">
          <div
            style="width: 40%; text-align: right; border: 2px solid black; display: flex; align-items: center; justify-content: center;">
            <v-img class="ma-2" src="/hawkstow.png" />
          </div>
          <div
            style="width: 60%; font-size: 26px; font-weight: bold; text-align: left; border: 2px solid black; padding: 30px;"
            class="text-uppercase text-center">
            STOCK CARD
          </div>
        </div>
        <div class="my-5">
          <div style="display: flex;" class="mt-2">
            <div style="width: 70%;">
              <div style="display: flex; align-items: center;">
                <div style="width: 15%;">Project</div>
                <div style="width: 80%; display: flex; align-items: center;">
                  : <input :value="stock.project" type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled>
                </div>
              </div>
              <div style="display: flex; align-items: center;">
                <div style="width: 15%;">Location</div>
                <div style="width: 80%; display: flex; align-items: center;">
                  : <input :value="stock.address" type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled>
                </div>
              </div>

            </div>
            <div style="width: 30%; ">
              <div style="display: flex; align-items: center;">
                <div style="width: 20%;">Item</div>
                <div style="width: 60%; display: flex; align-items: center;">
                  : <input :value="stock.items.description" type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled>
                </div>
              </div>
              <div style="display: flex; align-items: center;">
                <div style="width: 20%;">Unit</div>
                <div style="width: 60%; display: flex; align-items: center;">
                  : <input :value="stock.items.unit" type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled>
                </div>
              </div>
            </div>

          </div>
        </div>
        <table class="mt-3">
          <thead>
            <tr>
              <th width="10%" colspan="4">IN/RECEIPT</th>
              <th width="35%" colspan="3">OUT/ISSUANCE</th>
              <th width="15%" colspan="2">BALANCE</th>
            </tr>
            <tr>
              <th width="10%">Date</th>
              <th width="10%">DR#/ <br /> Inv.#</th>
              <th width="20%">Supplier's Name</th>
              <th width="10%">Qty</th>
              <th width="10%">Date</th>
              <th width="10%">MRIS#</th>
              <th width="10%">Qty</th>
              <th width="10%">Date</th>
              <th width="10%">Qty</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="empty-row"> {{ new Date(stock.date_requested).toLocaleDateString() }}</td>
              <td> {{ stock.type }}</td>
              <td>{{ stock.supplier }}</td>
              <td> {{ stock.items.quantity }}</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr v-for="r in 20" :key="r">
              <td class="empty-row"> </td>
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

        <div class="d-flex" style="margin-top: 250px;">
          <div class="w-33 footer-text">Doc. Ref.:HCD-QF-WHS-007</div>
          <div class="w-33 text-center footer-text">Revision No.:00</div>
          <div class="w-33 text-end footer-text">Effectivity Date: November 04, 2022</div>
        </div>

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
import { defineStore } from "pinia";
import useAuth from "~/store/auth";
import { usePurchaseOrder } from "~/store/purchasing";
const { $rest } = useNuxtApp();
const route = useRoute();
const purchasingStore = usePurchaseOrder()

const items = purchasingStore.items
const stockcardData = computed(() => {
  return items;
});

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
  font-size: 14px;
}

.footer-text {
  font-size: 12px;
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

/* Ensure empty rows have the same height as the filled ones */
.empty-row {
  height: 24.5px;

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

table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
