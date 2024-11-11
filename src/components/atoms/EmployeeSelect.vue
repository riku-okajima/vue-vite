<script setup lang="ts">
import RequiredTag from "../../components/atoms/RequiredTag.vue";
import { Field } from "vee-validate";

const props = defineProps({
	employees: {
		type: Array,
		required: true,
	},
});
// 親からv-modelを受け取って子でバインドできるようにする
const employeeId = defineModel("employeeId");
</script>
<template>
<div>
  <div class="flex">
    <RequiredTag :isRequired="true" />
  </div>
  <Field name="employee" v-model="employeeId">
    <v-select :items="employees" item-title="name" item-value="employeeId" label="Employee" v-model="employeeId" />
  </Field>
</div>
</template>
