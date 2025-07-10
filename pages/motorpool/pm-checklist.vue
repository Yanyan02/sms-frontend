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
              style="width: 70%; font-size: 24px; font-weight: bold; text-align: left; border: 2px solid black; padding: 10px; line-height: normal;"
              class="text-uppercase text-center">
              PREVENTIVE MAINTENANCE CHECKLIST (for Service Vehicle, Truck and Heavy Equipment)


            </div>
          </div>
          <!-- Table -->
          <v-row no-gutters class="mt-2">
            <v-col cols="6">
              <v-row no-gutters>
                <v-col cols="3"> Company</v-col>
                <v-col cols="7"> :<input type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled></v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="3"> Unit No</v-col>
                <v-col cols="7"> :<input type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled></v-col>
              </v-row>
            </v-col>
            <v-col cols="6" style="line-height: normal;">
              <v-row no-gutters>
                <v-col cols="5"> Machine Make/Model</v-col>
                <v-col cols="7"> :<input type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled></v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="3"> Mileage</v-col>
                <v-col cols="7"> :<input type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled></v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="3"> Date/Time</v-col>
                <v-col cols="7"> :<input type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled></v-col>
              </v-row>
            </v-col>
          </v-row>
          <table class="mt-2" style="border-bottom: 2px solid black; border-top: 2px solid black;">
            <template v-for="(section, index) in sections" :key="index">
              <thead>
                <tr>
                  <th colspan="6"
                    style="text-align: left; border-bottom: 2px solid black; border-top: 2px solid black;">
                    {{ section.title }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, rIdx) in section.items" :key="rIdx">
                  <td></td>
                  <td>{{ row[0] }}</td>
                  <td></td>
                  <td>{{ row[1] }}</td>
                  <td></td>
                  <td>{{ row[2] }}</td>
                </tr>
              </tbody>
            </template>
          </table>



          <!-- 
          <table class="mt-4">
            <thead>
              <tr>
                <td class="text-start"> Prepared by: </td>
                <td class="text-start"> Checked by: </td>
                <td class="text-start"> Approved by: </td>
              </tr>
              <tr>
                <td class="empty-row"> </td>
                <td></td>
                <td> </td>
              </tr>
              <tr>
                <td class="text-start"> Signature over Printed Name/Position </td>
                <td class="text-start"> Signature over Printed Name/Position </td>
                <td class="text-start"> Signature over Printed Name/Position </td>
              </tr>
            </thead>
          </table> -->




          <!-- Fixed Footer -->
          <div class="footer">
            <div>Doc. Ref: HCD-QF-MOT-010 </div>
            <div style="text-align: center;">Revision No.: 00</div>
            <div style="text-align: right;">Effectivity Date: November 04, 2022</div>
          </div>
        </v-sheet>
      </div>
    </body>

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
              style="width: 70%; font-size: 24px; font-weight: bold; text-align: left; border: 2px solid black; padding: 10px; line-height: normal;"
              class="text-uppercase text-center">
              PREVENTIVE MAINTENANCE CHECKLIST (for Service Vehicle, Truck and Heavy Equipment)


            </div>
          </div>

          <table class="mt-5" style="border-bottom: 2px solid black; border-top: 2px solid black;">
            <thead>
              <tr>
                <th colspan="6" style="text-align: left; border-bottom: 2px solid black; border-top: 2px solid black;">
                  Brake, Tires, and Wheels
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in brakeSection" :key="index">
                <td></td>
                <td>{{ row[0] || '' }}</td>
                <td></td>
                <td>{{ row[1] || '' }}</td>
                <td></td>
                <td>{{ row[2] || '' }}</td>
              </tr>
              <tr style="border-bottom: 2px solid black; border-top: 2px solid black;">
                <td colspan="6" class="empty-row"></td>
              </tr>

              <tr>
                <td rowspan="2"> Rating <br /> Legend</td>
                <td colspan="2">NA- Not Applicable </td>
                <td colspan="3">P- Passed in good working condition
                </td>
              </tr>
              <tr>
                <td colspan="2"> M- Passed but maintenance required</td>
                <td colspan="3">R - Rejected,
                  repair necessary before returning to service</td>
              </tr>

            </tbody>


          </table>
          <v-row no-gutters justify="center" class="mt-5">
            <v-col cols="5">
              <v-checkbox label="Equipment Passed" />
            </v-col>
            <v-col cols="5">
              <v-checkbox label="Equipment Not Passed" />
            </v-col>
          </v-row>


          <v-row no-gutters class="my-10">
            <v-col cols="4">
              <v-row no-gutters>
                <v-col cols="12" class="font-weight-bold">Work Required
                </v-col>
                <v-col cols="12">1.<input type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled></v-col>
                <v-col cols="12">2.<input type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled></v-col>
              </v-row>
            </v-col>
            <v-col cols="4">
              <v-row no-gutters>
                <v-col cols="12" class="font-weight-bold">Assigned To
                </v-col>
                <v-col cols="12"><input type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled></v-col>
                <v-col cols="12"><input type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled></v-col>
              </v-row>
            </v-col>
            <v-col cols="4">
              <v-row no-gutters>
                <v-col cols="12" class="font-weight-bold">Completion (Date/Time)
                </v-col>
                <v-col cols="12"><input type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled></v-col>
                <v-col cols="12"><input type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled></v-col>
              </v-row>
            </v-col>
          </v-row>

          <div class="d-flex justify-center my-10">
            <v-row no-gutters justify="center" class="w-100 my-3">
              <v-col cols="6">
                <v-row no-gutters justify="center">
                  <v-col cols="12" class="text-center">
                    Repair Man Signature:
                  </v-col>
                  <v-col cols="12" class="d-flex justify-center mt-2">
                    <input type="text" style="width: 80%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                      disabled />
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="6">
                <v-row no-gutters justify="center">
                  <v-col cols="12" class="text-center">
                    Supervisor's Signature:
                  </v-col>
                  <v-col cols="12" class="d-flex justify-center mt-2">
                    <input type="text" style="width: 80%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                      disabled />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>

          <div class="d-flex justify-center my-10">
            <v-row no-gutters justify="center" class="w-100">
              <v-col cols="4">
                <v-row no-gutters justify="center">
                  <v-col cols="12" class="font-weight-bold ">
                    Prepared By:
                  </v-col>
                  <v-col cols="12" class="d-flex justify-center mt-2">
                    <input type="text" style="width: 80%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                      disabled />
                  </v-col>
                  <v-col cols="12" class="text-center">
                    Repairman
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="4">
                <v-row no-gutters justify="center">
                  <v-col cols="12" class="font-weight-bold">
                    Checked By:
                  </v-col>
                  <v-col cols="12" class="d-flex justify-center mt-2">
                    <input type="text" style="width: 80%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                      disabled />
                  </v-col>
                  <v-col cols="12" class="text-center">
                    Maintenance Manager
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="4">
                <v-row no-gutters justify="center">
                  <v-col cols="12" class="font-weight-bold">
                    Approved By :
                  </v-col>
                  <v-col cols="12" class="d-flex justify-center mt-2">
                    <input type="text" style="width: 80%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                      disabled />
                  </v-col>
                  <v-col cols="12" class="text-center">
                    Office Manager
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>
          <div class="footer">
            <div>Doc. Ref: HCD-QF-MOT-010 </div>
            <div style="text-align: center;">Revision No.: 00</div>
            <div style="text-align: right;">Effectivity Date: November 04, 2022</div>
          </div>
        </v-sheet>
      </div>
    </body>


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
              style="width: 70%; font-size: 24px; font-weight: bold; text-align: left; border: 2px solid black; padding: 10px; line-height: normal;"
              class="text-uppercase text-center">
              PREVENTIVE MAINTENANCE CHECKLIST (Power Tools)


            </div>
          </div>

          <table class="mt-5" style="border-bottom: 2px solid black; border-top: 2px solid black;">
            <thead>
              <tr>
                <th class="empty-row" colspan="6"
                  style="text-align: left; border-bottom: 2px solid black; border-top: 2px solid black;">

                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in equipmentSection" :key="index">
                <td></td>
                <td>{{ row[0] || '' }}</td>
                <td></td>
                <td>{{ row[1] || '' }}</td>
                <td></td>
                <td>{{ row[2] || '' }}</td>
              </tr>
              <tr style="border-bottom: 2px solid black; border-top: 2px solid black;">
                <td colspan="6" class="empty-row"></td>
              </tr>

              <tr>
                <td rowspan="2"> Rating <br /> Legend</td>
                <td colspan="2">NA- Not Applicable </td>
                <td colspan="3">P- Passed in good working condition
                </td>
              </tr>
              <tr>
                <td colspan="2"> M- Passed but maintenance required</td>
                <td colspan="3">R - Rejected,
                  repair necessary before returning to service</td>
              </tr>

            </tbody>


          </table>
          <v-row no-gutters justify="center" class="mt-5">
            <v-col cols="5">
              <v-checkbox label="Equipment Passed" />
            </v-col>
            <v-col cols="5">
              <v-checkbox label="Equipment Not Passed" />
            </v-col>
          </v-row>


          <v-row no-gutters class="my-5">
            <v-col cols="4">
              <v-row no-gutters>
                <v-col cols="12" class="font-weight-bold">Work Required
                </v-col>
                <v-col cols="12">1.<input type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled></v-col>
                <v-col cols="12">2.<input type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled></v-col>
              </v-row>
            </v-col>
            <v-col cols="4">
              <v-row no-gutters>
                <v-col cols="12" class="font-weight-bold">Assigned To
                </v-col>
                <v-col cols="12"><input type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled></v-col>
                <v-col cols="12"><input type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled></v-col>
              </v-row>
            </v-col>
            <v-col cols="4">
              <v-row no-gutters>
                <v-col cols="12" class="font-weight-bold">Completion (Date/Time)
                </v-col>
                <v-col cols="12"><input type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled></v-col>
                <v-col cols="12"><input type="text"
                    style="flex-grow: 1; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);" disabled></v-col>
              </v-row>
            </v-col>
          </v-row>

          <div class="d-flex justify-center my-5">
            <v-row no-gutters justify="center" class="w-100 ">
              <v-col cols="6">
                <v-row no-gutters justify="center">
                  <v-col cols="12" class="text-center">
                    Repair Man Signature:
                  </v-col>
                  <v-col cols="12" class="d-flex justify-center mt-2">
                    <input type="text" style="width: 80%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                      disabled />
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="6">
                <v-row no-gutters justify="center">
                  <v-col cols="12" class="text-center">
                    Supervisor's Signature:
                  </v-col>
                  <v-col cols="12" class="d-flex justify-center mt-2">
                    <input type="text" style="width: 80%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                      disabled />
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>

          <div class="d-flex justify-center my-5">
            <v-row no-gutters justify="center" class="w-100">
              <v-col cols="4">
                <v-row no-gutters justify="center">
                  <v-col cols="12" class="font-weight-bold ">
                    Prepared By:
                  </v-col>
                  <v-col cols="12" class="d-flex justify-center mt-2">
                    <input type="text" style="width: 80%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                      disabled />
                  </v-col>
                  <v-col cols="12" class="text-center">
                    Repairman
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="4">
                <v-row no-gutters justify="center">
                  <v-col cols="12" class="font-weight-bold">
                    Checked By:
                  </v-col>
                  <v-col cols="12" class="d-flex justify-center mt-2">
                    <input type="text" style="width: 80%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                      disabled />
                  </v-col>
                  <v-col cols="12" class="text-center">
                    Maintenance Manager
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="4">
                <v-row no-gutters justify="center">
                  <v-col cols="12" class="font-weight-bold">
                    Approved By :
                  </v-col>
                  <v-col cols="12" class="d-flex justify-center mt-2">
                    <input type="text" style="width: 80%; border: none; border-bottom: 1px solid rgba(0, 0, 0, 0.38);"
                      disabled />
                  </v-col>
                  <v-col cols="12" class="text-center">
                    Office Manager
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>
          <div class="footer">
            <div>Doc. Ref: HCD-QF-MOT-010 </div>
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

