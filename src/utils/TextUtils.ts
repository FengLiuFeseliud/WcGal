import type { Ref } from "vue/dist/vue.js"

function showPlaceholderList(placeholder: Ref<string>, placeholders: string[], time: number, skip: number){
    let index = 0
    let textIndex = 0
    let text = placeholders[textIndex]
    setInterval(() => {
        if(index > text.length + skip){
            textIndex += 1
            if(textIndex >= placeholders.length){
                textIndex = 0
            }
            text = placeholders[textIndex]
            index = 0
        }
        placeholder.value = text.slice(0, index) + "_"
        index += 1
    }, time)
}

function getSmallTime(tiem: string): string{
    const tiemDate = new Date(Date.parse(tiem))
    const date = Math.floor(tiemDate.getTime() / 1000)
    const newDate = Math.floor(new Date().getTime() / 1000)

    const day = Math.floor((newDate - date) / (60 * 60 * 24))
    if(day > 7){
        return tiemDate.getFullYear() + "/" + (tiemDate.getMonth() + 1) + "/" + tiemDate.getDate()
    }

    if(day >= 1){
        return day + "天前"
    }

    const hours = Math.floor((newDate - date) / (60 * 60))
    if(hours >= 1){
        return hours + "小时前"
    }

    const minutes = Math.floor((newDate - date) / 60)
    if(minutes >= 1){
        return minutes + "分钟前"
    }

    const seconds = newDate - date
    if(seconds > 30){
        return seconds + "秒前"
    }

    return "刚刚"
}

export { showPlaceholderList , getSmallTime }