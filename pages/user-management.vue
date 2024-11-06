<template>
    <div>

        <v-row no-gutters>
            <v-col cols="8">
                <v-btn prepend-icon="mdi-pencil-plus" @click="user_invite_dialog = true" color="primary">
                    Invite
                    User</v-btn>

                <commons-sms class="my-2 mr-3 " title="USER MANAGEMENT" subtitle="A brief overview of users."
                    rounded="lg" :items="users_data" :display_types="['grid', 'table']">
                    <template v-slot:item="{ value, index, display }">
                        <v-card :key="index" border class="pa-2 ma-1" rounded="lg">
                            <div class="d-flex mb-1">
                                <div class="text-uppercase  text-indigo text-body-1"> {{ value.first_name
                                    }}
                                    {{
                                        value.last_name }}
                                </div>
                                <v-spacer />
                                <div> <v-chip density="compact" class="text-uppercase text-overline"
                                        :color="value.status === 'invited' ? 'error' : 'success'">{{
                                            value.status }}</v-chip></div>
                            </div>
                            <div> {{ value.role }} <span v-if="value.division"> of
                                    {{
                                        value.division.title
                                    }}</span>
                            </div>
                            <div class="text-caption text-capitalize mb-2">{{ value.side }}</div>


                            <div class="text-caption "> <v-icon color="red-lighten-3"> mdi-email</v-icon> <u
                                    class="text-blue">{{
                                        value.email }}</u>
                            </div>

                            <div class="mt-2">
                                <v-menu :close-on-content-click="false" location="end">
                                    <template v-slot:activator="{ props }">
                                        <v-btn v-bind="props" density="compact" color="primary">
                                            Manage</v-btn>
                                    </template>

                                    <v-card min-width="300">
                                        <v-list>
                                            <v-list-item title="Manage User">
                                                <template v-slot:append>
                                                    <v-icon color="indigo" size="24">mdi-human</v-icon>
                                                </template>
                                            </v-list-item>
                                        </v-list>

                                        <v-divider></v-divider>

                                        <v-list lines="two">
                                            <v-list-item title="Update Account" subtitle="Update and modify an account."
                                                @click="update_invite_dialog = true">
                                                <template v-slot:prepend>
                                                    <v-icon color="primary" size="22">mdi-account-edit-outline</v-icon>
                                                </template>
                                            </v-list-item>
                                            <v-list-item title="Suspend Account"
                                                subtitle="Suspend account for a soecific reason.">
                                                <template v-slot:prepend>
                                                    <v-icon color="primary" size="22">mdi-account-off</v-icon>
                                                </template>
                                            </v-list-item>



                                        </v-list>
                                        <v-card-actions>
                                            <v-spacer />
                                            <v-btn variant="text" color="error">
                                                Close </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-menu>
                            </div>

                        </v-card>
                    </template>
                    <template v-slot:table="{ items }">
                        <v-sheet border> <v-data-table :items="items" :headers="user_headers">
                                <template v-slot:item.full_name="{ item }">
                                    <span color="primary" density="compact">{{ item.selectable.first_name }} {{
                                        item.selectable.last_name }}
                                    </span>
                                </template>
                                <template v-slot:item.email="{ item }">
                                    <i class="text-blue" density="compact">{{
                                        item.selectable.email }}
                                    </i>
                                </template>
                                <template v-slot:item.status="{ item }">
                                    <p density="compact" class="text-uppercase text-overline"
                                        :class="value.status === 'invited' ? 'text-error' : 'text-success'">{{
                                            item.selectable.status }}</p>
                                </template>
                                <template v-slot:item.actions="{ item }">
                                    <v-menu :close-on-content-click="false" location="end">
                                        <template v-slot:activator="{ props }">
                                            <v-btn v-bind="props" density="compact" color="primary">
                                                Manage</v-btn>
                                        </template>

                                        <v-card min-width="300">
                                            <v-list>
                                                <v-list-item title="Manage User">
                                                    <template v-slot:append>
                                                        <v-icon color="indigo" size="24">mdi-human</v-icon>
                                                    </template>
                                                </v-list-item>
                                            </v-list>

                                            <v-divider></v-divider>

                                            <v-list lines="two">
                                                <v-list-item title="Update Account"
                                                    subtitle="Update and modify an account."
                                                    @click="update_invite_dialog = true">
                                                    <template v-slot:prepend>
                                                        <v-icon color="primary"
                                                            size="22">mdi-account-edit-outline</v-icon>
                                                    </template>
                                                </v-list-item>
                                                <v-list-item title="Suspend Account"
                                                    subtitle="Suspend account for a soecific reason.">
                                                    <template v-slot:prepend>
                                                        <v-icon color="primary" size="22">mdi-account-off</v-icon>
                                                    </template>
                                                </v-list-item>



                                            </v-list>
                                            <v-card-actions>
                                                <v-spacer />
                                                <v-btn variant="text" color="error">
                                                    Close </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-menu>
                                </template>

                            </v-data-table></v-sheet>
                    </template>
                </commons-sms>

            </v-col>
            <v-col cols="4" class="mt-11">
                <v-card color="grey-lighten-5">
                    <v-toolbar class="d-block border" extension-height="64" color="grey-lighten-2"
                        :extended="Boolean($attrs.extended)">
                        <v-toolbar-title>
                            School Division Office
                        </v-toolbar-title>
                        <v-spacer />
                        <v-tooltip text="Click to add Education" location="top">
                            <template v-slot:activator="{ props }">
                                <v-btn prepend-icon="mdi-pencil-plus" @click="create_sdo_dialog = true" v-bind="props"
                                    color="indigo">Add SDO</v-btn>
                            </template>
                        </v-tooltip>
                    </v-toolbar>
                    <v-card-text>
                        <v-alert class="maintenance-item elevation-2 mb-4" v-for="(sdo, index) in sdo_data" :key="index"
                            rounded="lg" :class="{ 'elevation-4': is_hovered }" border="start" border-color="amber"
                            color="white">
                            <div class="font-weight-bold text-uppercase 
