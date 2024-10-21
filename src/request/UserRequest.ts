import { Log } from "@/stores/LogStore";
import { useUserStore } from "@/stores/UserStore";
import { AxiosUilt, type Response } from "@/utils/AxiosUtils";

interface UserInfo {
    userId: number
    userName: string
    head: string
    admin: boolean
}

interface User extends UserInfo {
    email: string
    createTime: string
    updateTime: string
    token: string
}

class UserRequest {

    public static async info(): Promise<void>{
        if(useUserStore().token == "null"){
            return
        }

        const data = <Response<User>><unknown>(await AxiosUilt.create().post("/user/info"))
        if(data.code == 401){
            Log.error("登录过期！！！")
            localStorage.removeItem("token")
            return
        }
        useUserStore().setUser(data.data)
    }

    public static async get(userId: number): Promise<Response<User>>{
        return <Response<User>><unknown>(await AxiosUilt.create().post("/user/" + userId))
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


export { UserRequest, type User, type UserInfo }