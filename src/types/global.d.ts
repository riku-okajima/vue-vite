declare module "global" {

    interface NavItem {
        name: string;
        icon: string;
        link: string;
    }
    
    interface Employee {
        employeeId: number;
        name: string;
    }

    interface Category {
        value: number;
        label: string;
    }

    interface Presentation {
        presentationId: number;
        employeeId: number;
        category: number;
        theme: string;
        presentedAt: Date;
        formState: boolean;
    }

    export { NavItem, Employee, Category, Presentation }
}