export default class EnumData<T> {
    private data: T[]

    constructor(data: T[]){
        this.data = data
    }

    public static create<T>(data: T[]): EnumData<T>{
        return new EnumData(data)
    }

    public count(): number {
        return this.data.length
    }

    public getItem(index: number): T{
        return this.data[index]
    }
    
}