<template>

  <div v-for="(pr, index) in purchaseData" :key="index">

    <body class="printable-page" v-for="(chunk, pageIndex) in chunkArray(pr.items, 10)" :key="pageIndex">
      <div class="pa-2 pt-5">
        <v-sheet class="mx-5">
          <div v-for="n in 2" :key="n">

            <div style="display: flex; align-items: stretch;" :class="n === 2 ? 'mt-4' : 'mt-0'">
              <div
                style="width: 60%; font-size: 24px; font-weight: bold; text-align: left; border: 2px solid black; padding: 20px;"
                class="text-uppercase text-center">
                Purchase Requisition Form
              </div>
              <div
                style="width: 40%; text-align: right; border: 2px solid black; display: flex; align-items: center; justify-content: center;">
                <v-img class="ma-2" src="/hawkstow.png" />
              </div>
            </div>

            <div style="display: flex;" class="mt-2">
              <div style="width: 70%;">
                <div style="display: flex; align-items: center;">
                  <div style="width: 15%;">Project</div>
                  <div style="width: 80%; display: flex; align-items: center;">
                    : <input :value="pr.project" type="text"
                      style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled>
                  </div>
                </div>
                <div style="display: flex; align-items: center;">
                  <div style="width: 15%;">Location</div>
                  <div style="width: 80%; display: flex; align-items: center;">
                    : <input :value="pr.address" type="text"
                      style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled>
                  </div>
                </div>
              </div>
              <div style="width: 25%;">
                <div style="display: flex; align-items: center;">
                  <div style="width: 20%;">No</div>
                  <div style="width: 80%; display: flex; align-items: center;">
                    : <input :value="` PR-${pr.control_number}-${index + 1}`" type="text"
                      style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled>
                  </div>
                </div>
                <div style="display: flex; align-items: center;">
                  <div style="width: 20%;">Date</div>
                  <div style="width: 80%; display: flex; align-items: center;">
                    : <input :value="formatDate(pr.date_requested)" type="text"
                      style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled>
                  </div>
                </div>
              </div>
            </div>

            <table class="mt-3">
              <thead class="bg-grey-lighten-2">
                <tr>
                  <th width="10%">Item No</th>
                  <th width="45%"> Description</th>
                  <th width="15%">Unit</th>
                  <th width="15%"> Quantity</th>
                </tr>
              </thead>
              <tbody>


                <tr v-for="(item, index) in chunk" :key="index">
                  <td class="text-center">{{ pageIndex * 10 + index + 1 }}</td>
                  <td>{{ item.description || '' }}</td>
                  <td class="text-center">{{ item.unit || '' }}</td>
                  <td class="text-center">{{ item.quantity || '' }}</td>
                </tr>


                <tr v-for="n in (10 - chunk.length)" :key="'empty-' + n">
                  <td class="empty-row"> </td>
                  <td> </td>
                  <td> </td>
                  <td> </td>
                </tr>
              </tbody>
            </table>

            <div class="d-flex mt-10">
              <div class="w-50 px-10">
                <div class="font-weight-bold mb-2">Requested by:</div>

                <v-sheet flat class="d-flex justify-center" style="margin-bottom: -1mm; margin-top: -1mm; ">
                  <v-img width="50" height="26" src="/ranielbabilonia.png" contain />

                </v-sheet>
                <div class="font-weight-bold"
                  style="border-bottom: 1px solid #ccc; margin-top: 2px; text-transform: uppercase; text-align: center;">
                  {{ pr.requested_by }}
                </div>
              </div>
              <div class="w-50 px-10">
                <div class="font-weight-bold mb-2">Approved by:</div>
                <v-sheet flat class="d-flex justify-center" style="margin-bottom: -12mm; margin-top: -12mm;">
                  <v-img class="ma-0 pa-0" width="150" height="100" src="/mam_bing_signature.png" contain />
                </v-sheet>
                <div class="font-weight-bold"
                  style="border-bottom: 1px solid #ccc; margin-top: 12px; text-transform: uppercase; text-align: center;">
                  Grace Cruz
                </div>
              </div>
            </div>
            <div class="d-flex mt-5">
              <div class="w-33 footer-text">Doc. Ref.:HCD-QF-PUR-002</div>
              <div class="w-33 text-center footer-text">Revision No.:00</div>
              <div class="w-33 text-end footer-text">Effectivity Date: November 04, 2022</div>
            </div>
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

// const chunkArray = (array: any[], size: number) => {
//   return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
//     array.slice(i * size, i * size + size)
//   );
// };

const chunkArray = (array: any[], size: number) => {
  const filtered = array.filter(item => item.is !== false);
  return Array.from({ length: Math.ceil(filtered.length / size) }, (_, i) =>
    filtered.slice(i * size, i * size + size)
  );
};

// function formatDate(date: any) {
//   return new Date(date).toLocaleDateString()
function formatDate(date: any): string {
  const inputDate = new Date(date);
  let resultDate = new Date(inputDate);


  resultDate.setDate(inputDate.getDate() - 2);


  let deductedDays = 2;
  while (resultDate.getDay() === 6 || resultDate.getDay() === 0) {
    resultDate.setDate(resultDate.getDate() - 1);
    deductedDays += 1;

    if (deductedDays === 4) break;
  }

  return resultDate.toLocaleDateString();
}

// }
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
