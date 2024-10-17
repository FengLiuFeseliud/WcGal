<script lang="ts" setup>
    import MarkDown from '@/components/tool/MarkDown.vue';
    import { ArticleRequest, type Article } from '@/request/ArticleRequest';
    import { FileRequest } from '@/request/FileRequest';
    import { router } from '@/router';
    import { useArticleStore } from '@/stores/ArticleStore';
    import { Log } from '@/stores/LogStore';
    import { getTime, toTop } from '@/utils/HtmlUtils';
    import { onActivated, ref } from 'vue';
    
    const { articleId } = defineProps<{articleId: string}>()
    const like = ref<boolean>(false)
    const likeEd = ref<boolean>(false)
    const favorite = ref<boolean>(false)
    const favoriteEd = ref<boolean>(false)
    
    var article = ref<Article>()
    var preArticleId: number

    async function getArticle(articleId: string) {
        if(Number.isNaN(articleId)){
            Log.error("文章 id 错啦！！！")
            return
        }

        let id = Number(articleId)
        if(preArticleId == id){
            return
        }

        article.value = undefined
        Log.info("获取文章中...")
        const response = await ArticleRequest.getArticle(id)
        if(response.code != 200){
            Log.info("获取文章失败... qwq")
            setTimeout(() => {
                router.back()
            }, 1000)
        }

        article.value = response.data
        if(typeof article.value == "object"){
            useArticleStore().lookArticle = article.value
        }
        preArticleId = article.value.articleId
    }

    async function onLike() {
        like.value = !like.value
        likeEd.value = like.value ? true: false
    }

    async function onFavorite() {
        favorite.value = !favorite.value
        favoriteEd.value = favorite.value ? true: false
    }

    onActivated(async () => {
        await getArticle(articleId)
        toTop()
    })
</script>

<template>
    <div class="article-box">
        <div class="article" v-if="article !== undefined">
            <h1>{{ article.articleTitle }}</h1>
            <div class="article-data">
                <i class="iconfont icon-views">&nbsp;<span>{{ article.views }}</span></i> &nbsp;
                <hr>
                <i class="iconfont icon-message-comments">&nbsp;<span>{{ article.comments }}</span></i>&nbsp;
                <hr>
                <i class="iconfont like icon-likes">&nbsp;<span>{{ article.likes }}</span></i>&nbsp;
                <hr>
                <i class="iconfont favorite icon-favorites-fill">&nbsp;<span>{{ article.favorites }}</span></i>&nbsp;
                <hr>
                <i class="iconfont icon-e-date-upload">&nbsp;<span>{{ getTime(article.createTime) }}</span></i>&nbsp;
                <hr>
                <i class="iconfont icon-update">&nbsp;<span>{{ getTime(article.updateTime) }}</span></i>
                <hr>
                <RouterLink :to="'/upload/' + article.articleId" class="iconfont bianji icon-bianji">&nbsp;<span>编辑</span></RouterLink>
            </div>
            <hr>
            <MarkDown :text="'${toc}\n' + article.articleContent" :line="false" :show="true"></MarkDown>
        </div>
        <div class="ritem" v-if="article !== undefined">
            <RouterLink :to="'/user/' + article.articleAuthor.userId" class="author-info">
                <img :src="FileRequest.img(article.articleAuthor.head + '?scale=0.3')">
                <div class="author-data">
                    <i class="iconfont icon-nickname_default">&nbsp;<span>{{ article.articleAuthor.userName }}</span></i>
                    
                </div>
            </RouterLink>

            <div class="article-set">
                <button class="iconfont back icon-back" @click="router.back"></button>
                <button :class="'iconfont like ' + (like ? 'icon-likes' :'icon-likes1')" 
                    @mouseover="like = true" 
                    @mouseout="like = likeEd ? true: false"
                    @click="onLike">
                </button>
                <button :class="'iconfont favorite ' + (favorite ? 'icon-favorites-fill' :'icon-favorites')" 
                    @mouseover="favorite = true"
                    @mouseout="favorite = favoriteEd ? true: false"
                    @click="onFavorite">
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .article-box {
        padding-top: 15vh;
        margin: 0 auto;
        width: 60vw;
        min-height: 100vh;
        height: fit-content;
    }

    .article {
        padding: 4vh 2vw;
        padding-top: 2vh;

        
        border-radius: 1rem;
        box-shadow: 0.6rem 0.6rem 0.8rem var(--shadow-color-deep);
        background-color: var(--div-background-color);
    }

    .article > h1 {
        color: var(--font-color);
        margin-bottom: 1rem;
    }

    .ritem {
        position: fixed;
        display: flex;
        flex-direction: column;
        width: 15vw;
        height: fit-content;
        top: 15vh;
        right: 1.9vw;
        gap: 1rem;
    }

    .article-data {
        display: flex;
        flex-wrap: wrap;
        gap: 0.2rem;
    }

    .article-data > * {
        font-size: 1.2rem;
        color: var(--font-color-2);
    }

    .article-data > * > span {
        font-size: 1rem;
        color: var(--font-color);
    }

    .author-info {
        display: flex;
        padding: 0.8rem;
        gap: 0.5rem;

        border-radius: 1rem;
        box-shadow: 0.4rem 0.4rem 0.6rem var(--shadow-color-deep);
        background-color: var(--div-background-color);
    }

    .author-info > img {
        width: 3vw;
        border-radius: 10rem;
    }

    .article-set {
        display: flex;
        overflow: hidden;

        border-radius: 1rem;
        box-shadow: 0.4rem 0.4rem 0.6rem var(--shadow-color-deep);
        background-color: var(--div-background-color);
    }

    .article-set > button {
        flex: 1;
        height: 4vh;

        transition: all 0.2s;
        text-align: center;
        font-size: 2rem;
        background-color: var(--div-background-color);
    }

    .like {
        color: rgb(253, 90, 90);
    }

    .favorite {
        color: orange;
    }

    .article-data > button {
        padding: 0 1rem;
        font-size: 1.2rem;
        background-color: var(--div-background-color);
        transition: all 0.2s;
    }

    .article-data > button:hover * {
        color: var(--link-hover-font-color);
    }

    .article-data > button:hover {
        color: var(--link-hover-font-color);
    }

    .article-set > button:hover {
        background-color: var(--div-background-color-deep);
    }

    .article-set > .back {
        color: var(--font-color);
    }

    .article-set > .back:hover {
        color: var(--link-hover-font-color);
    }

    .article >>> .markdown > .table-of-contents {
        width: 15vw;
        position: fixed;
        padding: 1vw;
        top: 15vh;
        left: 1.5vw;
        overflow-x: hidden;
        text-wrap: nowrap;

        border-radius: 1rem;
        box-shadow: 0.5rem 0.5rem 0.7rem var(--shadow-color-deep);
        background-color: var(--div-background-color);
    }

    .article >>> .markdown > .table-of-contents::before {
        content: "目录";

        font-weight: bold;
        font-size: 1.2rem;
        color: var(--font-color-2);
    }
</style>