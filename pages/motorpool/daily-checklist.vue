<template>
  <div>


    <body class="printable-page" v-for="(check, vIndex) in checklistData" :key="check._id">
      <div class="pa-2 pt-5">
        <v-sheet class="mx-5">
          {{ checklistData }}
          <!-- Header -->
          <div style="display: flex; align-items: stretch;">
            <div
              style="width: 30%; text-align: right; border: 2px solid black; display: flex; align-items: center; justify-content: center;">
              <v-img class="px-2" src="/hawkstow.png" />
            </div>
            <div
              style="width: 70%; font-size: 24px; font-weight: bold; text-align: left; border: 2px solid black; padding: 30px;"
              class="text-uppercase text-center">
              Daily/Monthly Preventive Maintenance Checklist

            </div>
          </div>


          <div style="display: flex; align-items: center;">
            <div style="width: 15%;">Equipment Name</div>
            <div style="width: 50%; display: flex; align-items: center;">
              : <input :value="check.vehicle + ' ' + check.id" type="text"
                style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled>
            </div>
          </div>
          <div style="display: flex; align-items: center;">
            <div style="width: 15%;">Location</div>
            <div style="width: 50%; display: flex; align-items: center;">
              : <input :value="check.project" type="text"
                style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled>
            </div>
          </div>

          <div style="display: flex; align-items: center;">
            <div style="width: 15%;">For the month of</div>
            <div style="width: 20%; display: flex; align-items: center;">
              : <input type="text" style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                disabled>
            </div>
          </div>



          <!-- Table -->
          <table class="mt-2">
            <thead>
              <tr>
                <th width="10%">Checkpoints : </th>
                <th width="90%">Description</th>

              </tr>

            </thead>

            <tbody>
              <tr v-for="(check, index) in checklist" :key="index">
                <td class="empty-row text-center font-weight-bold"> {{ index + 1 }} </td>
                <td style="background-color: lightyellow;"> <b>{{ check.category }}.</b> {{ check.items }}</td>

              </tr>
            </tbody>

          </table>

          <table class="my-2">
            <thead>
              <tr>
                <th v-for="(day, index) in 32" :key="day"> {{ index === 0 ? '' : index }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in 8" :key="item">
                <td class="text-center font-weight-bold">{{ i + 1 }}</td>
                <td v-for="(day, index) in 31" :key="day"></td>
              </tr>
            </tbody>
          </table>
          <div style="display: flex; align-items: center;">
            <div style="width: 6%;">Remarks</div>
            <div style="width: 94%; display: flex; align-items: center;">
              : <input type="text" style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                disabled>
            </div>
          </div>
          <!-- Signatures -->
          <div style="display: flex; align-items: center;">
            <div style="width: 10%">Prepared by </div>
            <div style="width: 40%; display: flex; align-items: center;">
              : <input type="text" style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                disabled>
            </div>
            <div style="width: 10%">Noted by </div>
            <div style="width: 40%; display: flex; align-items: center;">
              : <input type="text" style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                disabled>
            </div>
          </div>

          <!-- Fixed Footer -->
          <div class="footer">
            <div>Doc. Ref: HCD-QF-MOT-003</div>
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
import { useChecklist } from "~/store/motorpool";
const router = useRouter();
const route = useRoute();
const checklistStore = useChecklist()
function print() {
  window.print();
}
const items = checklistStore.items
const checklistData = computed(() => {
  return items;
});

const checklist = ref([
  {
    category: "Brakes",
    items:
      "Ensure brake fluid is near the maximum level, carry an extra bottle of brake fluid, consult your mechanic to check brake pads' condition, and check if the brakes feel too hard or too springy when stepping."

  },
  {
    category: "Lights",
    items:
      "Check all vehicle lights (headlights, brake lights, taillights, signal lights, etc.) to ensure they work properly."

  },
  {
    category: "Oil",
    items:
      "Use the oil dipstick to check if the oil level is full, park the vehicle on a level surface before checking, take readings when temperature is similar to road trip conditions, and bring an extra can of oil."

  },
  {
    category: "Water",
    items:
      "Ensure the radiator water level is full to avoid overheating, bring at least 5 gallons of water, check the windshield washer bottle and refill if needed, and inspect for possible water leaks."

  },
  {
    category: "Battery",
    items:
      "Handle the battery with care, check if battery terminals (positive and negative) are clean, do not touch the positive terminal with bare hands, check if electrolyte levels touch the internal metal if battery has removable caps, and refill with distilled water if needed."

  },
  {
    category: "Air",
    items:
      "Check tire pressure while tires are cold, include spare tire in your checks, and inspect all tires for damage or wear."

  },
  {
    category: "Gas",
    items:
      "Check the gas gauge to ensure it gives an accurate reading."

  },
  {
    category: "Seatbelt",
    items:
      "Verify that the seatbelt straps have correct tension and fit snugly."

  }
])

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
    width: 297mm;
    height: 210mm;
    box-shadow: none;
  }

  .d-print-none {
    display: none !important;
  }
}
</style>