">{{ sdo.title }}
                            </div>
                            <div>
                                <v-icon color="blue-lighten-2"> mdi-map-marker</v-icon> {{
                                    sdo.address }}
                            </div>


                            <div class=" text-blue font-italic text-decoration-underline">
                                <v-icon color="red"> mdi-email</v-icon> {{ sdo.email }}
                            </div>

                            <div class="mt-2"> <v-menu :close-on-content-click="false" location="end">
                                    <template v-slot:activator="{ props }">
                                        <v-btn v-bind="props" density="compact" color="amber">
                                            Manage</v-btn>
                                    </template>
                                    <v-card min-width="300">
                                        <v-list>
                                            <v-list-item title="Manage School Division Office" />
                                        </v-list>

                                        <v-divider></v-divider>

                                        <v-list lines="two">
                                            <v-list-item title="View" subtitle="View sdo users."
                                                @click="route_to_sdo(sdo._id)">
                                                <template v-slot:prepend>
                                                    <v-icon color="primary" size="22">mdi-eye-outline</v-icon>
                                                </template>
                                            </v-list-item>
                                            <v-list-item title="Update/Suspend" subtitle="Modify and suspend sdo."
                                                @click="update_sdo_dialog = true">
                                                <template v-slot:prepend>
                                                    <v-icon color="primary" size="22">mdi-account-off</v-icon>
                                                </template>
                                            </v-list-item>
                                        </v-list>
                                        <v-card-actions>
                                            <v-spacer />
                                            <v-btn variant="text" color="error">
                                                Close </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-menu></div>


                        </v-alert>
                    </v-card-text>

                </v-card>



            </v-col>



        </v-row>



        <!-- Dialog -->
        <v-dialog v-model="user_invite_dialog" max-width="40%">
            <v-sheet>
                <v-toolbar color="indigo" border>
                    <v-list-item class="pl-2" density="compact">
                        <template v-slot:prepend>
                            <v-avatar class="mr-1" variant="text">
                                <v-icon icon="mdi-account" dark />
                            </v-avatar>
                        </template>
                        <v-list-item-title> USER INVITE FORM</v-list-item-title>
                        <v-list-item-subtitle> Enter User Information</v-list-item-subtitle>
                    </v-list-item>
                    <v-spacer />
                    <v-btn @click="user_invite_dialog = false" class="mr-0" rounded="0" icon="mdi-close" />
                </v-toolbar>
                <v-card-text>
                    <v-form ref="user_form">
                        <v-row dense>

                            <v-col cols="12"><v-text-field v-model="invitation_form.email" density="compact"
                                    label="Email address" prepend-inner-icon="mdi-email-outline" required
                                    :rules="[(v) => /.+@.+/.test(v) || 'Invalid Email address']" /></v-col>
                            <v-col cols="4"><v-text-field v-model="invitation_form.first_name" density="compact"
                                    hide-details="auto" label="Firstname" required
                                    :rules="[v => !!v || 'Firstname is required']" /></v-col>
                            <v-col cols="4"><v-text-field v-model="invitation_form.middle_name" density="compact"
                                    hide-details="auto" label="Middlename" /></v-col>
                            <v-col cols="4"><v-text-field v-model="invitation_form.last_name" density="compact"
                                    hide-details="auto" label="Lastname" required
                                    :rules="[v => !!v || 'Lastname is required']" /></v-col>

                            <v-col cols="12"> Roles and Designation </v-col>
                            <v-col cols="6"><v-select v-model="invitation_form.side" label="Type" :items="['SDO', 'RO']"
                                    hide-details="auto" required :rules="[v => !!v || 'Type is required']" /></v-col>
                            <v-col cols="6" v-if="invitation_form.side === 'SDO'">
                                <v-select v-model="invitation_form.designation.division" :items="sdo_data"
                                    label="Division" item-value="_id" hide-details="auto" /></v-col>
                            <v-col cols="6">
                                <v-select v-model="invitation_form.apts" :items="ro_roles" item-title="name"
                                    return-object label="Role" hide-details="auto" item-value="_id"
                                    :rules="[v => !!v || 'Role is required']" />
                            </v-col>


                        </v-row>


                    </v-form>
                </v-card-text>
                <v-divider />
                <v-card-actions>
                    <v-row dense justify="center">
                        <v-col cols="4">
                            <v-btn @click="invite_user" variant="tonal" color="indigo" block>
                                <v-icon class="pr-2" size="28"> mdi-message-text-fast</v-icon> Send Invite
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-sheet>
        </v-dialog>
        <v-dialog v-model="update_invite_dialog" max-width="40%">
            <v-sheet>
                <v-toolbar color="indigo" border>
                    <v-list-item class="pl-2" density="compact">
                        <template v-slot:prepend>
                            <v-avatar class="mr-1" variant="text">
                                <v-icon icon="mdi-account" dark />
                            </v-avatar>
                        </template>
                        <v-list-item-title> Update User Information</v-list-item-title>
                        <v-list-item-subtitle> Modify User Information</v-list-item-subtitle>
                    </v-list-item>
                    <v-spacer />
                    <v-btn @click="update_invite_dialog = false" class="mr-0" rounded="0" icon="mdi-close" />
                </v-toolbar>
                <v-card-text>
                    <v-form ref="user_form">
                        <v-row dense>
                            <v-col cols="12">
                                <v-text-field v-model="user.email" density="compact" label="Email address"
                                    prepend-inner-icon="mdi-email-outline" required
                                    :rules="[(v) => /.+@.+/.test(v) || 'Invalid Email address']" /></v-col>
                            <v-col cols="4"><v-text-field v-model="user.first_name" density="compact"
                                    hide-details="auto" label="Firstname" required
                                    :rules="[v => !!v || 'Firstname is required']" /></v-col>
                            <v-col cols="4"><v-text-field v-model="user.middle_name" density="compact"
                                    hide-details="auto" label="Middlename" /></v-col>
                            <v-col cols="4"><v-text-field v-model="user.last_name" density="compact" hide-details="auto"
                                    label="Lastname" required :rules="[v => !!v || 'Lastname is required']" /></v-col>
                            <v-col cols="4"><v-text-field v-model="user.contact_number" density="compact"
                                    hide-details="auto" label="Contact Number" type="tel"
                                    :rules="[v => !!v || 'Contact Number is required']" /></v-col>
                            <v-col cols="12"> Roles and Designation </v-col>
                            <v-col cols="6"><v-select v-model="user.side" label="Type" :items="['SDO', 'RO']"
                                    hide-details="auto" required :rules="[v => !!v || 'Type is required']" /></v-col>
                            <v-col cols="6" v-if="user.side === 'SDO'">
                                <v-select v-model="user.designation_information.division" :items="sdo_data"
                                    label="Division" item-value="_id" hide-details="auto" /></v-col>
                            <v-col cols="6">
                                <v-select v-model="user.role" :items="roles" item-title="name" item-value="_id"
                                    label="Role" hide-details="auto" :rules="[v => !!v || 'Role is required']" />
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>
                <v-divider />
                <v-card-actions>
                    <v-row dense justify="center">
                        <v-col cols="4">
                            <v-btn @click="create_user" variant="tonal" color="indigo" block>
                                <v-icon class="pr-2" size="28"> mdi-check</v-icon>UPDATE
                            </v-btn>
                        </v-col>
                        <v-col cols="4">
                            <v-btn @click="create_user" variant="tonal" color="indigo" block>
                                <v-icon class="pr-2" size="28"> mdi-message-text-fast</v-icon> Re-send Invite
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-card-actions>
            </v-sheet>
        </v-dialog>


        <commons-dialog v-model="create_sdo_dialog" max-width="35%" icon="mdi-school"
            title="Create School Division Office" @submit="create_sdo" submitText="Submit">
            <v-card-text>
                <v-form ref="create_sdo_form">
                    <v-text-field v-model="sdo.title" label=" Division" hide-details="auto" required
                        :rules="[v => !!v || 'Division is required']" />
                    <v-textarea class="mt-2" v-model="sdo.address" rows="3" label="Division Address" hide-details="auto"
                        prepend-inner-icon="mdi-map-marker" required :rules="[v => !!v || 'Address is required']" />
                    <v-text-field class="mt-2" v-model="sdo.email" label="Email Address" hide-details="auto"
                        prepend-inner-icon="mdi-email-outline" required
                        :rules="[(v) => /.+@.+/.test(v) || 'Invalid Email address']" />
                    <v-text-field class="mt-2" v-model="sdo.code" label="SDO Code" hide-details="auto"
                        prepend-inner-icon="mdi-codepen" hint="This is for transaction codes for endorsements." />
                </v-form>
            </v-card-text>
        </commons-dialog>

        <commons-dialog v-model="update_sdo_dialog" max-width="35%" icon="mdi-school"
            title="Create School Division Office" @submit="create_sdo" submitText="Submit">
            <v-card-text>
                <v-form ref="create_sdo_form">
                    <v-text-field v-model="sdo.title" label=" Division" hide-details="auto" required
                        :rules="[v => !!v || 'Division is required']" />
                    <v-textarea class="mt-2" v-model="sdo.address" rows="3" label="Division Address" hide-details="auto"
                        prepend-inner-icon="mdi-map-marker" required :rules="[v => !!v || 'Address is required']" />
                    <v-text-field class="mt-2" v-model="sdo.email" label="Email Address" hide-details="auto"
                        prepend-inner-icon="mdi-email-outline" required
                        :rules="[(v) => /.+@.+/.test(v) || 'Invalid Email address']" />
                    <v-text-field class="mt-2" v-model="sdo.telephone" type="tel" label="Telephone Number"
                        hide-details="auto" prepend-inner-icon="mdi-phone" />
                    <v-text-field class="mt-2" v-model="sdo.code" label="SDO Code" hide-details="auto"
                        prepend-inner-icon="mdi-codepen" hint="This is for transaction codes for endorsements." />
                </v-form>
            </v-card-text>
        </commons-dialog>
    </div>
