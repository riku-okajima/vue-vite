import { Category, Presentation } from "global";
import { defineStore } from "pinia";

export const usePresentationStore = defineStore("presentation", {
  state: () => ({
    employeeId: 1 as Presentation["employeeId"],
    category: 1 as Presentation["category"],
    theme: "" as Presentation["theme"],
    presentedAt: new Date() as Presentation["presentedAt"],
  }),
  actions: {
    setEmployee(id: number) {
      this.employeeId = id;
    },
  },
  persist: {
    storage: sessionStorage,
  },
});
export const useListsStore = defineStore("lists", {
  state: () => ({
    lists: [] as Presentation[],
  }),
  actions: {
    addLists(value: Presentation): void {
      const { employeeId, category, theme, presentedAt } = value;
      this.lists.push({
        employeeId: Number(employeeId),
        category: Number(category),
        theme: theme,
        presentedAt: presentedAt,
      });
    },
  },
  persist: {
    storage: localStorage,
  },
});
