import { Category, Presentation } from "global";
import { defineStore } from "pinia";

export const usePresentationStore = defineStore("presentation", {
  state: () => ({
    presentationId: 1 as Presentation["presentationId"],
    employeeId: 1 as Presentation["employeeId"],
    category: 1 as Presentation["category"],
    theme: "" as Presentation["theme"],
    presentedAt: new Date() as Presentation["presentedAt"],
    formState: false as Presentation["formState"]
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
    lists: [] as unknown as Presentation[] & {formState: boolean},
  }),
  actions: {
    addLists(value: Presentation): void {
      const {presentationId , employeeId, category, theme, presentedAt } = value;
      this.lists.push({
        presentationId: Number(presentationId),
        employeeId: Number(employeeId),
        category: Number(category),
        theme: theme,
        presentedAt: presentedAt,
        formState: false
      });
    },
    removeLists(index: number): void {
      this.lists.splice(index,1);
    },
    changeFormState(index: number, state: boolean = false): void {
      if (index < 0) this.lists.forEach(e => e.formState = false);
      if (state) {
        this.lists[index].formState = true;
      }
    }
  },
  persist: {
    storage: localStorage,
  },
});
