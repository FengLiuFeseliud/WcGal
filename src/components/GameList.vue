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

    function getTime(tiem: string){
        var date = new Date(Date.parse(tiem))
        return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDay()
            + " " + date.getHours() + ":" + date.getMinutes()
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

        <Card v-for=" article in articles" :key="article.articleId" :routerPath="'/article/' + article.articleId">
            <img :src="article.cover" @click.stop="" loading="lazy" />
            <div to="/article/{{ article.articleId }}" class="article-data">
                {{ article.articleTitle }}

                <br>
                <span>
                    
                </span>
                <TagBar :tags="article.tagsData" v-model:model-value="useStore.checkedTags" @click.stop=""></TagBar>

                <span>
                    上传者: {{ article.articleAuthor.userName }}
                </span>
                &nbsp;
                <span>
                    上传时间: {{ getTime(article.createTime) }}
                </span>
                &nbsp;
                <span>
                    更新时间: {{ getTime(article.updateTime) }}
                </span>
            </div>
        </Card>
    </div>
</template>

<style scoped>
    .game-list {
        display: flex;
        flex-direction: column;
        width: 55%;
        min-width: fit-content;
        max-width: 1117px;
        height: fit-content;
        margin: 3rem auto;
        padding: 10px 0;

        background-color: var(--cover-page-background-color);
        border-radius: 10px;
    }

    .game-list > .card {
        width: 90%;
        height: 12.5rem;
        margin: 20px 5%;
    }

    .card > * {
        float: left;
        margin: 15px;
    }

    .card > img {
        position: absolute;
        width: 20rem;

        border-radius: 10px;
        box-shadow: 1.5px 1.5px 3px 3px rgb(208, 207, 207);
        transition: all 0.25s;
    }

    .card > img:hover {
        position: absolute;
        width: 30%;
        z-index: 1;
    }

    .card > .article-data {
        float: right;
        width: 60%;
    }

    .card > .tag-bar{
        min-width: 60%;
        margin-left: 35%;
    } 

    .not-article > h1 {
        margin: 10px;
        text-align: center;
        color: var(--font-color);
    }

    .not-article > img {
        display: block;
        margin: auto;
    }
</style>