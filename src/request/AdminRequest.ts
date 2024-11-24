import { AxiosUilt, type Response } from "@/utils/AxiosUtils";


class AdminRequest {
    public static async adminInit(): Promise<Response<boolean | null>>{
        return <Response<boolean | null>><unknown>(await AxiosUilt.create().post("/admin/init"));
    }
}

export { AdminRequest }