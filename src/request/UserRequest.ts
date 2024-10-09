import { useUserStore } from "@/stores/UserStore";
import { AxiosUilt, type Response } from "@/utils/AxiosUtils";

interface User {
    userId: number
    userName: string
    email: string
    head: string
    admin: boolean
    createTime: string
    updateTime: string
    token: string
}


class UserRequest {

    public static get(){
        // AxiosUilt.create().post("")
    }
    
    public static async sendEmailCode(email: string): Promise<boolean>{
        const data = await AxiosUilt.create().post("/user/code", {email: email})
        if(data == null || data.code != 200){
            return false
        }
        return true
    }

    public static async login(email: string, password: string): Promise<boolean>{
        const data = <Response<User>><unknown>(await AxiosUilt.create().post("/user/login", {
            "email": email,
            "password": password
        }))

        if(data == null || data.code != 200){
            return false
        }
        useUserStore().setUser(data.data)
        return true
    }

    public static async register(userName: string, email: string, password: string, code: string): Promise<boolean>{
        const data = await AxiosUilt.create().post("/user/register", {
            "userName": userName,
            "email": email,
            "password": password,
            "code": code
        })

        if(data == null || data.code != 200){
            return false
        }
        return true
    }

    public static async resetPassword(email: string, password: string, code: string): Promise<boolean>{
        const data = await AxiosUilt.create().post("/user/reset/password", {
            "email": email,
            "password": password,
            "code": code
        })

        if(data == null || data.code != 200){
            return false
        }

        return true
    }
}


export { UserRequest, type User }