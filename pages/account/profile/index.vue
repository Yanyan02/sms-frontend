<template>
  <h6>Default</h6>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import useAuth from "~/store/auth";

const router = useRouter();
const auth = useAuth();

const account_params = computed(()=>  ({[`${auth.type}`] : auth.user.username}));
router.push({name : `account-profile-${Object.keys(account_params.value)[0]}`, params : account_params.value, force : true})
</script>