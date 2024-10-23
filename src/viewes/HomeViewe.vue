<script setup lang="ts">
    import CoverPage from "@/components/CoverPage.vue"
    import ArticleListBox from "@/components/box/ArticleListBox.vue";
    import { ArticleRequest } from "@/request/ArticleRequest";
    import { Page } from "@/utils/PageUtils";

    const page = new Page(10, async (page, limit) => {
        return await ArticleRequest.getArticles(page, limit, true)
    })
</script>

<template>
    <CoverPage/>
    
    <div class="home">
        <Suspense>
            <ArticleListBox v-model:model-value="page" />
        </Suspense>
    </div>
</template>


<style scoped>
    .home {
        width: 75vw;
        margin: 5vh auto;
    }
</style>
