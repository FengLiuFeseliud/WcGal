/**
组件 - 下滑加载文章
*/
<script lang="ts" setup>
    import { ArticleRequest, type Article } from '@/request/ArticleRequest'
    import Card from './Card.vue'
    import TagBar from './bar/TagBar.vue';
    import { onActivated, onDeactivated, ref, watch, type Ref} from 'vue';
    import { useArticleStore } from '@/stores/ArticleStore';
    import { Log } from '@/stores/LogStore';
    import WaterFallBox from './box/WaterFallBox.vue';

    const useStore = useArticleStore()
    var articles: Ref<Article[]> = ref([])
    var page: number = 0
    var pages: number = 0
    var keywordData = ""

    async function resetList(){
        page = 0
        var fun = ArticleRequest.getArticles(page, 10, useStore.desc, keywordData);
        page += 1
        var data = await fun
        if(data == null){
            return
        }

        articles.value = data.data
        pages = data.pages
    }

    async function onSearch(searcKeyword: string){
        keywordData = searcKeyword + " "
        useStore.checkedTags.forEach(tag => {
            keywordData += "#" + tag.tagName + " "
        })
        await resetList()
    }

    async function scrollGat() {
        if(document.documentElement.clientHeight + window.scrollY + 4 < document.documentElement.scrollHeight){
            return
        }

        if(page > pages){
            return
        }
        
        var fun = ArticleRequest.getArticles(page, 10, useStore.desc, keywordData);
        page += 1
        var data = await fun
        if(data == null){
            return
        }

        if(data.data.length == 0){
            Log.warming("欧尼酱... 到底了啦... 不能再下面了啦...")
        }

        articles.value = articles.value.concat(data.data)
        pages = data.pages
    }

    watch(() => useStore.desc, async (desc: boolean) => {
        if(desc){
            Log.info("正在进行日期倒序显示文章... 等等哦~")
        } else {
            Log.info("正在进行日期正序显示文章... 等等哦~")
        }
        await resetList()
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

    onActivated(() => window.addEventListener("scroll", scrollGat))
    onDeactivated(() => window.removeEventListener("scroll", scrollGat))
</script>

<template>
    <div class="game-list">
        <div class="not-article" v-if="!articles.length">
            <h1>没有搜索到文章...</h1>
            <img src="../assets/not-article.jpg" loading="lazy" />
        </div>

        <WaterFallBox :column="2" :itemWidth="'25vw'" :itemAddHigh="'0vh'" :datas="articles">
            
        </WaterFallBox>
    </div>
</template>

<style scoped>

</style>