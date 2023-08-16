import { defineStore } from "pinia";

export interface Presentation {
  id: number;
  firstName: string;
  lastName: string;
  category: number;
  theme: string;
  memo: string;
  presentedAt: Date;
}
export const categories = [
  { value: 1, label: "技術" },
  { value: 2, label: "業務" },
  { value: 3, label: "マインド/ビジネススキル" },
  { value: 4, label: "その他" },
];

export const usePresentationStore = defineStore("presentation", {
  state: () => ({
    id: 0 as Presentation["id"],
    firstName: "" as Presentation["firstName"],
    lastName: "" as Presentation["lastName"],
    category: 1 as Presentation["category"],
    theme: "" as Presentation["theme"],
    memo: "" as Presentation["memo"],
    presentedAt: new Date() as Presentation["presentedAt"],
  }),
  // persist: {
  //   storage: sessionStorage,
  // },
});
export const useListsStore = defineStore("lists", {
  state: () => ({
    lists: [] as Presentation[],
  }),
  actions: {
    addLists(value: Presentation): void {
      const { id, firstName, lastName, category, theme, memo, presentedAt } = value;
      this.lists.push({
        id: id,
        firstName: firstName,
        lastName: lastName,
        category: Number(category),
        theme: theme,
        memo: memo,
        presentedAt: presentedAt,
      });
    },
  },
  // persist: {
  //   storage: sessionStorage,
  // },
});
