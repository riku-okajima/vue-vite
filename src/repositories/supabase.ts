import { Ref } from "vue";
import { Employee, Presentation } from "global";
import { supabase } from "../supabase";
import { format } from "date-fns/format";

// 社員情報の取得
export const fetchEmployeeData = async (employee_list: Ref<Employee[]>): Promise<void> => {
  try {
    const { data, status }: any = await supabase
      .from("employee")
      .select("*")
      .eq("is_active", true)
      .order("employee_id", { ascending: true });
    if (status == 200 && data.length != 0) {
      data.forEach((item: any, index: number) => {
        employee_list.value.push({ employeeId: item["employee_id"], name: item["last_name"] + " " + item["first_name"] });
      });
    }
  } catch (e) {
    console.error(e);
  }
};

// 発表情報の取得
export const fetchPresentationData = async (presentation_list: Ref<Presentation[]>,employee_list: Ref<Employee[]>): Promise<void> => {
  try {
    const { data, status }: any = await supabase
    .from("presentation")
    .select("*, employee ( employee_id, last_name, first_name )")
    .eq("delete_flg", 0)
    .order("presentation_id", { ascending: true });
    if (status == 200 && data.length != 0) {
      data.forEach((item: any, index: number) => {
        presentation_list.value.push({presentationId: Number(item["presentation_id"]), employeeId: Number(item["employee_id"]), category: item["category"], theme: item["theme"], presentedAt: item["presented_at"], formState: false });
        employee_list.value.push({ employeeId: item["employee_id"], name: item["employee"]["last_name"] + " " + item["employee"]["first_name"] });
      });
    }
  } catch (e) {
    console.error(e);
  }
};

// 発表情報の登録
export const registerPresentationData = async (presentationList: Presentation[]): Promise<void> => {
  try {
    const modifiedList = presentationList.map(item => {
      return {employee_id: item.employeeId, category: item.category, theme: item.theme, presented_at: format(item.presentedAt, "yyyy-MM-dd")};
    });
    const response = await supabase.from("presentation").insert(modifiedList);
  } catch(e) {
    console.error(e)
  }
};

// 発表情報の削除
export const deletePresentationData = async (presentationId: number) => {
  try {
    const response = await supabase
    .from("presentation")
    .update({delete_flg: 9, delete_at: new Date()})
    .eq("presentation_id", presentationId);
  } catch(e) {
    console.error(e)
  }
}