import type { Tag } from "@/request/ArticleRequest";
import { defineStore } from "pinia";
import { ref } from "vue";


const useArticleStore = defineStore("article", () => {
    const search = ref<string>("")
    const desc = ref<boolean>(true)
    const checkedTags = ref<Tag[]>([])
    const searchShow = ref<boolean>(false)
    const count = ref<number>(0)
    const tags = ref<Tag[]>()

    function setSearchShow(_searchShow: boolean){
        searchShow.value = _searchShow
    }

    function setCount(_count: number){
        count.value = _count
    }

    function setTags(_tags: Tag[]){
        tags.value = _tags
    }

    return {
        search,
        desc,
        checkedTags,
        searchShow,
        count,
        tags,
        setSearchShow,
        setCount,
        setTags
    }
})

export { useArticleStore }