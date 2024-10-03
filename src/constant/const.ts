import { Category, PageHeaderValue } from "global";

export const categories: Category[] = [
    { value: 1, label: "技術" },
    { value: 2, label: "業務" },
    { value: 3, label: "マインド/ビジネススキル" },
    { value: 4, label: "その他" },
];

export const PAGE_HEADER: PageHeaderValue[] = [
    {
        name:'Create', title:'Add Presentation'
    },
    {
        name:'List', title:'Presentation List'
    },
]