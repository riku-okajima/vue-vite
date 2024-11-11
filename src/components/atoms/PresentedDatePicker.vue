<script setup lang="ts">
import RequiredTag from './RequiredTag.vue';
import { Field } from 'vee-validate';

const selectedDate = defineModel("selectedDate");
</script>
<template>
    <div>
        <div class="flex">
          <RequiredTag :isRequired="true" />
        </div>
        <Field name="presentedAt">
          <v-row class="mt-0" justify="center">
            <v-date-picker elevation="10" color="primary" hide-actions v-model="selectedDate" title="Presented date" show-adjacent-months></v-date-picker>
          </v-row>
        </Field>
        <ErrorMessage name="presentedAt" class="text-sm text-red-600" />
      </div>
</template>