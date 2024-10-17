import { defineStore } from "pinia";
import { ref } from "vue";


const useWebStore = defineStore("web", () => {
    const snowShow = ref<boolean>((localStorage.getItem("snow") == null? true: Boolean(localStorage.getItem("snow"))))

    return {
        snowShow
    }
})

export { useWebStore }