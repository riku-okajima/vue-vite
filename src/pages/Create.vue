<script setup lang="ts">
import { Field, ErrorMessage, SubmissionHandler } from "vee-validate";
import { Ref, ref } from "vue";
import { storeToRefs } from "pinia";
import "@vuepic/vue-datepicker/dist/main.css";
import dayjs from "dayjs";
import { onClickOutside } from '@vueuse/core'
import RequiredTag from "../components/atoms/RequiredTag.vue";
import { usePresentationStore, useListsStore } from "../store/presentation";
import { Employee, Presentation } from "global"
import { onBeforeMount } from "vue";
import { watch } from "vue";
import {fetchEmployeeData, registerPresentationData} from "../repositories/supabase";
import { categories } from "../constants/const";
import { useEmployeeStore } from "../store/employee";
import DeleteButtonXS from "../components/atoms/DeleteButtonXS.vue"

const presentationStore = usePresentationStore();
const listsStore = useListsStore();
const { lists } = storeToRefs(listsStore);
const employeeStore = useEmployeeStore();
const { employees } = storeToRefs(employeeStore);
const { employeeId, category, theme } = storeToRefs(presentationStore);


// バリデーション状態管理
const formValid: any = ref(false);
const valiableFormValid: any = ref(false);
const themeRequiredRules = (value: string) :boolean | string => {
  return !!value || 'テーマは必須です'
}
const themeMaxRules = (value: string) :boolean | string => {
  return value.length <= 20 || 'テーマは20文字以内で入力してください'
}

// カレンダーの監視
const selectedDate: Ref<any[] | undefined> = ref([]);
watch(selectedDate, (newDate) => {
  // TODO：フォーマットを加工
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
const addPresentationInfo = async (): Promise<void> => {
  const result = await formValid.value.validate();
  if(!result.valid) return;
  const {presentationId, employeeId, category, theme, presentedAt, formState }: Presentation = presentationStore;
  const reqData: Presentation = {
    presentationId: Number(presentationId),
    employeeId: Number(employeeId),
    category: Number(category),
    theme: theme,
    presentedAt: presentedAt,
    formState: false
  };
  listsStore.addLists(reqData);
  presentationStore.$reset();
}

// 通常表示→フォーム表示に変更
const editPresentationInfo = async (index: number) : Promise<void> => {
  listsStore.changeFormState(index, true);
}
// 登録内容をローカルストレージから削除
const removePresentationInfo = async (index: number) : Promise<void> => {
  listsStore.removeLists(index);
}
// フォームの外側クリックで通常表示に変更
const valiableForm = ref(null)
onClickOutside(
  valiableForm,
  () => {
    listsStore.changeFormState(-1);
  },
)
// フォーカス時にフォームが閉じるのを防ぐ
const preventChangeFormState = (index: number): void => {
  listsStore.changeFormState(index,true);
}

// ローカルストレージ→DB登録
const onSubmit: SubmissionHandler<Presentation, any> = async (): Promise<void> => {
  const result = await valiableFormValid.value.validate();
  if (!result.valid) {
    alert("エラーがあります");
    return;
  }
  if (!lists.value.length) return;
  registerPresentationData(lists.value).then(() => {
    alert("DB登録が完了しました");
    listsStore.$reset();
  });
};

</script>
<template>
  <v-sheet v-if="isLoaded" elevation="3" class="m-auto rounded-lg py-10 sm:p-10">
    <v-form fast-fail ref="formValid" class="flex flex-col">
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
            <div class="w-full block sm:flex justify-evenly">
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
          <v-text-field label="Theme" :counter="20" v-model="theme" :rules="[themeRequiredRules, themeMaxRules]"/>
        </Field>
        <ErrorMessage name="theme" class="text-sm text-red-600" />
      </div>
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
      <v-btn @click="addPresentationInfo" color="primary" class="mt-12">
        ADD
        <v-icon end icon="mdi-plus-thick"></v-icon>
      </v-btn>
      <div class="w-full flex flex-col mt-8">
        <v-form fast-fail ref="valiableFormValid" class="flex flex-col">
          <v-row>
            <v-col v-for="item,index in lists" cols="12" md="6">
              <v-card v-show="!item.formState">
                <v-card-title>{{ item.theme }}</v-card-title>
                <v-card-subtitle><v-icon>mdi-calendar-range</v-icon> {{ dayjs(item.presentedAt).format("YYYY/MM/DD") }}</v-card-subtitle>
                <v-card-subtitle><v-icon>mdi-account</v-icon> {{ employee_list.find(emp => emp.employeeId == item.employeeId)?.name }}</v-card-subtitle>
                <v-card-subtitle><v-icon>mdi-alpha-c-circle</v-icon> {{ categories[item.category - 1].label }}</v-card-subtitle>
                <div class="w-full flex justify-end gap-1.5 absolute bottom-1.5 right-1.5">
                  <v-btn icon="mdi-pencil" size="x-small" color="green" @click="editPresentationInfo(index)"></v-btn>
                  <DeleteButtonXS v-on:clickDelete="removePresentationInfo(index)"/>
                </div>
              </v-card>
              <v-card v-show="item.formState" ref="valiableForm">
                  <Field type="text" name="theme" v-model="item.theme">
                    <v-text-field label="Theme" :counter="20" v-model="item.theme" @click="preventChangeFormState(index)" :rules="[themeRequiredRules, themeMaxRules]"/>
                  </Field>
                  <input type="datetime-local" v-model="item.presentedAt" required @click="preventChangeFormState(index)">
                  <v-select :items="employees" item-title="name" item-value="employeeId" label="Employee" v-model="item.employeeId" @click="preventChangeFormState(index)"/>
                  <v-select :items="categories" item-title="label" item-value="value" label="Category" v-model="item.category" @click="preventChangeFormState(index)"/>
              </v-card>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="auto">
              <v-btn size="x-large" block @click="onSubmit" color="blue">
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
        </v-form>
      </div>
    </v-form>
  </v-sheet>
</template>
