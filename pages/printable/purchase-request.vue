<template>
  <div>

    <body class="printable-page" v-for="(pr, index) in purchaseData" :key="index">
      <div class="pa-2 pt-5" v-for="n in 2" :key="n">
        <!-- Loop through the PR twice -->
        <v-sheet class="mx-5" v-for="(chunk, pageIndex) in chunkArray(pr.items, 10)" :key="pageIndex">
          <div v-if="pageIndex > 0" class="my-5" style="border-top: 2px dotted black; width: 100%; opacity: 1;"></div>

          <div style="display: flex; align-items: stretch;">
            <div
              style="width: 60%; font-size: 24px; font-weight: bold; text-align: left; border: 2px solid black; padding: 20px;"
              class="text-uppercase text-center">
              Purchase Requisition Form
            </div>
            <div
              style="width: 40%; text-align: right; border: 2px solid black; display: flex; align-items: center; justify-content: center;">
              <v-img src="/hawkstow.png" />
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
                  : <input :value="pr.no" type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled>
                </div>
              </div>
              <div style="display: flex; align-items: center;">
                <div style="width: 20%;">Date</div>
                <div style="width: 80%; display: flex; align-items: center;">
                  : <input :value="pr.date_requested" type="text"
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
              <!-- Loop twice for each pr -->
              <tr v-for="(item, index) in chunk" :key="index">
                <td>{{ pageIndex * 10 + index + 1 }}</td>
                <td>{{ item.description || '' }}</td>
                <td>{{ item.unit || '' }}</td>
                <td>{{ item.quantity || '' }}</td>
              </tr>

              <!-- Fill empty rows if chunk size is less than 10 -->
              <tr v-for="n in (10 - chunk.length)" :key="'empty-' + n">
                <td class="empty-row"> </td>
                <td> </td>
                <td> </td>
                <td> </td>
              </tr>
            </tbody>
          </table>

          <div class="d-flex mt-10">
            <div class="w-50 pr-5">
              <div class="font-weight-bold">REQUESTED BY:</div>
              <div style="border-bottom: 1px solid #ccc; margin-top: 7px;" class="text-uppercase text-center"> Marianne
                Mae Paclian </div>
            </div>
            <div class="w-50">
              <div class="font-weight-bold">APPROVED BY:</div>
              <div style="border-bottom: 1px solid #ccc; margin-top: 7px;" class="text-uppercase text-center"> Grace
                Cruz </div>
            </div>
          </div>

          <div class="d-flex mt-5">
            <div class="w-33 footer-text">Doc. Ref.:HCD-QF-PUR-002</div>
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

const purchaseData = computed(() => {
  return route.query.result ? JSON.parse(route.query.result) : null;
});

function print() {
  window.print();
}

const chunkArray = (array: any[], size: number) => {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  );
};
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
