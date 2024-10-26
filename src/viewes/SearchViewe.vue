<script lang="ts" setup>
    import 'vue-waterfall-plugin-next/dist/style.css'
    import { ArticleRequest } from '@/request/ArticleRequest'
    import { ref, watch} from 'vue';
    import { useArticleStore } from '@/stores/ArticleStore';
    import { Log } from '@/stores/LogStore';
    import { Page } from '@/utils/PageUtils';
    import CheckedTagBar from '@/components/bar/CheckedTagBar.vue';
    import ArticleListBox from '@/components/box/ArticleListBox.vue';
    import SearchBar from '@/components/bar/SearchBar.vue';
    
    const useStore = useArticleStore()
    const keyword = ref<string>()
    const page = new Page(10, async (page, limit) => {
        return await ArticleRequest.getArticles(page, limit, useStore.desc, keyword.value)
    })

    await onSearch(useStore.search)
    async function onSearch(searcKeyword: string){
        keyword.value = searcKeyword + " "
        useStore.checkedTags.forEach(tag => {
            keyword.value += "#" + tag.tagName + " "
        })
        await page.resetList()
    }

    watch(() => useStore.desc, async (desc: boolean) => {
        if(desc){
            Log.info("正在进行日期倒序显示文章... 等等哦~")
        } else {
            Log.info("正在进行日期正序显示文章... 等等哦~")
        }
        await page.resetList()
        Log.info("重新完成排序啦！！！")
    })

    watch(() => useStore.search, async () => {
        Log.info("正在搜索... 等等哦~")
        await onSearch(useStore.search)
        Log.info("搜索完成啦！！！")
    })

    watch(useStore.checkedTags, async () => {
        Log.info("正在搜索... 等等哦~")
        await onSearch(useStore.search)
        Log.info("搜索完成啦！！！")
    })
</script>

<template>
    <div class="search-article-box">
        <div class="search-data">
            <SearchBar v-model:model-value="useStore.desc" @keyword="onSearch" />
            <h3 v-if="keyword?.trim().length">搜索: <span>{{ keyword }}</span></h3> 
            <div v-if="useStore.checkedTags.length">
                <h3>选中标签</h3>
                <CheckedTagBar v-model:modelValue="useStore.checkedTags"></CheckedTagBar>
            </div>
            <h3>共 <span>{{ page.count.value }}</span> 条结果</h3>
            <div class="not-article" v-if="!page.list.value.length">
                <h1>没有搜索到文章...</h1>
                <img src="../assets/not-article.jpg" loading="lazy" />
            </div>
        </div>

        <ArticleListBox v-model:page="page"></ArticleListBox>
    </div>
</template>

<style scoped>
    .search-article-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 15vh;
        margin: 0 auto;
        width: 70vw;
        min-height: 100vh;
        max-height: fit-content;
    }

    .not-article {
        text-align: center;
    }

    .search-bar {
        box-shadow: 0.2rem 0.2rem 0.4rem var(--shadow-color);
    }

    .search-data {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 60%;
        gap: 0.2rem;

        color: var(--font-color-2);
        box-shadow: 0.4rem 0.4rem 0.6rem var(--shadow-color-deep);
        background-color: var(--div-background-color);
    }

    .search-data > .search-bar {
        width: 100%;
        height: 5vh;
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
        font-size: 1.6rem;
    }

    .search-data h3 {
        margin-bottom: 0.3rem;
    }

    .search-data h3 > span {
        color: var(--font-color);
    }
</style>