import { defineStore } from "pinia";
import { ref, type Ref } from "vue";


enum LogType {
    INFO = "info",
    WARMING = "warming",
    ERROR = "error"
}


class Log{
    public level: LogType
    public data: string

    constructor(logType: LogType, data: string){
        this.level = logType
        this.data = data
    }

    public static info(data: string){
        useLogStore().addLog(new Log(LogType.INFO, data))
    }

    public static warming(data: string){
        useLogStore().addLog(new Log(LogType.WARMING, data))
    }

    public static error(data: string){
        useLogStore().addLog(new Log(LogType.ERROR, data))
    }
}


const useLogStore = defineStore("log", () => {
    const logs = ref<Log[]>([])

    function getLogs(): Ref<Log[]>{
        return logs
    }

    function getCount(): number{
        return logs.value.length
    }

    function addLog(log: Log) {
        logs.value.push(log)
    }

    function delLog(index: number){
        logs.value.splice(index, 1)
    }

    return {
        logs,
        getLogs,
        getCount,
        addLog,
        delLog
    }
})


export { useLogStore, LogType, Log}