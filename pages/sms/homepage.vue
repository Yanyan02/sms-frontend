<template>
  <div>
    <div class="printable-page">
      <div class="pa-5">
        <div><v-img src="/footer.png" /></div>
        <hr />
        <div class="text-center">
          <div class="font-weight-bold text-h6">Career Executive Service Performance Evaluation System</div>
          <div class="font-weight-bold text-secondary-1">CESPES Rating Period _</div>
        </div>

        <div class="pl-5">
          <div>N/A</div>
          <div>N/A</div>
          <div>Department Of Education</div>
          <div>N/A</div>
        </div>

        <hr />

        <div class="mx-5">
          <div class="font-weight-bold pb-1">
            DETAILS
            <input type="text" style="flex-grow: 1; border: none; border-bottom: 1px solid black; width: 100px;"
              disabled />
          </div>

          <div class="mb-10" v-for="(detail, index) in details" :key="index">
            <table>
              <thead>
                <tr>
                  <th width="80%">{{ detail.dimension }}</th>
                  <th width="20%" class="text-center">Net Points</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, key) in detail.ratings" :key="key">
                  <td>{{ key }}</td>
                  <td class="text-center">{{ value?.toFixed(2) }}</td>
                </tr>
                <tr v-for="(value, i) in detail.average" :key="i" style="background-color: rgb(236, 235, 235);">
                  <td class="text-end"><strong>{{ i }}</strong></td>
                  <td class="text-center"><strong>{{ value?.toFixed(2) }}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>


          <div class="mb-10" v-for="(detail, index) in details2" :key="index">
            <table>
              <thead>
                <tr>
                  <th width="60%">{{ detail.section }}</th>
                  <th width="20%" class="text-center">Weight</th>
                  <th width="20%" class="text-center">Net Score</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, key) in detail.entries" :key="key">
                  <td>{{ value.label }}</td>
                  <td class="text-center">{{ value.weight }}</td>
                  <td class="text-center">{{ value.score }}</td>
                </tr>
                <tr style="background-color: rgb(236, 235, 235);">
                  <td><strong>{{ detail.total.label }}</strong></td>
                  <td></td>
                  <td class="text-center"><strong>{{ detail.total.score.toFixed(2) }}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <table class="mt-10">
              <thead>
                <tr style="background-color: rgb(236, 235, 235);">
                  <th width="60%">CESPES Final Rating</th>
                  <th width="20%" class="text-end">Outstanding</th>
                  <th width="20%" class="text-center">5.00</th>
                </tr>
              </thead>
            </table>
          </div>

        </div>
      </div>
    </div>

    <!-- Page 2 -->
    <div class="printable-page">
      <div class="pa-5">
        <div class="px-5">
          <div class="font-italic text-center">Date of Printing: 2025-03-12</div>
          <div>
            <div>N/A</div>
            <div>N/A</div>
            <div>Department of Education</div>
          </div>
        </div>
        <hr />
        <div class="px-5">
          <table>
            <thead>
              <tr>
                <th class="text-center font-weight-bold">Dimension</th>
                <th class="text-center font-weight-bold">Development Needs</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-row">
                <td>Strategic and Critical Thinking</td>
                <td>National Development Issues and Concerns</td>
              </tr>
              <tr class="table-row">
                <td>Leading in a Continuously Changing Environment</td>
                <td>Managing Change</td>
              </tr>
            </tbody>
          </table>
          <div class="text-center font-weight-bold">
            This is a system-generated document. No signature is required.
          </div>
          <div>
            <div>
              Notice: In case of discrepancies, contact
              <a>cespes@cesboard.gov.ph</a>.
            </div>
            <div class="my-2">
              This document is strictly private, confidential, personal, and intended solely for the use
              of the individual to whom it is addressed. If you are not the intended recipient, you are notified
              that disclosing, copying, distributing, or taking any action in reliance on the contents of this
              information is strictly prohibited. Please notify the sender immediately at
              <a>cespes@cesboard.gov.ph</a> if you have received this by mistake.
            </div>
            <div>
              This document must be authenticated and must bear signatures of authorized person/s when used for legal
              purposes.
            </div>
            <div class="text-center font-italic mt-3">Date of Printing: 2025-03-12</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Print/Back Buttons -->
    <div style="position: fixed; bottom: 20px; right: 20px;" class="d-print-none">
      <v-btn color="primary" icon="mdi-printer" size="large" class="mb-2" @click="print()" />
      <br />
      <v-btn icon="mdi-keyboard-return" size="large" @click="$router.back()" />
    </div>
  </div>
</template>

<script lang="ts" setup>

