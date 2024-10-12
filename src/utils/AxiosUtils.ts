import { Log } from "@/stores/LogStore";
import { useUserStore } from "@/stores/UserStore";
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
    public instance: axios.AxiosInstance;
    public static api: string = "http://localhost:8080"
    
    constructor(url: string){
        this.url = url;
        this.instance = axios.create({
            baseURL: url,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'token': useUserStore().token
            }
        })
    }

    public static create(){
        return new AxiosUilt(AxiosUilt.api);
    }

    public async post<D = any, T = any>(path: string, data?: D): Promise<Response<T> | null>{
        const response: Response<T> = await this.instance.post(path, data)
        .then(response => {
            return response.data
        })
        
        if(response.code != 200){
            Log.error(response.message)
        }
        return response
    }

    public async upload(path: string, filesData: FileList):  Promise<Response<string[]> | null>{
        const formData = new FormData();
        Array.from(filesData).forEach((file) => {
            Log.info("上传 " + file.name + " ...")
            formData.append("file", file);
        });
        const response: Response<string[]> = await this.instance.post(path, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then(response => {
            return response.data
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