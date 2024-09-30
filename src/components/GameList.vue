<script lang="ts" setup>
    import { ArticleRequest, type Article, type Tag } from '@/request/ArticleRequest'
    import Card from './Card.vue'
    import TagBar from './bar/TagBar.vue';
    import SearchBar from "./bar/SearchBar.vue";
    import CheckedTagBar from './bar/CheckedTagBar.vue';
    import TagSideBar from "./bar/TagSideBar.vue";
    import { ref, watch, type Ref} from 'vue';

    var articles: Ref<Article[]> = ref([])
    var desc: Ref<boolean> = ref(true)
    var checkedTags: Ref<Tag[]> = ref([])

    var page: number = 0
    var pages: number = 0
    
    var keywordData = ""
    async function resetList(){
        page = 0
        var fun = ArticleRequest.getArticles(page, 10, desc.value, keywordData);
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
        checkedTags.value.forEach(tag => {
            keywordData += "#" + tag.tagName + " "
        })
        await resetList()
    }

    watch(desc, async () => await resetList())
    watch(checkedTags, async () => await onSearch(""), {immediate: true, deep: true})
    
    window.addEventListener("scroll", async () => {
        if(document.documentElement.clientHeight + window.scrollY + 4 < document.documentElement.scrollHeight){
            return
        }

        if(page > pages){
            return
        }
        
        var fun = ArticleRequest.getArticles(page, 10, desc.value, keywordData);
        page += 1
        var data = await fun
        if(data == null){
            return
        }

        articles.value = articles.value.concat(data.data)
        pages = data.pages
    })

    function getTime(tiem: string){
        var date = new Date(Date.parse(tiem))
        return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDay()
            + " " + date.getHours() + ":" + date.getMinutes()
    }
</script>

<template>
    <SearchBar v-model:model-value="desc" @keyword="onSearch" />
    <CheckedTagBar :tags="checkedTags" v-model:model-value="checkedTags"></CheckedTagBar>
    <TagSideBar v-model:model-value="checkedTags"/>

    <div class="game-list">
        <div class="not-article" v-if="!articles.length">
            <h1>没有搜索到文章...</h1>
            <img src="../assets/not-article.jpg" />
        </div>

        <Card v-for=" article in articles" :key="article.articleId" routerPath="/article/{{ article.articleId }}">
            <img :src="article.cover" @click.stop=""/>
            <div to="/article/{{ article.articleId }}" class="article-data">
                {{ article.articleTitle }}

                <br>
                <span>
                    
                </span>
                <TagBar :tags="article.tagsData" v-model:model-value="checkedTags" @click.stop=""></TagBar>

                <span>
                    上传者: {{ article.articleAuthor }}
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
        width: 55%;
        min-width: fit-content;
        max-width: 1117px;
        height: fit-content;
        margin: auto;
        margin-bottom: 40px;
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
        height: 10.5rem;

        border-radius: 10px;
        box-shadow: 1.5px 1.5px 3px 3px rgb(208, 207, 207);
        transition: all 0.25s;
    }

    .card > img:hover {
        position: absolute;

        width: 30%;
        max-width: none;
        height: 34%;
        max-height: none;

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