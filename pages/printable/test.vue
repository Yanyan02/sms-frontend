<template>
  <div>

    <body class="printable-page pa-5">
      <div class="d-flex flex-wrap">
        <v-sheet v-for="(code, index) in codes" :key="index" flat class="py-2 ma-1 text-center" color="green-lighten-5"
          outlined style="border: 1px solid #4CAF50; width: calc(70% - 16px); line-height: 14px;">
          <div class="mx-auto">{{ code.name }}</div>
          <i style="font-size: 11px;" class="font-weight-regular"> ({{ code.department }})</i>
        </v-sheet>
        <v-sheet v-for="(code, index) in shorts" :key="index" flat class="py-2 px-4 ma-1 text-center"
          color="green-lighten-5" outlined
          style="border: 1px solid #4CAF50; width: calc(20% - 16px); font-size: 16px; line-height: 12px;">
          {{ code }} <br />
          <i style="font-size: 11px;" class="font-weight-regular"> (Warehouse)</i>
        </v-sheet>
      </div>
    </body>

    <!-- <body class="printable-page pa-5">
      <div class="d-flex flex-wrap">
        <v-sheet v-for="(code, index) in shorts" :key="index" flat class="py-2 px-4 ma-1 text-center"
          color="green-lighten-5" outlined
          style="border: 1px solid #4CAF50; width: calc(20% - 16px); font-size: 16px; line-height: 12px;">
          {{ code }} <br />
          <i style="font-size: 11px;" class="font-weight-regular"> (Warehouse)</i>
        </v-sheet>
      </div>

    </body> -->


  </div>
</template>

<script lang="ts" setup>

const codes = [

  { name: "TRIP TICKETS & DIESEL/GAS REQUISITION", department: "Motorpool" },
  { name: "TOOLBOX MEETING", department: "Operations" },
  { name: "DAILY ACTIVITY REPORT", department: "Operations" },
  { name: "MONTH ACTIVITY REPORT", department: "Operations" },
  { name: "WEEKLY OPERATIONS REPORT", department: "Operations" },
  { name: "PREVENTIVE MAINTENANCE SCHEDULE", department: "Motorpool" },
  { name: "ANNUAL CALIBRATION PLAN", department: "Motorpool" },


  { name: "PURCHASE REQUISITION", department: "Purchasing" },
  { name: "PURCHASE ORDER", department: "Purchasing" },
  { name: "CANVASS SHEET", department: "Purchasing" },
  { name: "MATERIAL RECEIVING REPORT", department: "Purchasing" },


  { name: "STOCK CARDS", department: "Warehouse" },
  { name: "BORROWERS LOGSHEET", department: "Warehouse" },
  { name: "TOOLS INVENTORY", department: "Warehouse" },
  { name: "MATERIALS INVENTORY", department: "Warehouse" },

  { name: "NEK 1990", department: "Motorpool" },
  { name: "MAM 8604", department: "Motorpool" },
  // { name: "MAK 9583", department: "Motorpool" },
  // { name: "NBY 6847", department: "Motorpool" },
  // { name: "NAL 6479", department: "Motorpool" },
  // { name: "WJQ 626", department: "Motorpool" },
  // { name: "RJU 375", department: "Motorpool" },
  // { name: "AAT 2558", department: "Motorpool" },
  // { name: "WQQ 528", department: "Motorpool" },
  // { name: "Backhoe (BH1)", department: "Motorpool" },
  // { name: "Backhoe (BH2)", department: "Motorpool" },
  // { name: "Backhoe (BH3)", department: "Motorpool" },
  // { name: "Bagger Mixer (BM1)", department: "Motorpool" },
  // { name: "Bagger Mixer (BM2)", department: "Motorpool" },
  // { name: "KOMATSU L (KL1)", department: "Motorpool" },
  // { name: "Road Roller (RD1)", department: "Motorpool" },
  // { name: "Road Roller (RD2)", department: "Motorpool" },
  // { name: "Bulldozer KOmatsu (BD1)", department: "Motorpool" },
  // { name: "Hitachi Barbender (HB1)", department: "Motorpool" },
  // { name: "Generator Airman (GN1)", department: "Motorpool" },
  {
    name: "Bobcat Skid Loader (BL1)", department: "Motorpool"
  },
  // { name: "Payloader (PL1)", department: "Motorpool" },
  { name: "Electric Hand Drill (HD1)", department: "Motorpool" },
  { name: "Electric Hand Drill (HD2)", department: "Motorpool" },
  { name: "Electric Hand Drill (HD3)", department: "Motorpool" },
  { name: "Electric Hand Drill (HD4)", department: "Motorpool" },
  { name: "Grinder (G1)", department: "Motorpool" },
  { name: "Grinder (G2)", department: "Motorpool" },
  { name: "Chipping Gun (CG1)", department: "Motorpool" },
  // { name: "Electric Jack Hammer (JH1)", department: "Motorpool" },
];


const shorts = [

  "HD1",
  "HD2",
  "HD3",
  "HD4",
  "G1",
  "G2",
  "GG1",
  "JH1",
  "CS1",
  "CS2",
  "WM1",
]


</script>

<style scoped>
.printable-page {
  width: 210mm;
  min-height: 297mm;
  margin: 0 auto;
  box-shadow: 0 0.5mm 2mm rgba(0, 0, 0, 0.3);
}

* {
  font-size: 12px;
  font-weight: bold;
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
