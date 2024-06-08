<script setup lang="ts">
import dayjs from "dayjs";
import { Ref, onBeforeMount, ref } from "vue";
import { Employee, Presentation } from "global";
import { deletePresentationData, fetchPresentationData } from "../repositories/supabase";
import { categories } from "../constants/const";
import EditButtonXS from "../components/atoms/EditButtonXS.vue"
import DeleteButtonXS from "../components/atoms/DeleteButtonXS.vue"

const presentation_list: Ref<Presentation[]> = ref([]);
const employee_list: Ref<Employee[]> = ref([]);
onBeforeMount(() => {
  fetchPresentationData(presentation_list, employee_list);
});

const deleteEvent = async (presentation: Presentation) => {
  await deletePresentationData(presentation.presentationId).then(() => {
    presentation_list.value = presentation_list.value.filter(item => {
      return item.presentationId != presentation.presentationId;
    })
  })
}
</script>
<template>
  <v-sheet elevation="3" class="m-auto rounded-lg p-4">
    <v-table class="overflow-x-auto" fixed-header v-cloak>
      <thead>
        <tr>
          <th>発表日</th>
          <th>発表者</th>
          <th>カテゴリ</th>
          <th>テーマ</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in presentation_list" class="odd:bg-gray-200">
          <td>{{ dayjs(item.presentedAt).format("YYYY/MM/DD") }}</td>
          <td>{{ employee_list.find(emp => emp.employeeId == item.employeeId)?.name }}</td>
          <td>{{ categories[item.category - 1].label }}</td>
          <td>{{ item.theme }}</td>
          <td class="flex justify-evenly items-center">
            <EditButtonXS />
            <DeleteButtonXS v-on:clickDelete="deleteEvent(item)"/>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-sheet>
</template>
