import { Log } from "@/stores/LogStore"
import type { PageResponse } from "./AxiosUtils"
import { ref, type Ref } from "vue"


class Page<T> {
    public pageIn: Ref<number> = ref(0)
    private pages: number = 0
    public count: Ref<number> = ref(0)
    private limit: number
    private getData: (page: number, limit: number) => Promise<PageResponse<T[]> | null>
    private map: Map<number, T[]> = new Map()
    public list: Ref<T[]> = ref([])
    public loading: Ref<boolean> = ref<boolean>(false)

    constructor(limit: number, getData: (page: number, limit: number) => Promise<PageResponse<T[]> | null>){
        this.limit = limit
        this.getData = getData
    }

    private async getDataAndSetPage(): Promise<T[] | null>{
        this.loading.value = true
        const fun = this.getData(this.pageIn.value, this.limit);
        if(fun == null){
            return null
        }

        this.pageIn.value += 1
        const data = await fun
        if(data == null){
            return null
        }

        this.count.value = data.count
        this.pages = data.pages
        return data.data
    }

    private async scrollGet(){
        if(document.documentElement.clientHeight + window.scrollY + 4 < document.documentElement.scrollHeight){
            return
        }

        if(this.pageIn.value > this.pages || this.loading.value){
            return
        }

        const data = await this.getDataAndSetPage()
        if(data == null){
            return
        }

        if(data.length == 0){
            Log.warming("欧尼酱... 到底了啦... 不能再下面了啦...")
        }

        this.list.value = this.list.value.concat(data)
    }

    public async resetList(){
        this.pageIn.value = 0
        this.list.value = []
        const data = await this.getDataAndSetPage()
        this.list.value = data !== null ? data : []
    }

    public async to(pageIn: number): Promise<void>{
        if(this.pages == 0){
            const data = await this.getDataAndSetPage()
            if(data == null){
                return
            }

            this.pageIn.value = 0
            this.map.set(0, data)
            this.list.value = data
            this.loading.value = false
            return
        }
        
        if(pageIn >= this.pages){
            Log.error("页数太大了啦！！！")
            return
        }

        if(pageIn < 0){
            Log.error("页数太小了啦！！！")
            return
        }

        this.pageIn.value = pageIn
        const mapData = this.map.get(pageIn)
        if(mapData !== undefined){
            this.list.value = mapData
            return
        }

        const data = await this.getData(pageIn, this.limit)
        if(data == null){
            return
        }

        this.map.set(pageIn, data.data)
        this.list.value = data.data
    }

    public async next(){
        await this.to(this.pageIn.value + 1)
    }

    public async pre(){
        await this.to(this.pageIn.value - 1)
    }

    public startScroll(){
        window.addEventListener("scroll", this.scrollGet.bind(this))
    }

    public endScroll(){
        window.removeEventListener("scroll", this.scrollGet.bind(this))
    }

    public getPages(): number {
        return this.pages
    }
}


export { Page }