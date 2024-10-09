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

export { showPlaceholderList }