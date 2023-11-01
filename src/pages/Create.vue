<script setup lang="ts">
import { Form, Field, ErrorMessage, SubmissionHandler } from "vee-validate";
import { Ref, onMounted, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { VDatePicker } from "vuetify/labs/VDatePicker";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import * as yup from "yup";
import dayjs from "dayjs";
import RequiredTag from "../components/atoms/RequiredTag.vue";
import { Presentation, usePresentationStore, categories, useListsStore, Employee } from "../store/presentation";
import { supabase } from "../supabase";
import { onBeforeMount } from "vue";
import { watch } from "vue";

const presentationStore = usePresentationStore();
const listsStore = useListsStore();
const { employee, category, theme, memo, presentedAt } = storeToRefs(presentationStore);
const { lists } = storeToRefs(listsStore);

// バリデーションスキーマ
const formSchema = yup.object({
  employee: yup.number().required("Employee is required"),
  category: yup.number().required("Category is required"),
  theme: yup.string().required("Theme is required"),
  memo: yup.string().max(100, "Memo must be less than 100 characters"),
});

// カレンダーの監視
const selectedDate: Ref<any[] | undefined> = ref([]);
watch(selectedDate, (newDate) => {
  presentationStore.presentedAt = new Date(String(newDate));
});

// 初期表示処理
const isLoaded: Ref<Boolean> = ref(false);
const employees: Ref<Employee[]> = ref([]);
onBeforeMount(() => {
  fetchEmployeesData().then(() => {
    isLoaded.value = true;
  });
});
// 社員情報の取得
const fetchEmployeesData = async (): Promise<void> => {
  try {
    const { data, status }: any = await supabase.from("employees").select("*").eq("is_active", true).order("id", { ascending: true });
    if (status == 200 && data.length != 0) {
      data.forEach((item: any, index: number) => {
        employees.value.push({ id: item["id"], name: item["last_name"] + " " + item["first_name"] });
        if (index == 0) {
          presentationStore.setEmployee(item["id"]);
        }
      });
    }
  } catch (e) {
    console.error(e);
  }
};

// 送信処理
const onSubmit: SubmissionHandler<Presentation, any> = (values: Presentation, { resetForm }): void => {
  const { employee, category, theme, memo }: Presentation = values;
  const reqData: Presentation = {
    id: presentationStore.id++,
    employee: Number(employee),
    category: Number(category),
    theme: theme,
    memo: memo,
    presentedAt: presentationStore.presentedAt,
  };
  listsStore.addLists(reqData);
  presentationStore.$reset();
  resetForm();
};
</script>
<template>
  <h4>Add Presentation</h4>
  <div v-if="isLoaded">
    <Form @submit="onSubmit" :validation-schema="formSchema" class="m-auto md:max-w-2xl flex flex-col gap-5">
      <div>
        <div class="flex gap-2">
          <RequiredTag :isRequired="true" />
        </div>
        <Field name="employee" v-model="employee">
          <v-select :items="employees" item-title="name" item-value="id" label="Employee" v-model="employee" />
        </Field>
      </div>
      <div>
        <div class="flex gap-2">
          <RequiredTag :isRequired="true" />
        </div>
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
          <v-textarea name="memo" id="memo" label="Memo" :counter="100" v-model="memo" />
        </Field>
        <ErrorMessage name="memo" class="text-sm text-red-600" />
      </div>
      <div>
        <div class="flex gap-2">
          <RequiredTag :isRequired="true" />
        </div>
        <Field name="presentedAt">
          <v-date-picker v-model="selectedDate" title="Presented date" show-adjacent-months></v-date-picker>
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
      <v-table fixed-header height="150px" v-cloak>
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
            <td>{{ employees[l.employee - 1].name }}</td>
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
  </div>
</template>