const sections = ref([
  {
    title: "Fluid Levels",
    items: [
      ["Motor Oil", "Rear End", "Air Filter"],
      ["Radiator", "Brake Fluid", "Oil Change Required"],
      ["Power Steering", "Greasing Required", "Oil Filter Changed"],
      ["Windshield Washer", "", ""],
    ],
  },
  {
    title: "Driver's Compartment",
    items: [
      ["Sun Visors", "Hom & Switches", "Steering Power Assist"],
      ["Windshield Wipers", "Windshield Defrost", "Windshield"],
      ["Side Windows", "Beam Indicator", "Instrument Lamps"],
      ["Pedal Pads", "Fire Extinguisher", "Air Pressure Gauge"],
      ["Seats & Seatbelts", "Acc. Pedal & Air Throttle", "Steering Column Security"],
      ["Speedometer", "Compressed Air", ""],
      ["Compressor Buildups", "", ""],
      ["Air Leakage", "", ""],
    ],
  },
  {
    title: "Body Exterior",
    items: [
      ["Head Lamp Operation/Aim", "Clearance Lamps", "Identification Lamps"],
      ["Tail Lamps", "Stop Lamps", "Turn Signal Lamps"],
      ["Marker Lamps", "Hazard Lamps", "Reflex Reflectors"],
      ["Trailer Hitch", "TDG Placards", "Fenders/Mud Flaps"],
      ["Trailer Cord", "Paint", "Air Lines"],
      ["Tire Pressure", "", "Body & Doors"],
      ["Glad Hands & Air Systems", "", "Bumpers & Cabs"],
    ],
  },
  {
    title: "Under The Hood",
    items: [
      ["Hood", "Air Compressor Belt", "Air Compressor"],
      ["Power Steering System", "Fuel Pump and System", "Battery & Wiring"],
      ["Air Filter", "Fan & Belt", "Carburetor"],
      ["Cooling System", "Windshield Washer Pump", "Distributor"],
      ["Exhaust System", "Windshield Wash", ""],
      ["Container", "", ""],
    ],
  },
  {
    title: "Undercarraiage",
    items: [
      ["Pin & Bushing Wear", "Sprocket", "Springs"],
      ["Link Wear", "Shock Absorbers", "Muffler"],
      ["Roller Wear", "Oil Plan", "Pittman Arm"],
      ["Idler Wear", "Drag Link", "Differential"],
      ["Track Wear", "Tie Rod", "Suspension"],
      ["Roller Guards", "Frame Rails", "Axles"],
    ],
  },
])

