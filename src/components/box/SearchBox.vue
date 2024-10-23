<script lang="ts" setup>
    import SearchBar from "@/components/bar/SearchBar.vue";
    import CheckedTagBar from '@/components/bar/CheckedTagBar.vue';
    import TagSideBar from "@/components/bar/TagSideBar.vue";
    import CoverBox from "./CoverBox.vue";
    import { useArticleStore } from "@/stores/ArticleStore";
    import { router } from "@/router";
    import { watch } from "vue";

    const useStore = useArticleStore()
    function onSearch(data: string){
        useStore.search = data
        router.push({"path": "/search"})
    }

    watch(useStore.checkedTags, () => {
        router.push({"path": "/search"})
    })

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
    <CoverBox :show="useStore.searchShow">
        <div class="box">
            <SearchBar v-model:model-value="useStore.desc" @keyword="onSearch" />
            <CheckedTagBar v-model:model-value="useStore.checkedTags"></CheckedTagBar>
            <TagSideBar v-model:model-value="useStore.checkedTags"/>
        </div>
    </CoverBox>
</template>

<style scoped>
    .cover {
        position: fixed;
        z-index: 3;

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
        width: 30vw;
        padding: 1rem;
        
        background-color: var(--cover-page-background-color);
        border-radius: 1rem;
    }

    .search-bar {
        width: 30vw;
    }

    .search-bar :deep(label) {
        padding: 0.5rem;
        font-size: 2rem;
    }

    .search-bar :deep(input) {
        font-size: 1.3rem;
        padding: 0.5rem;
    }

    .search-bar :deep(i) {
        font-size: 1.8rem;
    }

</style>