const finale_date = ref([
  {
    "title": "Core Behavioral",
    "competencies": [
      {
        "title": "Self Management",
        "criteria": [
          {
            "title": "Sets personal goals and direction, needs and development.",
            "rating": 1
          },
          {
            "title": "Undertakes personal actions and behaviors that are clear and purposeful and takes into account personal goals and values congruent to that of the organization",
            "rating": 1
          },
          {
            "title": "Displays emotional maturity and enthusiasm and is challenged by higher goals.",
            "rating": 1
          },
          {
            "title": "Prioritize work tasks and schedules (through Gantt charts, checklists, etc) to achieve goals.",
            "rating": 1
          },
          {
            "title": "Sets high quality, challenging, realistic goals for self and others.",
            "rating": 1
          }
        ],
        "active": true
      },
      {
        "title": "Professionalism and Ethics",
        "criteria": [
          {
            "title": "Demonstrates the values and behavior enshrined in the Norms of Conduct and Ethical Standards for public officials and employees (RA 6713).",
            "rating": 1
          },
          {
            "title": "Practices ethical and professional behavior and conduct taking into account the impact of his/her actions and decisions.",
            "rating": 1
          },
          {
            "title": "Maintains a professional image: being trustworthy, regularity of attendance and punctuality, good grooming and communication.",
            "rating": 1
          },
          {
            "title": "Makes personal sacrifices to meet the organization's needs.",
            "rating": 1
          },
          {
            "title": "Acts with a sense of urgency and responsibility to meet the organization's needs, improve systems and help others improve their effectiveness.",
            "rating": 1
          }
        ],
        "active": false
      },
      {
        "title": "Result Focus",
        "criteria": [
          {
            "title": "Achieves results with optimal use of time and resources most of the time.",
            "rating": 1
          },
          {
            "title": "Avoids rework, mistakes and wastage through effective work methods by placing organization needs before personal needs.",
            "rating": 1
          },
          {
            "title": "Delivers error-free outputs most of the time by conforming to standard operating procedures correctly and consistently. Able to produce very satisfactory quality of work in terms of usefulness/acceptability and completeness with no supervision required.",
            "rating": 1
          },
          {
            "title": "Expresses a desire to do better and may express frustration at waste or inefficiency. May focus on new or more precise ways of meeting goals set.",
            "rating": 1
          },
          {
            "title": "Makes specific changes in the system or in own work methods to improve performance. Examples may include doing something better, faster, at a lower cost, more efficiently; or improving quality, customer satisfaction, morale, without setting any goal.",
            "rating": 1
          }
        ],
        "active": false
      },
      {
        "title": "Teamwork",
        "criteria": [
          {
            "title": "Willing does his/her share of responsibility",
            "rating": 1
          },
          {
            "title": "Promotes collaboration and removes barriers to teamwork and goal accomplishment across the organization.",
            "rating": 1
          },
          {
            "title": "Applies negotation principles in arriving at win-win agreements.",
            "rating": 1
          },
          {
            "title": "Drives consensus and team ownership of decisions.",
            "rating": 1
          },
          {
            "title": "Works constructively and collaboratively with others and across organizations to accomplish organizational goals and objectives.",
            "rating": 1
          }
        ],
        "active": false
      },
      {
        "title": "Service Orientation",
        "criteria": [
          {
            "title": "Can explain and articulate organizational directions, issues and problems.",
            "rating": 1
          },
          {
            "title": "Takes personal responsibility for dealing with and/or correcting customer service issues and concerns.",
            "rating": 1
          },
          {
            "title": "Initiates activities that promotes advocacy for men and women empowerment.",
            "rating": 1
          },
          {
            "title": "Participates in updating of office vision, mission, mandates and strategies based on DepEd strategies and directions.",
            "rating": 1
          },
          {
            "title": "Develops and adopts service improvement programs through simplified procedures that will further enhance service delivery.",
            "rating": 1
          }
        ]
      },
      {
        "title": "Innovation",
        "criteria": [
          {
            "title": "Examines the root cause of problems and suggests effective solutions. Fosters new ideas, processes and suggests better ways to do things (cost and/or operational efficiency).",
            "rating": 1
          },
          {
            "title": "Demonstrates an ability to think \"beyond the box\" Continuously focuses on improving personal productivity to create higher value results.",
            "rating": 1
          },
          {
            "title": "Promotes a creative climate and inspires co-workers to develop original ideas or solutions.",
            "rating": 1
          },
          {
            "title": "Translates creative thinking into tangible changes and solutions that improve the work unit and organization.",
            "rating": 1
          },
          {
            "title": "Uses ingenious methods to accomplish responsiblities. Demonstrates resourcefullness and the ability to succeed within minimal resources.",
            "rating": 1
          }
        ],
        "active": false
      },
      {
        "title": "Gender Sensitivity",
        "criteria": [
          {
            "title": "Recognizes and respects individual differences.",
            "rating": 1
          },
          {
            "title": "Does not discriminate persons on the basis of Sexual Orientation, Gender Identity, Gender Expression, and Sex Characteristics (SOGIESC).",
            "rating": 1
          },
          {
            "title": "Promotes gender equality, diversity, and inclusion in the workplace.",
            "rating": 1
          },
          {
            "title": "Has zero-tolerance to gender-biases, discriminatory and exclusionary behaviors and practices.",
            "rating": 1
          },
          {
            "title": "Taking affirmatice action to address gender inequalities.",
            "rating": 1
          }
        ],
        "active": false
      }
    ]
  },
  {
    "title": "Core Skills",
    "competencies": [
      {
        "title": "Oral Communication",
        "criteria": [
          {
            "title": "Follows instructions accurately.",
            "rating": 1
          },
          {
            "title": "Expresses self clearly, fluently, and articulately.",
            "rating": 1
          },
          {
            "title": "Uses appropriate medium for the message.",
            "rating": 1
          },
          {
            "title": "Adjust communication style to others.",
            "rating": 1
          },
          {
            "title": "Guides discussions between and among peers to meet an objective.",
            "rating": 1
          }
        ],
        "active": false
      },
      {
        "title": "Written Communication",
        "criteria": [
          {
            "title": "Knows the different written business communication formats used in DepEd.",
            "rating": 1
          },
          {
            "title": "Writes routine correspondence/communications, narrative and descriptive report based on readily available information data with minimal spelling or grammatical error/s (e.g memos, minutes, etc).",
            "rating": 1
          },
          {
            "title": "Secures information from required references (i.e Directories, schedules, notices, instructions) for specific purposes.",
            "rating": 1
          },
          {
            "title": "Self-edits words, numbers, phonetic notation and content if necessary.",
            "rating": 1
          },
          {
            "title": "Demonstrates clarity, fluency, impact, conciseness and effectiveness in his/her written communications.",
            "rating": 1
          }
        ],
        "active": false
      },
      {
        "title": "Computer/ICT Skills",
        "criteria": [
          {
            "title": "Prepares basic compositions (e.g letters, reports, spreadsheets and graphic presentation using Word Processing and Excel.",
            "rating": 1
          },
          {
            "title": "Identifies different computer parts, turns the computer on/off, and work on a given task with acceptable speed and accuracy and connects computer peripherals (e.g Printers, Modems, Multimedia Projectors, etc.).",
            "rating": 1
          },
          {
            "title": "Prepares simple presentation using Powerpoint",
            "rating": 1
          },
          {
            "title": "Utilizes technologies to: access information to enhance professional productivity, assists in conducting research and communicate through local and global professional networks.",
            "rating": 1
          },
          {
            "title": "Recommends appropriate and updated technology to enhance productivity and professional practice.",
            "rating": 1
          }
        ],
        "active": false
      }
    ]
  }
])
const details = ref([
  {
    dimension: "Subordinate / Peer Net Points",
    ratings: {
      "Strategic and Critical Thinking": 5.0,
      "Leading in a Continuously Changing Environment": 5.0,
      "Developing/Empowering Others to Establish Collective Accountability for Results": 5.0,
      "Linkaging and Networking for Productive Partnerships": 5.0,
      "Planning and Organizing for Greater Impact": 5.0,
      "Driving Performance for Integrity and Service": 5.0,
    },
    average: {
      "Subordinate / Peer Average Rating": 5.0,
    },
  },
  {
    dimension: "Superior",
    ratings: {
      "Strategic and Critical Thinking": 5.0,
      "Leading in a Continuously Changing Environment": 5.0,
      "Developing/Empowering Others to Establish Collective Accountability for Results": 5.0,
      "Linkaging and Networking for Productive Partnerships": 5.0,
      "Planning and Organizing for Greater Impact": 5.0,
      "Driving Performance for Integrity and Service": 5.0,
    },
    average: {
      "Superior Average Rating": 5.0,
    },
  },
]);