const brakeSection = ref([
  ['Brake Components', 'Chock Block', 'Road Clearance'],
  ['Spring Caging Bolts', 'Brake Drum Condition', 'Brake Lining Thickness'],
  ['Disc Brakes', 'Brake Lines & Hoses', 'Brake Failure Indicator'],
  ['Reservoirs and Valves', 'Tire Pressure', 'Park Brake'],
  ['Wheel Bearings', 'Vacuum System, Reserve', 'Emergency Brake'],
  ['Proportioning Valve', 'Pump Operator', 'Brake Operation'],
  ['Brake Camshafts & Travel', 'Tire Wear', 'Jack'],
  ['Tire Iron', 'Spare Tire', 'Chains']
])
const equipmentSection = ref([
  ['Disc', 'Air Tank', 'Current Limiter'],
  ['Trigger Switch', 'Ball Bearing', 'Oil Chain Brake'],
  ['Spindle Lock', 'Drum Washer', 'Chain Gauge'],
  ['Handle / Grip (Front and Rear)', 'Throat Plate', 'Chain Motor'],
  ['Power Cord / Cable', 'Sander Bed', 'Copper Wirings'],
  ['Motor', 'Hex Key', 'Auxiliary Wirings'],
  ['Bearing Bracket', 'Table Insert', 'Auxiliary Powers'],
  ['Drill Bit', 'Sanding Sleeve', 'Switch Fuse'],
  ['Drill Spindle', 'Cutter Head', 'Welding Cable'],
  ['Connecting Thread', 'Chip Ejection', 'Ground Clamps'],
  ['Wheel Bearings', 'Lock-on Button', 'Welding Electrode'],
  ['Belt - Driven Pump', 'Blades', 'Oscillating Tube'],
  ['Cylinder Tank', 'Champering Groove', 'Transformer'],
  ['Sanding Pad Brake', 'Adjust Knob', 'Compressor'],
  ['Velcro', 'Sole Plate', 'Lubricant'],
  ['Sanding Orbit', 'Blade Adjustment', 'Air Hose'],
  ['Power Switch', 'Chain Blade', 'Chisel'],
  ['Oscillating Circuit', 'Nozzle', 'Oil Flow'],
  ['Breaker', 'Chuck', 'Reverse Switch'],
  ['Torque Selection Ring', 'Oil Reservoir / Tank', 'Shank'],
  ['Sanding Attachments']
])

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
  font-size: 14px;
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
  padding: 4px;
  font-size: 12px;
  line-height: normal;
  word-break: break-word;
  font-weight: normal;
  min-width: 50px;
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
    width: 210mm;
    height: 297mm;
    box-shadow: none;
  }

  .d-print-none {
    display: none !important;
  }
}
</style>
