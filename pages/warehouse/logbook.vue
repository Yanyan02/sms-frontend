<template>
  <div v-for="(pr, index) in purchaseData" :key="index">

    <body class=" printable-page">
      <div class="pa-10 pt-5">
        <div style=" text-align: center; font-size: 30px; font-weight: bold;">
          DAILY LOGSHEET
        </div>
        <div class="my-5">
          <div style="display: flex;" class="mt-2">
            <div style="width: 70%;">
              <div style="display: flex; align-items: center;">
                <div style="width: 15%;">Project</div>
                <div style="width: 85%; display: flex; align-items: center;">
                  : <input :value="pr.project" type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled>
                </div>
              </div>
              <div style="display: flex; align-items: center;">
                <div style="width: 15%;">Location</div>
                <div style="width: 85%; display: flex; align-items: center;">
                  : <input :value="'Maysan Road Valenzuela City'" type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled>
                </div>
              </div>

              <div style="display: flex; align-items: center;">
                <div style="width: 15%;"> Date</div>
                <div style="width: 30%; display: flex; align-items: center;">
                  : <input :value="formatDate(pr.date_requested)" type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table class="mt-3">
          <thead>
            <tr>
              <th width="40%">Materials</th>
              <th width="10%"> Quantity</th>
              <th width="10%"> Unit</th>
              <th width="20%">Remarks</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in pr.items" :key="index">
            <tr v-if="item.is != false">
              <td class="empty-row">{{ item.description }}</td>
              <td class="text-center">{{ item.quantity }}</td>
              <td class="text-center">{{ item.unit }}</td>

              <td></td>
            </tr>



            <!-- <tr v-for="r in 10" :key="r">
              <td class="empty-row"> </td>
              <td></td>
              <td></td>
            </tr> -->
          </tbody>
        </table>
        <div class="w-30 mt-10">
          Received by :
          <hr style=" max-width: 320px; margin-top: 10mm;" />
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
const purchaseData = computed(() => {
  return [...items].sort((a, b) => new Date(a.date_requested).getTime() - new Date(b.date_requested).getTime());
});



function print() {
  window.print();
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
  font-size: 14px;
  font-family: Arial, sans-serif;
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
  padding: 6px;
  font-size: 15px;
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
