<template>
  <div v-for="(po, index) in purchaseData" :key="index">


    <body class="printable-page" v-for="(chunk, pageIndex) in chunkArray(po.items, 20)" :key="`${index}-${pageIndex}`">
      <div class="pa-2 pt-5">
        <!-- Loop through the PR twice -->
        <v-sheet>



          <div style="display: flex; align-items: stretch;">
            <div
              style="width: 60%; font-size: 34px; font-weight: bold; text-align: left; border: 2px solid black; padding: 25px;"
              class="text-uppercase text-center">
              Purchase ORDER
            </div>
            <div
              style="width: 40%; text-align: right; border: 2px solid black; display: flex; align-items: center; justify-content: center;">
              <v-img class="ma-2" src="/hawkstow.png" />
            </div>
          </div>
          <div style="display: flex;" class="mt-2">
            <div style="width: 70%;">
              <div style="display: flex; align-items: center;">
                <div style="width: 15%;">Comapany</div>
                <div style="width: 80%; display: flex; align-items: center;">
                  : <input :value="'Hawkstow Construction and Devlopment'" type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled>
                </div>
              </div>
              <div style="display: flex; align-items: center;">
                <div style="width: 15%;"></div>
                <div style="width: 80%; display :flex; align-items: center;">
                  <input type="text" style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                    disabled>
                </div>
              </div>
              <div style="display: flex; align-items: center;" class="mt-10">
                <div style="width: 15%;">Supplier</div>
                <div style="width: 80%; display: flex; align-items: center;">
                  : <input :value="po.supplier" type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled>
                </div>
              </div>
              <div style="display: flex; align-items: center;">
                <div style="width: 15%;">Ship to</div>
                <div style="width: 80%; display: flex; align-items: center;">
                  : <input :value="po.project" type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled>
                </div>
              </div>
            </div>
            <div style="width: 30%; line-height: 1;">
              <div style="display: flex; align-items: center;">
                <div style="width: 40%; font-size: 11px;">Purchase No.</div>
                <div style="width: 60%; display: flex; align-items: center;">
                  : <input :value="` PO-${po.control_number}-${index + 1}`" type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled>
                </div>
              </div>
              <div style="display: flex; align-items: center;">
                <div style="width: 40%;">Date</div>
                <div style="width: 60%; display: flex; align-items: center;">
                  : <input :value="formatDate(po.date_requested)" type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled>
                </div>
              </div>
              <div style="display: flex; align-items: center;">
                <div style="width: 40%;">Terms</div>
                <div style="width: 60%; display: flex; align-items: center;">
                  : <input type="text" style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                    disabled>
                </div>
              </div>
              <div style="display: flex; align-items: center;">
                <div style="width: 40%;">Tel. Date</div>
                <div style="width: 60%; display: flex; align-items: center;">
                  : <input type="text" style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                    disabled>
                </div>
              </div>
              <div style="display: flex; align-items: center;">
                <div style="width: 40%;">Date</div>
                <div style="width: 60%; display: flex; align-items: center;">
                  : <input type="text" style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                    disabled>
                </div>
              </div>
              <div style="display: flex; align-items: center;">
                <div style="width: 40%;">Tel. No.</div>
                <div style="width: 60%; display: flex; align-items: center;">
                  : <input type="text" style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                    disabled>
                </div>
              </div>
              <div style="display: flex; align-items: center;">
                <div style="width: 40%;">Fax. No.</div>
                <div style="width: 60%; display: flex; align-items: center;">
                  : <input type="text" style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                    disabled>
                </div>
              </div>
            </div>

          </div>


          <table class="mt-3">
            <thead class="bg-grey-lighten-2">
              <tr>
                <th width="10%">Item No</th>
                <th width="35%"> Description</th>
                <th width="15%">U/M</th>
                <th width="15%"> Quantity</th>
                <th width="15%"> Unit Cost</th>
                <th width="20%"> Amount</th>
              </tr>
            </thead>
            <tbody>

              <tr v-for="(item, index) in chunk" :key="index">
                <td class="text-center">{{ pageIndex * 20 + index + 1 }}</td>
                <td>{{ item.description || '' }}</td>
                <td class="text-center">{{ item.unit || '' }}</td>
                <td class="text-center">{{ item.quantity || '' }}</td>
                <td class="text-end"> {{ Number(item.cost).toFixed(2) }}</td>
                <td class="text-end">{{ (Number(item.quantity) * Number(item.cost)).toFixed(2) }}</td>


              </tr>


              <tr v-for="n in (20 - chunk.length)" :key="'empty-' + n">
                <td class="empty-row"> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
              </tr>


            </tbody>
          </table>
          <div class="d-flex justify-end align-items-center mt-2">
            <span class="">TOTAL :</span>
            <div class="font-weight-bold" style="min-width: 12%; text-align: end;">
              ₱ {{ getTotalPerPO(po.items).toFixed(2) }}

            </div>
          </div>


          <div class="d-flex mt-10">
            <!-- Processed by -->
            <div class="w-50 pr-5">
              <div class="font-weight-bold mb-2">Processed by:</div>
              <v-sheet flat class="d-flex justify-center" style="margin-bottom: -12mm;">
                <v-img class="ma-0 pa-0" width="350" height="120" src="/tatay_benjie.png" contain />
              </v-sheet>
              <div
                style="border-bottom: 1px solid #ccc; margin-top: 7px; text-transform: uppercase; text-align: center;">
                Benjie Benejol
              </div>
            </div>

            <!-- Approved by -->
            <div class="w-50">
              <div class="font-weight-bold mb-2">Approved by:</div>
              <v-sheet flat class="d-flex justify-center" style="margin-bottom: -12mm;">
                <v-img class="ma-0 pa-0" width="350" height="120" src="/mam_bing_signature.png" contain />
              </v-sheet>
              <div
                style="border-bottom: 1px solid #ccc; margin-top: 7px; text-transform: uppercase; text-align: center;">
                Grace Cruz
              </div>
            </div>
          </div>


          <div class="d-flex mt-5" style="padding-top: 100px;">
            <div class="w-33 footer-text">Doc. Ref.:HCD-QF-PUR-004</div>
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
import { defineStore } from "pinia";
import useAuth from "~/store/auth";
import { usePurchaseOrder } from "~/store/purchasing";
const { $rest } = useNuxtApp();
const route = useRoute();
const purchasingStore = usePurchaseOrder()

const items = purchasingStore.items
const purchaseData = computed(() => {
  return [...items].sort((a, b) => new Date(a.date_requested).getTime() - new Date(b.date_requested).getTime());
});



function print() {
  window.print();
}

function chunkArray(arr: any, chunkSize: any) {
  const chunks = []
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize))
  }
  return chunks
}

function getTotalPerPO(items: any[]) {
  return items.reduce((sum, item) => {
    const quantity = Number(item.quantity) || 0;
    const cost = Number(item.cost) || 0;
    return sum + quantity * cost;
  }, 0);
}

function formatDate(date: any) {
  return new Date(date).toLocaleDateString()
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

/* Ensure empty rows have the same height as the filled ones */
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

table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