</template>

<script setup lang="ts">
const router = useRouter();
import { ref } from 'vue';
import swal from 'sweetalert';

import useAuth from "~/store/auth";
import { useAPTs, useDomains, useLoader } from '~/store/index';

const apts = useAPTs();
const loader = useLoader();
const domains = useDomains();

definePageMeta({ layout: "barren" })


onBeforeMount(() => {
    Promise.all([
        get_users(),
        get_sdo(),
        get_apts(),
        load_resources()
    ])
})

const auth = useAuth().user;

const { $rest } = useNuxtApp();


const is_hovered = ref(false);

const DEFAULT_DOMAIN = "Southern Convergence"; //Until We perfect the microservices based approach,

const domain = computed(() => domains.active_domain) as any;
const user_groups = ref([]);
async function load_resources() {
    const domain_res = await $rest("admin/policy-authority/get-domains", { method: "GET" });
    domains.hydrate(domain_res.data);
    /* @ts-ignore */
    if (!domain.value) domains.set_active_domain(DEFAULT_DOMAIN);

    const query = { domain_id: domain.value._id };
    const [apt_res, user_group_res] = await Promise.all([
        $rest("admin/policy-authority/get-apts", { method: "GET", query }),
        $rest("admin/subject-authority/get-user-groups", { method: "GET", query })
    ]);
    apts.hydrate(apt_res.data, domain.value.access_policies);
    user_groups.value = user_group_res.data.map((v: any) => ({ title: v.name, value: v }));
}

