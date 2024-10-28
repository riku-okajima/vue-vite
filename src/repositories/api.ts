import { format } from "date-fns/format";
import { Employee, Presentation } from "global";
import ky from "ky";
import { Ref } from "vue";

// デフォルト設定
const api = ky.create({
    prefixUrl: 'http://localhost:8080/api/',
    timeout: 100000,
    retry: 3,
    hooks: {
        beforeRequest: [
            (request: Request) => {
                // alert('before');
                // console.log(request);
            },
        ],
        afterResponse: [
            (_request, _options, response: Response) => {
                // alert('after');
                // console.log(response);
            },
        ],
    }
});

// 社員情報の取得
export const fetchEmployeeData = async (employeeList: Ref<Employee[]>): Promise<void> => {
    try {
        const response:[] = await api.get('employee/').json();
        response.forEach((item: {employeeId: number,lastName: string, firstName: string}, index: number) => {
            employeeList.value.push({ employeeId: item["employeeId"], name: item["lastName"] + " " + item["firstName"] });
        });
    } catch (err) {
        console.log(err);
    }
};

// 発表情報の取得
export const fetchPresentationData = async (presentationList: Ref<Presentation[]>,employeeList: Ref<Employee[]>): Promise<void> => {
    try {
        const response:[] = await api.get('presentation/').json();
        console.log(response);
        response.forEach((item: any, index: number) => {
            presentationList.value.push({presentationId: Number(item["presentationId"]), employeeId: Number(item["employeeId"]), category: item["category"], theme: item["theme"], presentedAt: item["presentedAt"], formState: false });
            employeeList.value.push({ employeeId: item["employeeId"], name: item["lastName"] + " " + item["firstName"] });
        });
    } catch (err) {
        console.log(err);
    }
};

// 発表情報の登録
export const registerPresentationData = async (presentationList: Presentation[]): Promise<void> => {
    try {
        const request = presentationList.map(item => {
            return {employeeId: item.employeeId, category: item.category, theme: item.theme, presentedAt: format(item.presentedAt, "yyyy-MM-dd")};
        });
        const response = await api.post('presentation/create/', {json: request}).json();
    } catch(e) {
        console.error(e)
    }
};

// 発表情報の削除
export const deletePresentationData = async (presentationId: number) => {
    try {
        const response = await api.delete('presentation/delete/', {searchParams: {presentationId: presentationId }})
    } catch(e) {
        console.error(e)
    }
}
  

