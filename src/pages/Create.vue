<script setup lang="ts">
import { useForm, useField, Form, Field, ErrorMessage, SubmissionHandler } from "vee-validate";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import * as yup from "yup";
import dayjs from "dayjs";
import ListLinkButton from "../components/atoms/ListLinkButton.vue";
import RequiredTag from "../components/atoms/RequiredTag.vue";
import { Presentation, usePresentationStore, categories } from "../store/presentation";

const store = usePresentationStore();
const { lastName, firstName, category, theme, detail, presented_at, lists } = storeToRefs(store);
const valueOfVueDatePicker = ref(presented_at.value);

// バリデーションスキーマ
const formSchema = yup.object({
  lastName: yup.string().required("必須項目です").max(10, "10文字以内で入力してください"),
  firstName: yup.string().required("必須項目です").max(10, "10文字以内で入力してください"),
  theme: yup.string().required("必須項目です"),
});

// 送信処理
const onSubmit: SubmissionHandler<any, unknown> = (values: Presentation) => {
  const { firstName, lastName, category, theme, detail }: Presentation = values;
  const reqData: Presentation = {
    id: store.id++,
    firstName: firstName,
    lastName: lastName,
    category: category,
    theme: theme,
    detail: detail,
    presented_at: valueOfVueDatePicker.value,
  };
  store.addLists(reqData);
};

const setDate = (date: Date): void => {
  presented_at.value = date;
};
const formatDate = (date: Date): string => {
  return dayjs(date).format("YYYY/MM/DD");
};
</script>
<template>
  <div class="text-right">
    <ListLinkButton />
  </div>

  <h4>じゆうけんきゅうを追加する</h4>
  <Form @submit="onSubmit" :validation-schema="formSchema" class="m-auto md:max-w-2xl flex flex-col gap-5">
    <div class="md:flex md:gap-4 mt-5">
      <div class="md:w-full">
        <div class="flex gap-2">
          <label for="lastName">姓</label>
          <RequiredTag :isRequired="true" />
        </div>
        <Field type="text" name="lastName" class="form-control" v-model="lastName" />
        <ErrorMessage name="lastName" class="text-sm text-red-600" />
      </div>
      <div class="md:w-full">
        <div class="flex gap-2">
          <label for="firstName">名</label>
          <RequiredTag :isRequired="true" />
        </div>
        <Field type="text" name="firstName" class="form-control" v-model="firstName" />
        <ErrorMessage name="firstName" class="text-sm text-red-600" />
      </div>
    </div>
    <div>
      <label for="category">カテゴリー</label>
      <Field as="select" name="category" id="category" class="form-control" v-model="category">
        <option v-for="c in categories" :value="c.value" :key="c.value">{{ c.label }}</option>
      </Field>
    </div>
    <div>
      <div class="flex gap-2">
        <label for="theme">テーマ</label>
        <RequiredTag :isRequired="true" />
      </div>
      <Field type="text" name="theme" id="theme" v-model="theme" />
      <p class="text-right text-gray-400">
        現在の文字数
        <span class="text-lg">
          {{ theme.length }}
        </span>
      </p>
      <ErrorMessage name="theme" class="text-sm text-red-600" />
    </div>
    <div>
      <div class="flex gap-2">
        <label for="detail">発表内容</label>
        <RequiredTag :isRequired="false" />
      </div>
      <Field as="textarea" name="detail" id="detail" cols="30" rows="10" v-model="detail" />
      <ErrorMessage name="detail" class="text-sm text-red-600" />
    </div>
    <div>
      <div class="flex gap-2">
        <label for="detail">発表日</label>
        <RequiredTag :isRequired="true" />
      </div>
      <VueDatePicker
        name="presented_at"
        v-model="valueOfVueDatePicker"
        @update:model-value="setDate"
        placeholder="クリックして日付を選択"
        format="yyyy/MM/dd"
        :enable-time-picker="false"
        locale="ja"
        week-start="0"
        auto-apply
      />
      <ErrorMessage name="presented_at" class="text-sm text-red-600" />
    </div>

    <button type="submit" class="flex m-auto btn-blue">Submit</button>
  </Form>
  <div class="w-full text-center flex flex-col gap-5">
    <h4></h4>
    <table class="w-full m-auto">
      <thead>
        <tr class="bg-teal-500 text-white">
          <th scope="col">発表日</th>
          <th scope="col">発表者</th>
          <th scope="col">カテゴリ</th>
          <th scope="col">発表テーマ</th>
        </tr>
      </thead>
      <tbody class="text-slate-700">
        <tr v-for="l in lists" class="odd:bg-gray-200">
          <td class="group">{{ formatDate(l.presented_at) }}</td>
          <td class="group">{{ l.lastName }} {{ l.firstName }}</td>
          <td class="group">{{ categories[l.category - 1].label }}</td>
          <td class="group">{{ l.theme }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="store.$reset" class="flex m-auto btn-red">Reset</button>
  </div>
</template>
