<script setup lang="ts">
import RequiredTag from "./RequiredTag.vue";
import { Field } from 'vee-validate';
const theme = defineModel("theme");

const themeRequiredRules = (value: string): boolean | string => {
	return !!value || "テーマは必須です";
};
const themeMaxRules = (value: string): boolean | string => {
	return value.length <= 20 || "テーマは20文字以内で入力してください";
};
</script>
<template>
    <div>
        <div class="flex justify-between">
          <div class="flex">
            <RequiredTag :isRequired="true" />
          </div>
        </div>
        <Field type="text" name="theme" v-model="theme">
          <v-text-field label="Theme" :counter="20" v-model="theme" :rules="[themeRequiredRules, themeMaxRules]"/>
        </Field>
        <ErrorMessage name="theme" class="text-sm text-red-600" />
      </div>
</template>