const user = ref<SmsUser>({
    username: "",
    password: "",
    admin: false,
    email: "",
    last_name: "",
    middle_name: "",
    first_name: "",
    contact_number: "",
    side: "",
    role: "",
    designation_information: {
        division: "",
        school: "",
    },
    status: "pending",
});


/** Invitation Sh8 */
const active_user = ref(null as any);
const valid_invitation = ref(false);
const invitation_form = ref({
    first_name: "",
    middle_name: "",
    last_name: "",
    appellation: "",
    email: "",
    // contact_number: "",

    apts: [],
    group: "",
    designation: {
        division: ""
    }
} as any);
const suspension_mode = ref("");
const suspension_details = ref("");
const suspension_types = ref([
    "Suspicious Behavior",
] as string[]);
const deactivation_mode = ref("")
const deactivation_types = ref([
    "Resignation",
    "Transferred",
    "Retired",
    "Deceased",
    "Others"
]);

async function invite_user() {

    loader.set("Sending out invitation form...");

    invitation_form.value.apts = [invitation_form.value.apts];

    const { data, error } = await $rest("auth/invite-user", {
        method: "POST",
        body: {
            domain: {
                id: domain.value._id,
                name: domain.value.name,
            },
            ...invitation_form.value
        }
    });

    loader.set(false);
    const success = Boolean(data);
    user_form.value.reset();



    swal({
        title: success ? "Success" : "Request Failed",
        icon: success ? "success" : "error",
        text: data || (error || "Failed to reach server"),
    });
}

