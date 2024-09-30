import { AxiosUilt } from "@/utils/AxiosUtils";



class FileRequest{
    public static async uploadImg(filesData: FileList): Promise<string[]>{
        const data = await AxiosUilt.create().upload("/img/upload", filesData)
        if(data == null){
            return []
        }

        return data.code == 200 ? data.data: []
    }
}

export { FileRequest }