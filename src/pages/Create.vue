<script setup lang="ts">
import { Form, Field, ErrorMessage, SubmissionHandler } from "vee-validate";
import { onMounted, ref } from "vue";
import { Store, storeToRefs } from "pinia";
import { VDatePicker } from "vuetify/labs/VDatePicker";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import * as yup from "yup";
import dayjs from "dayjs";
import RequiredTag from "../components/atoms/RequiredTag.vue";
import { Presentation, usePresentationStore, categories, useListsStore } from "../store/presentation";
import { supabase } from "../supabase";

const presentationStore = usePresentationStore();
const listsStore = useListsStore();
const { lastName, firstName, category, theme, memo, presentedAt } = storeToRefs(presentationStore);
const { lists } = storeToRefs(listsStore);

// // バリデーションスキーマ
const formSchema = yup.object({
  lastName: yup.string().required("Last name is required").max(10, "Last name must be less than 10 characters"),
  firstName: yup.string().required("First name is required").max(10, "First name must be less than 10 characters"),
  theme: yup.string().required("Theme is required"),
});

// const fetchEmployeesData = async () => {
//   try {
//     const { data } = await supabase.from("employees").select("*");
//     console.log(data);
//   } catch (e) {
//     console.error(e);
//   }
// };
// // 初期表示処理
// onMounted(() => {
//   fetchEmployeesData();
// });
// 送信処理
const onSubmit: SubmissionHandler<Presentation, any> = (values: Presentation): void => {
  const { firstName, lastName, category, theme, memo, presentedAt }: Presentation = values;
  const reqData: Presentation = {
    id: presentationStore.id++,
    firstName: firstName,
    lastName: lastName,
    category: Number(category),
    theme: theme,
    memo: memo,
    presentedAt: presentedAt,
  };
  listsStore.addLists(reqData);
  presentationStore.$reset();
};
</script>
<template>
  <h4>Add Presentation</h4>
  <Form @submit="onSubmit" :validation-schema="formSchema" class="m-auto md:max-w-2xl flex flex-col gap-5">
    <div class="md:flex md:gap-4 mt-5">
      <div class="md:w-full">
        <div class="flex gap-2">
          <RequiredTag :isRequired="true" />
        </div>
        <Field name="lastName" v-model="lastName">
          <v-text-field :max-errors="10" :counter="10" label="Last name" name="lastName" v-model="lastName" />
        </Field>
        <ErrorMessage name="lastName" class="text-sm text-red-600" />
      </div>
      <div class="md:w-full">
        <div class="flex gap-2">
          <RequiredTag :isRequired="true" />
        </div>
        <Field name="firstName" v-model="firstName">
          <v-text-field :counter="10" label="First name" name="firstName" v-model="firstName" />
        </Field>
        <ErrorMessage name="firstName" class="text-sm text-red-600" />
      </div>
    </div>
    <div>
      <Field name="category" v-model="category">
        <v-select :items="categories" item-title="label" item-value="value" label="Category" v-model="category" />
      </Field>
    </div>
    <div>
      <div class="flex justify-between">
        <div class="flex gap-2">
          <RequiredTag :isRequired="true" />
        </div>
      </div>
      <Field type="text" name="theme" v-model="theme">
        <v-text-field label="Theme" :counter="20" v-model="theme" />
      </Field>
      <ErrorMessage name="theme" class="text-sm text-red-600" />
    </div>
    <div>
      <div class="flex gap-2">
        <RequiredTag :isRequired="false" />
      </div>
      <Field name="memo" v-model="memo">
        <v-textarea name="memo" id="memo" label="Memo" :counter="20" v-model="memo" />
      </Field>
      <ErrorMessage name="memo" class="text-sm text-red-600" />
    </div>
    <div>
      <div class="flex gap-2">
        <RequiredTag :isRequired="true" />
      </div>
      <!-- <Field name="presentedAt" v-model="presentedAt">
        <v-date-picker label="Presented date"></v-date-picker>
      </Field> -->
      <Field name="presentedAt" v-model="presentedAt">
        <VueDatePicker
          name="presentedAt"
          v-model="presentedAt"
          placeholder="クリックして日付を選択"
          format="yyyy/MM/dd"
          :enable-time-picker="false"
          locale="ja"
          week-start="0"
          auto-apply
        />
      </Field>
      <ErrorMessage name="presentedAt" class="text-sm text-red-600" />
    </div>
    <v-btn type="submit" color="primary">
      ADD
      <v-icon end icon="mdi-plus-thick"></v-icon>
    </v-btn>
  </Form>
  <div class="w-full text-center flex flex-col gap-5">
    <h4></h4>
    <v-table fixed-header height="150px">
      <thead>
        <tr>
          <th>発表日</th>
          <th>発表者</th>
          <th>カテゴリ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="l in lists" class="odd:bg-gray-200">
          <td>{{ dayjs(l.presentedAt).format("YYYY/MM/DD") }}</td>
          <td>{{ l.lastName }} {{ l.firstName }}</td>
          <td>{{ categories[l.category - 1].label }}</td>
        </tr>
      </tbody>
    </v-table>
    <v-row justify="center">
      <v-col cols="auto">
        <v-btn size="x-large" block type="submit" color="blue">
          SEND
          <v-icon end icon="mdi-send"></v-icon>
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn size="x-large" color="red" @click="listsStore.$reset()">
          Reset
          <v-icon end icon="mdi-close-thick"></v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
