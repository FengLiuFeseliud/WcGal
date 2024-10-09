<script setup lang="ts">
    import TopBar from "./components/bar/TopBar.vue"
    import LogBox from "./components/box/LogBox.vue";
    import SearchBox from '@/components/box/SearchBox.vue';
    import { useArticleStore } from "./stores/ArticleStore";

    const useStore = useArticleStore()
</script>

<template>
    <TopBar/>

    <Suspense>
        <SearchBox :show="useStore.searchShow"></SearchBox>
    </Suspense>

    <Suspense>
        <router-view v-slot="{ Component }">
            <keep-alive>
                <component :is="Component" />
            </keep-alive>
        </router-view>
    </Suspense>
    <LogBox></LogBox>
</template>


<style>
    
</style>
