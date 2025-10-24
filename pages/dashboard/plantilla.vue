<template>
  <table class="styled-table">
    <thead>
      <tr>
        <th>Office</th>
        <th>Name</th>
        <th>Position</th>
        <th>Item Number</th>
      </tr>
    </thead>
    <tbody>
      {{ plantilla.length }}
      <tr v-for="(person, index) in plantilla" :key="index">
        <!-- <td>{{ person.office }}</td>
        <td>{{ person.name }}</td>
        <td>{{ person.position }}</td> -->
        <td>{{ person.item_number }}</td>
      </tr>
    </tbody>
  </table>

</template>

<script setup>
const plantilla = [
  {
    "office": "Office of RD Proper",
    "name": "JOCELYN DR. ANDAYA",
    "position": "DIRECTOR IV (Regional Director), CONCURRENT OIC-OFFICE OF ASST. SECRETARY FOR OPERATIONS",
    "item_number": "OSEC-DECSB-DIR4-30001-1998"
  },
  {
    "office": "Office of RD Proper",
    "name": "VIRGINIA P. MONTEZA",
    "position": "ADAS III",
    "item_number": "OSEC-DECSB-ADAS3-30101-2004"
  },
  {
    "office": "Office of RD Proper",
    "name": "ISABEL P. FELEO",
    "position": "ADA-VI",
    "item_number": "OSEC-DECSB-ADA6-30099-2004"
  },
  {
    "office": "Office of RD Proper",
    "name": "EDISON S. NARIDO",
    "position": "ADA-I",
    "item_number": "OSEC-DECSB-ADA2-30057-2004"
  },

  {
    "office": "Office of RD Proper",
    "name": "CRISTITO A. ECO",
    "position": "DIRECTOR III - reassigned to Deped Region VI as OIC RD",
    "item_number": "OSEC-DECSB-DIR3-30001-1998"
  },
  {
    "office": "Office of the ARD",
    "name": "MA CYNTHIA P. OROZCO",
    "position": "ADAS-I",
    "item_number": "OSEC-DECSB-ADAS1-30027-2015"
  },
  {
    "office": "Office of the ARD",
    "name": "MELISSA D. AMADA",
    "position": "AO II",
    "item_number": "OSEC-DECSB=ADOF2-30034-2021"
  },
  {
    "office": "Legal Unit",
    "name": "ANALIZA G. ESPERANZA",
    "position": "ATTORNEY IV (Unit Head)",
    "item_number": "OSEC-DECSB-ATY4-30013-2015"
  },
  {
    "office": "Legal Unit",
    "name": "MARIA HANNAH D. PEREZ",
    "position": "ATTORNEY III",
    "item_number": "OSEC-DECSB-ATY3-30001-2021"
  },
  {
    "office": "Legal Unit",
    "name": "YASSEMA C. MACABANDO",
    "position": "SPEC. INVESTIGATOR III",
    "item_number": "OSEC-DECSB-SPI3-30009-2015"
  },
  {
    "office": "Legal Unit",
    "name": "MARILEN G. REYES",
    "position": "ADAS-I",
    "item_number": "OSEC-DECSB-ADAS1-30026-2015"
  },
  {
    "office": "Legal Unit",
    "name": "FREDDIE E. ROMANCE JR",
    "position": "ADA-VI",
    "item_number": "OSEC-DECSB-ADA6-30106-2004"
  },
  {
    "office": "Legal Unit",
    "name": "VACANT",
    "position": "LEGAL ASSISTANT II",
    "item_number": "OSEC-DECSB-LEA2-30027-2015"
  },
  {
    "office": "ICT Unit",
    "name": "GERRIE RODERIC A. PADILLA",
    "position": "ITO-I (Unit Head)",
    "item_number": "OSEC-DECSB-ITO1-30012-2015"
  },
  {
    "office": "ICT Unit",
    "name": "GINA M. GALVEZ",
    "position": "COM. PROG. II",
    "item_number": "OSEC-DECSB-COMPRO2-30008-2015"
  },
  {
    "office": "ICT Unit",
    "name": "DANIEL MORRIS O. DIMAGIBA",
    "position": "Computer Maintenance Technologist I",
    "item_number": "OSEC-DECSB-CTMT1-30026-2015"
  },
  {
    "office": "Public Affairs Unit",
    "name": "VACANT",
    "position": "AO-V (for publication)",
    "item_number": "OSEC-DECSB-ADOF5-30011-2004"
  },
  {
    "office": "Public Affairs Unit",
    "name": "RICHARD T. VIDAL",
    "position": "EPS II - OIC in concurrent capacity",
    "item_number": "OSEC-DECSB-EPS2-30001-1998"
  },
  {
    "office": "Public Affairs Unit",
    "name": "AL-NEMERY M. GANGCO",
    "position": "PDO-II",
    "item_number": "OSEC-DECSB-PDO2-30007-2015"
  },
  {
    "office": "Public Affairs Unit",
    "name": "EDUARDO A. ABUTAL",
    "position": "ADAS V",
    "item_number": "OSEC-DECSB-ADAS5-30104-2004"
  },
  {
    "office": "Learners Right & Protection Office",
    "name": "LEONILA C. MUSTAPHA",
    "position": "EPS",
    "item_number": "OSEC-DECSB-EPSVR-30147-2010"
  },
]
</script>
<style scoped>
table {
  border-collapse: collapse;

}

th,
td {
  border: 1px solid black;
  padding: 0px;

  text-align: left;
}
</style>