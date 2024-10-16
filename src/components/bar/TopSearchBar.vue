<script lang="ts" setup>
    import { useArticleStore } from '@/stores/ArticleStore';

    const useStore = useArticleStore()
</script>

<template>
    <button class="top-search-bar" @click="useStore.setSearchShow(!useStore.searchShow)">
        <i class="iconfont icon-sousuo"></i>
        <span>从 {{ useStore.count == 0 ? "?": useStore.count }} 篇文章中搜索...</span>
        <i class="iconfont icon-yab-ctrl"></i>
        <span>+/</span>
    </button>
</template>

<style scoped>
    .top-search-bar {
        display: flex;
        width: fit-content;
        align-items: center;
        padding: 0.2rem 0.4rem;

        border-radius: 1rem;

        box-shadow: 0.5rem 0.5rem 0.5rem var(--shadow-color);
        transition: all 0.1s;
        background-color: var(--button-font-color);
    }

    .top-search-bar:hover {
        border: 0.2rem solid var(--font-color);
    }

    .top-search-bar > * {
        margin: 0 0.15rem;
    }

    .top-search-bar > span {
        font-size: 0.8rem;
    }

    .top-search-bar > i {
        font-size: 1.5rem;
    }
</style>