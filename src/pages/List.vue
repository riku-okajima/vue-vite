<script setup lang="ts">
import dayjs from "dayjs";
import { Ref, onBeforeMount, ref } from "vue";
import { Employee, Presentation } from "global";
import { deletePresentationData } from "../repositories/supabase";
import {fetchPresentationData} from "../repositories/api"
import { categories } from "../constant/const";
import EditButtonXS from "../components/atoms/EditButtonXS.vue"
import DeleteButtonXS from "../components/atoms/DeleteButtonXS.vue"

const presentationList: Ref<Presentation[]> = ref([]);
const employeeList: Ref<Employee[]> = ref([]);
onBeforeMount(() => {
  fetchPresentationData(presentationList, employeeList);
});

const deleteEvent = async (presentation: Presentation) => {
  await deletePresentationData(presentation.presentationId).then(() => {
    presentationList.value = presentationList.value.filter(item => {
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
        <tr v-for="item in presentationList" class="odd:bg-gray-200">
          <td>{{ dayjs(item.presentedAt).format("YYYY/MM/DD") }}</td>
          <td>{{ employeeList.find(emp => emp.employeeId == item.employeeId)?.name }}</td>
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
