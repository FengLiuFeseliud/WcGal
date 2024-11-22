<script lang="ts" setup>
    import CommentBox from '@/components/box/CommentAreaBox.vue';
    import MarkDown from '@/components/tool/MarkDown.vue';
    import ConfirmButton from '@/components/button/ConfirmButton.vue';
    import { ArticleRequest, type Article } from '@/request/ArticleRequest';
    import { FileRequest } from '@/request/FileRequest';
    import { router } from '@/router';
    import { useArticleStore } from '@/stores/ArticleStore';
    import { Log } from '@/stores/LogStore';
    import { toTop } from '@/utils/HtmlUtils';
    import { onActivated, ref } from 'vue';
    import { getSmallTime } from '@/utils/TextUtils';
    import { useUserStore } from '@/stores/UserStore';
    import TagBar from '@/components/bar/TagBar.vue';
    import FavoriteBox from '@/components/box/FavoriteBox.vue';
    import { FavoriteRequset } from '@/request/FavoriteRequset';
    
    const useStore = useUserStore()
    const articleStore = useArticleStore()
    const { articleId } = defineProps<{articleId: string}>()
    const like = ref<boolean>(false)
    const favoriteShow = ref<boolean>(false)
    const favorite = ref<boolean>(false)
    const resourceId = ref<string>()
    const delConfirm = ref<boolean>(false)
    
    var article = ref<Article>()
    var preArticleId: number

    async function getArticle(articleId: string) {
        if(Number.isNaN(articleId)){
            Log.error("文章 id 错啦！！！")
            setTimeout(() => {
                router.back()
            }, 1000)
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
            return
        }

        article.value = response.data
        if(typeof article.value == "object"){
            useArticleStore().lookArticle = article.value
        }
        preArticleId = article.value.articleId
        resourceId.value = "ar_" + article.value.articleId
    }

    async function onLike() {
        if(resourceId.value == undefined || like.value == undefined){
            return
        }

        const response = await FavoriteRequset.like(resourceId.value, !like.value)
        if(response == null || response.code != 200){
            Log.info("喜欢文章失败... qwq")
            return
        }
        Log.info("喜欢文章成功！！！")
        like.value = true
    }

    async function delArticle() {
        
    }

    onActivated(async () => {
        await getArticle(articleId)
        toTop()
    })
</script>

