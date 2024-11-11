<script setup lang="ts">
import RequiredTag from "../../components/atoms/RequiredTag.vue";
import { CATEGORIES } from "../../constant/const";
import { Field } from "vee-validate";

const category = defineModel("category");
</script>
<template>
    <div>
        <div class="flex">
          <RequiredTag :isRequired="true" />
        </div>
        <Field name="category" v-model="category">
          <v-radio-group v-model="category" inline label="Category">
            <div class="w-full block sm:flex justify-evenly">
              <div v-for="c in CATEGORIES">
                <v-radio :label="c.label" :value="c.value" v-model="category"></v-radio>
              </div>
            </div>
            </v-radio-group>
        </Field>
      </div>
</template>