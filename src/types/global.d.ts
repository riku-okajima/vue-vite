declare module "global" {
    
    interface PageHeaderValue {
        name: string;
        title: string;
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
        employeeId: number;
        category: number;
        theme: string;
        presentedAt: Date;
    }

    export { PageHeaderValue, Employee, Category, Presentation }
}