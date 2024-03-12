import { Category, Employee, Presentation } from "global";
import { defineStore } from "pinia";

export const useEmployeeStore = defineStore("employee", {
  state: () => ({
    employees: [] as Employee[],
  }),
  actions: {
    addLists(value: Employee[]): void {
      this.employees = value;
    },
  },
  persist: {
    storage: sessionStorage,
  },
});