/**
 * 
 */

const roles = ref([]);
const get_apts = async () => {
    const domain = auth.access[0].domain_id;
    if (!domain) return swal({ title: "Fuck" })
    const { data, error } = await $rest("admin/policy-authority/get-apts", { method: "GET", query: { domain_id: domain } });

    const apts = data.filter((v: any) => v.internal === false);
    roles.value = apts.filter(role => need_roles.includes(role.name))
}

const need_roles = ["Administrative Officer V", "RO Evaluator", "Verifier", "SDO Admin", "RO Admin"]

const ro_roles = computed(() => {
    return roles.value.filter(role => need_roles.includes(role.name))
})
const user_headers = ref([
    { title: "Full Name", key: "full_name", sortable: false },
    { title: "Role", key: "role", sortable: false },

    { title: "Side", key: "side", sortable: false },
    { title: "Email Address", key: "email", sortable: false },
    { title: "Status", key: "status", sortable: false },
    { title: "", key: "actions" },
])

const update_sdo_dialog = ref(false)
const update_invite_dialog = ref(false)
const user_invite_dialog = ref(false);
const user_form = ref();

async function create_user() {
    if (!user_form.value.isValid) {
        return swal({ title: "Invalid Email" })
    }
    swal({ title: "User sucessfully invited!" })
    const { data, error } = await $rest('user/create-user', {
        method: "POST",
        body: { ...user.value }

    })
    if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
    get_users()
    return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}
const users_data = ref<SmsUser[]>([])
async function get_users() {
    const { data, error } = await $rest('user/get-users', {
        method: "GET",
    });

    users_data.value = data.filter((v: any) => !!v.role && v.side === 'RO' || v.role === 'SDO Admin');
}


const sdo = ref<Sdo>({
    title: "",
    address: "",
    email: "",
    code: ""
})

/**
 * SDO 
 */
const create_sdo_dialog = ref(false)
const create_sdo_form = ref();

async function create_sdo() {
    if (!create_sdo_form.value.isValid) {
        return swal({ title: "Completed required field!" })
    }
    const { data, error } = await $rest('sms-sdo/create-sdo', {
        method: "POST",
        body: { ...sdo.value }
    });

    if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
    get_sdo();
    create_sdo_dialog.value = false;
    return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })
}
const route_to_sdo = (id: string) => {
    router.push({
        name: 'sdo',
        query: {
            id: id
        }
    });
}
const sdo_data = ref<Sdo[]>([]);
async function get_sdo() {
    const { data, error } = await $rest('sms-sdo/get-sdo', {
        method: "GET",
    })
    sdo_data.value = data
}



</script>
<style scoped>
* {
    font-size: 12px
}

.user-item {
    transition: background-color 0.3s ease-in-out;
}

.user-item:hover {
    background-color: #E8EAF6;
}
</style>