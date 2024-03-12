<script setup lang="ts">
import { Form, Field, ErrorMessage, SubmissionHandler } from "vee-validate";
import { Ref, ref } from "vue";
import { storeToRefs } from "pinia";
import { VDatePicker } from "vuetify/labs/VDatePicker";
import "@vuepic/vue-datepicker/dist/main.css";
import * as yup from "yup";
import dayjs from "dayjs";
import RequiredTag from "../components/atoms/RequiredTag.vue";
import { usePresentationStore, useListsStore } from "../store/presentation";
import { Employee, Presentation, Category } from "global"
import { onBeforeMount } from "vue";
import { watch } from "vue";
import {fetchEmployeeData, registerPresentationData} from "../repositories/supabase";
import { categories } from "../constants/const";
import { useEmployeeStore } from "../store/employee";

const presentationStore = usePresentationStore();
const listsStore = useListsStore();
const { lists } = storeToRefs(listsStore);
const employeeStore = useEmployeeStore();
const { employees } = storeToRefs(employeeStore);
const { employeeId, category, theme,  presentedAt } = storeToRefs(presentationStore);


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

// 初期表示
const isLoaded: Ref<Boolean> = ref(false);
const employee_list: Ref<Employee[]> = ref([]);
onBeforeMount(() => {
  fetchEmployeeData(employee_list).then(() => {
    isLoaded.value = true;
    if(employee_list.value.length){
      employeeStore.addLists(employee_list.value);
      presentationStore.setEmployee(employee_list.value[0].employeeId)
    }
  });
});

// 入力情報格納（ローカルストレージ）
const addPresentationInfo  = (): void => {
  const { employeeId, category, theme, presentedAt }: Presentation = presentationStore;
  const reqData: Presentation = {
    employeeId: Number(employeeId),
    category: Number(category),
    theme: theme,
    presentedAt: presentedAt,
  };
  listsStore.addLists(reqData);
  presentationStore.$reset();
} 

// ローカルストレージ→DB登録
const onSubmit: SubmissionHandler<Presentation, any> = (): void => {
  registerPresentationData(lists.value).then(() => {
    alert("DB登録が完了しました");
    listsStore.$reset();
  });
};

</script>
<template>
  <v-sheet v-if="isLoaded" elevation="3" class="m-auto rounded-lg p-10">
    <!-- スキーマは一旦外す（ :validation-schema="formSchema" ） -->
    <Form @submit="onSubmit" class=" flex flex-col">
      <div>
        <div class="flex">
          <RequiredTag :isRequired="true" />
        </div>
        <Field name="employee" v-model="employeeId">
          <v-select :items="employees" item-title="name" item-value="employeeId" label="Employee" v-model="employeeId" />
        </Field>
      </div>
      <div>
        <div class="flex">
          <RequiredTag :isRequired="true" />
        </div>
        <Field name="category" v-model="category">
          <v-radio-group v-model="category" inline label="Category">
            <div class="w-full flex justify-evenly">
              <div v-for="c in categories">
                <v-radio :label="c.label" :value="c.value" v-model="category"></v-radio>
              </div>
            </div>
            </v-radio-group>
        </Field>
      </div>
      <div>
        <div class="flex justify-between">
          <div class="flex">
            <RequiredTag :isRequired="true" />
          </div>
        </div>
        <Field type="text" name="theme" v-model="theme">
          <v-text-field label="Theme" :counter="20" v-model="theme" />
        </Field>
        <ErrorMessage name="theme" class="text-sm text-red-600" />
      </div>
      <div>
        <div class="flex">
          <RequiredTag :isRequired="true" />
        </div>
        <Field name="presentedAt">
          <v-row justify="center">
            <v-date-picker v-model="selectedDate" title="Presented date" width="1200" show-adjacent-months></v-date-picker>
          </v-row>
        </Field>
        <ErrorMessage name="presentedAt" class="text-sm text-red-600" />
      </div>
      <v-btn @click="addPresentationInfo" color="primary" class="mt-12">
        ADD
        <v-icon end icon="mdi-plus-thick"></v-icon>
      </v-btn>
      <div class="w-full flex flex-col mt-8 ">
        <v-row>
          <v-col v-for="l in lists" cols="6">
            <v-card>
              <v-card-title>{{ l.theme }}</v-card-title>
              <v-card-subtitle><v-icon>mdi-calendar-range</v-icon> {{ dayjs(l.presentedAt).format("YYYY/MM/DD") }}</v-card-subtitle>
              <v-card-subtitle><v-icon>mdi-account</v-icon> {{ employee_list.find(emp => emp.employeeId == l.employeeId)?.name }}</v-card-subtitle>
              <v-card-subtitle><v-icon>mdi-alpha-c-circle</v-icon> {{ categories[l.category - 1].label }}</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
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
    </Form>
  </v-sheet>
</template>
