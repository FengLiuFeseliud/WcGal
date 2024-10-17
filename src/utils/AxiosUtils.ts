import { Log } from "@/stores/LogStore";
import { useUserStore } from "@/stores/UserStore";
import { type AxiosError, type AxiosInstance, type AxiosResponse } from "axios";
import axios from "axios";

interface Response<T>{
    code: number
    message: string
    data: T
}

interface PageResponse<T> extends Response<T>{
    count: number
    pages: number
}

class AxiosUilt {
    private url: string;
    public instance: AxiosInstance;
    public static api: string = "http://localhost:8080"
    // public static api: string = "https://api.wcgal.xyz"
    
    constructor(url: string){
        this.url = url;
        this.instance = axios.create({
            baseURL: url,
            headers: {
                'Content-Type': 'application/json',
                'token': useUserStore().token
            }
        })
    }

    public static create(){
        return new AxiosUilt(AxiosUilt.api);
    }

    private static resetToken(response: AxiosResponse<any, any>){
        const token = response.headers["token"]
        if(token == undefined){
            return
        }
        localStorage.setItem("token", token)
        useUserStore().token = token
    }

    public async post<D = any, T = any>(path: string, data?: D): Promise<Response<T> | null>{
        const responseData: Response<T> = await this.instance.post(path, data)
        .then(response => {
            AxiosUilt.resetToken(response)
            return response.data
        })
        .catch((error: AxiosError) => {
            if(error.response === undefined){
                Log.error(error.message)
                return null
            } else {
                AxiosUilt.resetToken(error.response)
            }
            return error.response.data
        })
        
        
        if(responseData.code != 200){
            Log.error(responseData.message)
        }
        return responseData
    }

    public async upload(path: string, filesData: FileList):  Promise<Response<string[]> | null>{
        const formData = new FormData();
        Array.from(filesData).forEach((file) => {
            Log.info("上传 " + file.name + " ...")
            formData.append("file", file);
        })

        const response: Response<string[]> = await this.instance.post(path, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
            AxiosUilt.resetToken(response)
            return response.data
        })
        .catch((error: AxiosError) => {
            if(error.response === undefined){
                Log.error(error.message)
                return null
            } else {
                AxiosUilt.resetToken(error.response)
            }
            return error.response.data
        })
        
        if(response.code != 200){
            Log.error(response.message)
        } else {
            Log.info("上传成功！")
        }
        return response
    }
}

export {AxiosUilt, type Response, type PageResponse}