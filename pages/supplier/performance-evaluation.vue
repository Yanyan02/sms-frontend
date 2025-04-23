<template>
  <div>

    <div v-for="(ed, index) in evaluationData" :key="index">


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
                EXTERNAL PROVIDER PERFORMANCE
                EVALUATION FORM

              </div>

            </div>
            <v-row class="mb-6" no-gutters>
              <v-col cols="8"></v-col>
              <v-col cols="4" class="d-flex align-end my-2 text-right"> Date :
                <input :value="ed.date" type="text"
                  style="border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.39); width: 100%;" disabled
                  full-width />
              </v-col>
              <v-col cols="9"> NAME OF SUPPLIER : <br />
                <input :value="ed.name" type="text"
                  style="border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.39); width: 100%;" disabled
                  full-width />
              </v-col>
              <v-col cols="9"> PRODUCTS/SERVICES SUPPLIED : <br />
                <input :value="ed.nature" type="text"
                  style="border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.39); width: 100%;" disabled />
              </v-col>
              <v-col cols="9"> For the Period Covering :<br />
                <input :value="`${ed.from} to ${ed.to}`" type="text"
                  style="border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.39); width: 100%;" disabled />
              </v-col>
            </v-row>

            <v-row dense>

            </v-row>
            <v-row class="my-2" dense>NOTE: Rate from 1 to 5 (5 being the highest and 1 being the lowest). Refer to
              criteria
              table below. Rating below satisfactory shall be subjected to corrective and preventive action.
            </v-row>

            <v-row v-for="item in rating_desc" :key="item.label" no-gutters>
              <v-col cols="2">
                {{ item.label }}
              </v-col>
              <v-col cols="5">
                - {{ item.description }}
              </v-col>
            </v-row>

            <!-- Rating Criteria Table -->
            <v-row no-gutters>
              <v-col cols="12" class="my-4">
                <table>
                  <thead>
                    <tr>
                      <th width="90px" rowspan="2">RATING</th>
                      <th colspan="4">CRITERIA</th>
                    </tr>
                    <tr>
                      <th>PRODUCT QUALITY</th>
                      <th>DELIVERY</th>
                      <th>WARRANTY</th>
                      <th>Response to Complaints</th>
                    </tr>

                  </thead>
                  <tbody>
                    <tr v-for="row in rating_criteria" :key="row.rating">
                      <td>{{ row.rating }}</td>
                      <td>{{ row.quality }}</td>
                      <td>{{ row.delivery }}</td>
                      <td>{{ row.warranty }}</td>
                      <td>{{ row.response }}</td>
                    </tr>
                  </tbody>
                </table>
              </v-col>
            </v-row>
            <div class="text-end mt-5 mr-2"> Page 1 of 2</div>
            <div class="d-flex">
              <div class="w-33 footer-text">Doc. Ref.:HCD-QF-PUR-004</div>
              <div class="w-33 text-center footer-text">Revision No.:00</div>
              <div class="w-33 text-end footer-text">Effectivity Date: November 04, 2022</div>
            </div>
          </v-sheet>
        </div>
      </body>

      <body class="printable-page">
        <div class="pa-2 pt-5">
          <!-- Loop through the PR twice -->
          <v-sheet class="mx-5">


            <div style="display: flex; align-items: stretch;">
              <div
                style="width: 40%; text-align: right; border: 2px solid black; display: flex; align-items: center; justify-content: center; ">
                <v-img class="ma-2" src="/hawkstow.png" />
              </div>
              <div
                style="width: 60%; font-size: 24px; font-weight: bold; text-align: left; border: 2px solid black; padding: 20px;"
                class="text-uppercase text-center">
                EXTERNAL PROVIDER PERFORMANCE
                EVALUATION FORM

              </div>

            </div>

            <v-row dense>
              <v-col cols="12" class="mt-5">Cont. EXTERNAL PROVIDER PERFORMANCE EVALUATION FORM
              </v-col>
              <v-col cols="12">
                <v-row no-gutters>
                  <v-col cols="6"></v-col>
                  <v-col cols="6" class="d-flex">
                    <v-row no-gutters>
                      <v-col cols="2">5</v-col>
                      <v-col cols="2">4</v-col>
                      <v-col cols="2">3</v-col>
                      <v-col cols="2">2</v-col>
                      <v-col cols="2">1</v-col>
                      <v-col cols="2"></v-col>
                    </v-row>

                  </v-col>
                </v-row>

                <v-row no-gutters v-for="(c, index) in ed.criteria" :key="index">
                  <v-col cols="6">
                    {{ index + 1 }}. {{ c.name }} <br />
                    <span class="pl-4">
                      REMARKS, if any:

                      <textarea v-for="i in 1" :key="i" :value="c.remarks" class="mx-15" rows="3"
                        style="border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.39); resize: none;" disabled
                        dense />
                    </span>
                  </v-col>
                  <v-col cols="6" class="d-flex">

                    <v-row no-gutters>
                      <v-col cols="2">
                        <input type="checkbox" :checked="c.rating === 5" @change="c.rating = 5" hide-details />
                      </v-col>
                      <v-col cols="2">
                        <input type="checkbox" :checked="c.rating === 4" @change="c.rating = 4" hide-details />
                      </v-col>
                      <v-col cols="2">
                        <input type="checkbox" :checked="c.rating === 3" @change="c.rating = 3" hide-details />
                      </v-col>
                      <v-col cols="2">
                        <input type="checkbox" :checked="c.rating === 2" @change="c.rating = 2" hide-details />
                      </v-col>
                      <v-col cols="2">
                        <input type="checkbox" :checked="c.rating === 1" @change="c.rating = 1" hide-details />
                      </v-col>
                      <v-col cols="2"></v-col>
                    </v-row>
                  </v-col>


                </v-row>

              </v-col>
              <v-col cols="12" class="mt-5">
                <v-row no-gutters justify="end">
                  <v-col cols="4" class="d-flex align-center font-weight-bold mr-15">
                    Total rating
                    <input type="text" :value="ed.totalRating"
                      style="border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38); text-align: center;"
                      disabled />
                  </v-col>


                  <v-col cols="3"> <input type="checkbox" :checked="ed.result" /> <label
                      class="pl-2">Passed</label></v-col>
                  <v-col cols="3"> <input type="checkbox" :checked="!ed.result" label="Failed" />
                    <label class="pl-2">Failed</label></v-col>
                </v-row>
              </v-col>
              <v-row no-gutters>
                <v-col cols="12"> RECOMMENDATION : </v-col>
                <v-col cols="12">
                  <textarea type="text" :value="ed.recommendations"
                    style="border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.39); width: 100%;" rows="4"
                    disabled />
                </v-col>
              </v-row>

            </v-row>


            <div class="d-flex mt-10">
              <div class="w-50 pr-5">
                <div class="font-weight-bold">Evaluated by:</div>
                <div style="border-bottom: 1px solid #ccc; margin-top: 7px;" class="text-uppercase text-center">
                  Marianne
                  Mae Paclian </div>
              </div>
              <div class="w-50">
                <div class="font-weight-bold">Approved by:</div>
                <div style="border-bottom: 1px solid #ccc; margin-top: 7px;" class="text-uppercase text-center"> Grace
                  Cruz </div>
              </div>
            </div>
            <div class="text-end mt-5 mr-2"> Page 2 of 2</div>
            <div class="d-flex">
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
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
import useAuth from "~/store/auth";
import { supplierEvaluations } from "~/store/purchasing";
const { $rest } = useNuxtApp();
const route = useRoute();

