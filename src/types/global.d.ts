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
        presentationId: number;
        employeeId: number;
        category: number;
        theme: string;
        presentedAt: Date;
        formState: boolean;
    }

    export { PageHeaderValue, Employee, Category, Presentation }
}