const details2 = ref([
  {
    section: "Behavioral Competency Scale",
    entries: [
      { label: "Subordinate / Peer", weight: "50%", score: 2.5 },
      { label: "Superior", weight: "50%", score: 2.5 },
    ],
    total: { label: "Behavioral Competency Scale Rating (20%)", score: 5.0 },
  },
  {
    section: "Performance Evaluation on Accomplishments",
    entries: [
      { label: "Individual Performance Commitment and Accountability", weight: "80%", score: 4.0 },
      { label: "Innovating and Intervening Accomplishments", weight: "20%", score: 1.0 },
    ],
    total: { label: "Performance Contract Rating (80%)", score: 5.0 },
  },
]);

function print() {
  window.print();
}
</script>

<style scoped>
.printable-page {
  width: 210mm;
  /* height: 297mm; */
  margin: 0 auto;
  box-shadow: 0 0.5mm 2mm rgba(0, 0, 0, 0.3);
}

* {
  font-size: 13px;
}

.table-row {
  height: 10vh;
}

.table-row td {
  border: 1px solid black;
  padding: 5px;
  vertical-align: top;
  text-align: left;
}

hr {
  border: none;
  height: 2px;
  background-color: #333;
  margin: 2px 0;
}

table {
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  padding: 3px;
  line-height: normal;
  word-break: break-word;
  text-align: start;
}

thead th {
  background-color: rgb(236, 235, 235);
  font-weight: bold;
  padding: 5px;
}

tbody td {
  background-color: transparent;
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