<template>
    <FavoriteBox v-model:show="favoriteShow" v-model:resource-id="resourceId" v-if="article !== undefined && useStore.isLogin()"
        :favorite-items="article.favoriteItems" v-model:favorite-ing="favorite" v-model:like="like"></FavoriteBox>
    <div class="title" v-if="article !== undefined">
        <div class="text">
            <h1>{{ article.articleTitle }}</h1>
            <div class="article-info">
                <i class="iconfont icon-views">&nbsp;<span>{{ article.views }}</span></i>
                <hr>
                <i class="iconfont icon-message-comments">&nbsp;<span>{{ article.comments }}</span></i>
                <hr>
                <i class="iconfont like icon-likes">&nbsp;<span>{{ article.likes }}</span></i>
                <hr>
                <i class="iconfont favorite icon-favorites-fill">&nbsp;<span>{{ article.favorites }}</span></i>
                <hr>
                <i class="iconfont icon-e-date-upload">&nbsp;<span>{{ getSmallTime(article.createTime) }}</span></i>
                <hr>
                <i class="iconfont icon-update">&nbsp;<span>{{ getSmallTime(article.updateTime) }}</span></i>
                <hr>
            </div>
        </div>
        <div class="cover" :style="{backgroundImage: 'url(' + article.cover + '?scale=0.8)'}"></div>
    </div>
    <div class="article-box">
        <div class="data-box">
            <div class="article" v-if="article !== undefined">
                <div class="article-data">
                    <RouterLink class="iconfont bianji icon-bianji" v-if="useStore.isMyOrAdmin(article.articleAuthor.userId)"
                        :to="'/upload/' + article.articleId">&nbsp;<span></span></RouterLink>
                    <a class="iconfont icon-shanchu" @click="delConfirm = true"
                        v-if="useStore.isMyOrAdmin(article.articleAuthor.userId)">&nbsp;<span></span></a>
                    <ConfirmButton :text="'真的要删除文章么...'" v-model:model-value="delConfirm" @confirm="delArticle" />
                </div>
                <MarkDown :text="'${toc}\n' + article.articleContent" :line="false" :show="true"></MarkDown>
            </div>
            <CommentBox v-model:model-value="resourceId"></CommentBox>
        </div>
        <div class="ritem" v-if="article !== undefined">
            <RouterLink :to="'/user/' + article.articleAuthor.userId" class="author-info">
                <img :src="FileRequest.img(article.articleAuthor.head + '?scale=0.3')">
                <div class="author-data">
                    <i class="iconfont icon-nickname_default">&nbsp;<span>{{ article.articleAuthor.userName }}</span></i>
                </div>
            </RouterLink>

            <div class="article-tag">
                <span>文章标签</span>
                <TagBar :tags="article.tagsData" v-bind:model-value="articleStore.checkedTags"></TagBar>
            </div>

            <div class="article-set">
                <button class="iconfont back icon-back" @click="router.back"></button>
                <button :class="'iconfont like ' + (like ? 'icon-likes' :'icon-likes1')" 
                    @click="onLike" v-if="useStore.isLogin()">
                </button>
                <button :class="'iconfont favorite ' + (favorite ? 'icon-favorites-fill' :'icon-favorites')" 
                    @click="favoriteShow = true" v-if="useStore.isLogin()">
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .title {
        width: 100vw;
        height: 35vh;
        overflow-y: hidden;
    }

    .title > .cover {
        width: 100%;
        height: 100%;
        filter: blur(10px);
        background-position: center;
        background-size: cover;
        background-color: var(--div-background-color);
        transition: all 0.5s;
    }

    .title > .text {
        width: 100vw;
        height: 35vh;
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        z-index: 1;
        gap: 1vh;

        text-align: center;
        background-color: var(--cover-page-background-color);
    }

    .text > .article-info {
        display: flex;
        justify-content: center;
        gap: 1vh;
        padding-bottom: 1vh;
        color: var(--font-color-2);
    }

    .text > .article-info span {
        color: var(--font-color);
    }

    .text > h1 {
        color: var(--font-color-2);
    }

    .article-box {
        display: flex;
        padding-top: 5vh;
        margin: 0 auto;
        max-width: 80vw;
        min-height: 100vh;
        height: fit-content;
        gap: 1vw;
    }

    .data-box {
        display: flex;
        flex-direction: column;
        gap: 2vh;
        flex: 1;
    }

    .article {
        padding: 4vh 2vw;
        padding-top: 2vh;
        flex: 1;

        box-shadow: 0.6rem 0.6rem 1.2rem var(--shadow-color-deep);
        background-color: var(--div-background-color);
    }

    .ritem {
        top: 6vh;
        position: sticky;
        display: flex;
        flex-direction: column;
        height: fit-content;
        width: 15vw;
        gap: 2vh;
    }

    .ritem > * {
        box-shadow: 0.4rem 0.4rem 0.6rem var(--shadow-color-deep);
        background-color: var(--div-background-color);
    }

    .article-data {
        display: flex;
        justify-content: flex-end;
        gap: 0.5rem;
    }

    .article-data > * {
        position: relative;
        z-index: 2;

        font-size: 1.2rem;
        color: var(--font-color-2);
    }

    .article-data > * > span {
        font-size: 1rem;
        color: var(--font-color);
        transition: all 0.2s;
    }

    .author-info {
        display: flex;
        padding: 0.8rem;
        gap: 0.5rem;
    }

    .author-info > img {
        width: 3vw;
        border-radius: 10rem;
    }

    .article-tag {
        padding: 0.5rem;
    }

    .article-tag > span {
        padding: 0.5rem;
        
        font-weight: bold;
        font-size: 1.2rem;
        color: var(--font-color-2);
    }

    .article-set {
        display: flex;
        overflow: hidden;
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

    .article :deep(.markdown) {
        
    }

    .article :deep(.markdown > *) {
        
    }

    .article :deep(.markdown > .table-of-contents) {
        width: 17.8vw;
        padding: 1vw;
        overflow-x: hidden;
        text-wrap: nowrap;

        box-shadow: 0.5rem 0.5rem 0.7rem var(--shadow-color-deep);
        background-color: var(--div-background-color);
    }

    .article :deep(.markdown > .table-of-contents::before) {
        content: "目录";

        font-weight: bold;
        font-size: 1.2rem;
        color: var(--font-color-2);
    }

    .comment-area-box {
        margin: 2.5rem 5rem;
        padding: 2rem;

        box-shadow: 0.5rem 0.5rem 0.7rem var(--shadow-color-deep);
        background-color: var(--div-background-color);
    }
</style>