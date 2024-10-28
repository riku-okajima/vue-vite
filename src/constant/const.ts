import { NavItem, Category } from "global";

export const CATEGORIES: Category[] = [
    { value: 1, label: "技術" },
    { value: 2, label: "業務" },
    { value: 3, label: "マインド/ビジネススキル" },
    { value: 4, label: "その他" },
];

export const ROUTE_HEADING_MAPPER: Array<{name: string, title: string}> = [
    {
        name:'Create', title:'Add Presentation'
    },
    {
        name:'List', title:'Presentation List'
    },
];

export const NAV_ITEMS: NavItem[] = [
    {
      name: "Add Presentation",
      icon: "mdi-pencil-plus",
      link: "/create",
    },
    {
      name: "Show Lists",
      icon: "mdi-format-list-bulleted-square",
      link: "/list",
    },
];

export const HEADER_ICONS: Array<string> = ["mdi-magnify", "mdi-home", "mdi-dots-vertical"];

export const FOOTER_ICONS: Array<string> = ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"];
