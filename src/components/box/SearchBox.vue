<script lang="ts" setup>
    import SearchBar from "@/components/bar/SearchBar.vue";
    import CheckedTagBar from '@/components/bar/CheckedTagBar.vue';
    import TagSideBar from "@/components/bar/TagSideBar.vue";
    import { useArticleStore } from "@/stores/ArticleStore";
    import { router } from "@/router";

    const useStore = useArticleStore()
    const { show } = defineProps<{show: boolean}>()

    function onSearch(data: string){
        useStore.search = data
        router.push({"path": "/"})
    }

    var preCode = ""
    function keyShow(key: KeyboardEvent){
        if(key.key === "Escape"){
            useStore.setSearchShow(false)
        }

        if(key.key === "/" && preCode === "Control" || key.key === "Control" && preCode === "/"){
            useStore.setSearchShow(true)
        }

        preCode = key.key
    }
    
    window.addEventListener("keydown", keyShow)
</script>

<template>
    <div class="search-box" v-show="show">
        <div class="box">
            <SearchBar v-model:model-value="useStore.desc" @keyword="onSearch" />
            <CheckedTagBar v-model:model-value="useStore.checkedTags"></CheckedTagBar>
            <TagSideBar v-model:model-value="useStore.checkedTags"/>
        </div>
    </div>
</template>

<style scoped>
    .search-box {
        display: flex;
        position: fixed;
        width: 100vw;
        height: 100vh;
        z-index: 9;

        align-items: center;
        background-color: var(--cover-page-background-color-deep);
    }

    .tag-side-bar {
        width: 100%;
    }

    .box {
        display: flex;
        gap: 1vh;
        flex-direction: column;
        margin: 0 auto;
        margin-bottom: 60vh;
        width: auto;
        padding: 1rem;
        background-color: var(--cover-page-background-color);

        border-radius: 1rem;
    }

    .box >>> .tag-bar {
        margin-top: 0;
    }

    .search-bar {
        width: 30vw;
    }

    .search-bar >>> label {
        padding: 0.5rem;
        font-size: 2rem;
    }

    .search-bar >>> input {
        font-size: 1.3rem;
        padding: 0.5rem;
    }

    .search-bar >>> i {
        font-size: 2rem;
    }

    

</style>