import { defineStore } from "pinia";
import { supabase } from "../supabase";
// import { setEmployees } from "../pages/Create.vue";
import { ref } from "vue";
export interface Employee {
  id: number;
  name: string;
}
interface Category {
  value: number;
  label: string;
}

export interface Presentation {
  id: number;
  employee: number;
  category: number;
  theme: string;
  memo: string;
  presentedAt: Date;
}

export const categories: Category[] = [
  { value: 1, label: "技術" },
  { value: 2, label: "業務" },
  { value: 3, label: "マインド/ビジネススキル" },
  { value: 4, label: "その他" },
];

export const usePresentationStore = defineStore("presentation", {
  state: () => ({
    id: 0 as Presentation["id"],
    employee: 1 as Presentation["employee"],
    category: 1 as Presentation["category"],
    theme: "" as Presentation["theme"],
    memo: "" as Presentation["memo"],
    presentedAt: new Date() as Presentation["presentedAt"],
  }),
  actions: {
    setEmployee(id: number) {
      this.employee = id;
    },
  },
  persist: {
    storage: localStorage,
  },
});
export const useListsStore = defineStore("lists", {
  state: () => ({
    lists: [] as Presentation[],
  }),
  actions: {
    addLists(value: Presentation): void {
      const { id, employee, category, theme, memo, presentedAt } = value;
      this.lists.push({
        id: this.lists.length + 1,
        employee: Number(employee),
        category: Number(category),
        theme: theme,
        memo: memo,
        presentedAt: presentedAt,
      });
    },
  },
  persist: {
    storage: sessionStorage,
  },
});
