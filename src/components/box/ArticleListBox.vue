/**
组件 - 下滑加载文章
*/
<script lang="ts" setup>
    import { Waterfall } from 'vue-waterfall-plugin-next'
    import 'vue-waterfall-plugin-next/dist/style.css'
    import { type Article } from '@/request/ArticleRequest'
    import { onActivated, onDeactivated } from 'vue';
    import { Page } from '@/utils/PageUtils';
    import ArticleCard from '../card/ArticleCard.vue';
    
    const { width = 450, showUser = true } = defineProps<{width?: number, showUser?: boolean}>()
    const page = defineModel<Page<Article>>("page", {
        required: true
    })

    onActivated(page.value.startScroll.bind(page.value))
    onDeactivated(page.value.endScroll.bind(page.value))
</script>

<template>
    <Waterfall :list="page.list.value" @afterRender="page.loading.value = false" :width="width" :gutter="20" :crossOrigin="false" backgroundColor="null">
        <template #default="{ item }">
            <ArticleCard :article="item" :show-user="showUser"></ArticleCard>
        </template>
    </Waterfall>
    <div class="loading" v-if="page.loading.value"><h3>加载更多中...</h3></div>
</template>

<style scoped>
    .loading {
        text-align: center;
        color: var(--font-color-2);
    }
</style>