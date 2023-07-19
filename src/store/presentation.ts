import { defineStore } from "pinia";

export interface Presentation {
  id: number;
  firstName: string;
  lastName: string;
  category: number;
  theme: string;
  detail: string;
  presented_at: Date;
}
export const categories = [
  { value: 1, label: "技術" },
  { value: 2, label: "業務" },
  { value: 3, label: "マインド/ビジネススキル" },
  { value: 0, label: "その他" },
];

export const usePresentationStore = defineStore("presentation", {
  state: () => ({
    id: 0 as Presentation["id"],
    firstName: "" as Presentation["firstName"],
    lastName: "" as Presentation["lastName"],
    category: 1 as Presentation["category"],
    theme: "" as Presentation["theme"],
    detail: "" as Presentation["detail"],
    presented_at: new Date() as Presentation["presented_at"],
    lists: [] as Presentation[],
  }),
  actions: {
    addLists(value: Presentation): void {
      const { id, firstName, lastName, category, theme, detail, presented_at } = value;
      this.lists.push({
        id: id,
        firstName: firstName,
        lastName: lastName,
        category: category,
        theme: theme,
        detail: detail,
        presented_at: presented_at,
      });
    },
  },
  persist: {
    storage: sessionStorage,
  },
});