const evaluationStore = supplierEvaluations()

const items = evaluationStore.items
const evaluationData = computed(() => {
  return items;
});


function print() {
  window.print();
}

const rating_desc = [
  { label: "Excellent", description: "Total rating is 16 to 20" },
  { label: "Very Satisfactory", description: "Total rating is 13 to 15" },
  { label: "Satisfactory", description: "Total rating is 10 to 12" },
  { label: "Poor", description: "Total rating is 0 to 9" },
];

const rating_criteria = [
  {
    rating: 5,
    quality: "Always conforms to specifications, in the PO, no rejects and returns",
    delivery: "Delivers on the date of PO",
    warranty: "Provides more than 15 days allowance on returns and replacement",
    response: "Responds and act to complaints from 1 to 3 days",
  },
  {
    rating: 4,
    quality: "With cases of 1-2% rejects/returns on deliveries",
    delivery: "1 day delay on deliveries",
    warranty: "Provides 10 to 15 days allowance on returns and replacement",
    response: "Responds and act to complaints from 4 to 7 days",
  },
  {
    rating: 3,
    quality: "Cases of rejects/returns are 3-5% of deliveries",
    delivery: "2 days delay on deliveries",
    warranty: "Provides 5 to 9 days allowance on returns and replacement",
    response: "Responds and act to complaints from 8 to 10 days",
  },
  {
    rating: 2,
    quality: "6-10% rejects and returns encountered on deliveries",
    delivery: "3 days delay deliveries",
    warranty: "Provide 1 to 4 days allowance on returns and replacements",
    response: "Responds and act to complaints from 11 to 15 days",
  },
  {
    rating: 1,
    quality: "More than 10% rejects/returns on deliveries",
    delivery: "More than 3 days delay on deliveries",
    warranty: "Do not accept returns and replacements",
    response: "Responds and act to complaints 16 days or more",
  },
];

const criteria = ref(['PRODUCT QUALITY', 'DELIVERY', 'WARRANTY', 'RESPONSE TO COMPLAINTS'])

const c = { remarks: "This is a long remark text\nIt will be split into\nthree lines" };

// Method to get the line of remarks
const getRemarkLine = (lineIndex: number) => {
  const lines = c.remarks.split("\n");
  return lines[lineIndex] || ""; // Return the respective line or empty string if it doesn't exist
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
  padding: 15px;
  font-size: 14px;
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
  text-align: center;
}
</style>
