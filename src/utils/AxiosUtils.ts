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
    
    constructor(url: string){
        this.url = url;
        this.instance = axios.create({
            baseURL: url,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    public static create(){
        return new AxiosUilt("http://127.0.0.1:8080");
    }

    public async post<D = any, T = any>(path: string, data?: D): Promise<Response<T> | null>{
        const response: Response<T> = await this.instance.post(path, data)
        .then(response => {
            return response.data
        })
        .catch(error => {
            console.error(error)
            return null;
        })

        return response
    }

    public async upload(path: string, filesData: FileList):  Promise<Response<string[]> | null>{
        const formData = new FormData();
        Array.from(filesData).forEach((file) => {
            formData.append("file", file);
        });
        return await this.instance.post(path, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        }).then(response => {
            return response.data
        });
    }
}

export {AxiosUilt, type Response, type PageResponse}