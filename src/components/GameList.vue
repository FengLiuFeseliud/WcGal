/**
组件 - 下滑加载文章
*/
<script lang="ts" setup>
    import { ArticleRequest } from '@/request/ArticleRequest'
    import { onActivated, onDeactivated, watch} from 'vue';
    import { useArticleStore } from '@/stores/ArticleStore';
    import { Log } from '@/stores/LogStore';
    import WaterFallBox from './box/WaterFallBox.vue';
    import { Page } from '@/utils/PageUtils';
    
    const useStore = useArticleStore()
    var keywordData = ""
    const page = new Page(10, async (page, limit) => {
        return await ArticleRequest.getArticles(page, limit, useStore.desc, keywordData)
    })

    async function onSearch(searcKeyword: string){
        keywordData = searcKeyword + " "
        useStore.checkedTags.forEach(tag => {
            keywordData += "#" + tag.tagName + " "
        })
        await page.resetList.bind(page)()
    }

    watch(() => useStore.desc, async (desc: boolean) => {
        if(desc){
            Log.info("正在进行日期倒序显示文章... 等等哦~")
        } else {
            Log.info("正在进行日期正序显示文章... 等等哦~")
        }
        await page.resetList.bind(page)()
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

    onActivated(page.startScroll.bind(page))
    onDeactivated(page.endScroll.bind(page))
</script>

<template>
    <div class="game-list">
        <div class="not-article" v-if="!page.list.value.length">
            <h1>没有搜索到文章...</h1>
            <img src="../assets/not-article.jpg" loading="lazy" />
        </div>

        <WaterFallBox :column="2" :itemWidth="'25vw'" :itemAddHigh="'0vh'" :datas="page.list.value">
            
        </WaterFallBox>
    </div>
</template>

<style scoped>

</style>