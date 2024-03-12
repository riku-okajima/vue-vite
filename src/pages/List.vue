<script setup lang="ts">
import dayjs from "dayjs";
import { storeToRefs } from "pinia";
import { Ref, onBeforeMount, ref } from "vue";
import { usePresentationStore, useListsStore } from "../store/presentation";
import { Employee, Presentation } from "global";
import { fetchPresentationData } from "../repositories/supabase";
import { categories } from "../constants/const";

const presentation_list: Ref<Presentation[]> = ref([]);
const employee_list: Ref<Employee[]> = ref([]);
onBeforeMount(() => {
  fetchPresentationData(presentation_list, employee_list);
});
</script>
<template>
  <v-sheet elevation="3" class="m-auto rounded-lg p-4">
    <v-table fixed-header v-cloak>
      <thead>
        <tr>
          <th>発表日</th>
          <th>発表者</th>
          <th>カテゴリ</th>
          <th>テーマ</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="l in presentation_list" class="odd:bg-gray-200">
          <td>{{ dayjs(l.presentedAt).format("YYYY/MM/DD") }}</td>
          <td>{{ employee_list.find(emp => emp.employeeId == l.employeeId)?.name }}</td>
          <td>{{ categories[l.category - 1].label }}</td>
          <td>{{ l.theme }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-sheet>
</template>
