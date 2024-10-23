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
    
    const useStore = useUserStore()
    const articleStore = useArticleStore()
    const { articleId } = defineProps<{articleId: string}>()
    const like = ref<boolean>(false)
    const likeEd = ref<boolean>(false)
    const favorite = ref<boolean>(false)
    const favoriteEd = ref<boolean>(false)
    const resourceId = ref<string>()
    const delConfirm = ref<boolean>(false)
    
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
        like.value = !like.value
        likeEd.value = like.value ? true: false
    }

    async function onFavorite() {
        favorite.value = !favorite.value
        favoriteEd.value = favorite.value ? true: false
    }

    async function delArticle() {
        
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
                <RouterLink class="iconfont bianji icon-bianji" v-if="useStore.isMyOrAdmin(article.articleAuthor.userId)"
                    :to="'/upload/' + article.articleId">&nbsp;<span>编辑</span></RouterLink>
                <hr v-if="useStore.isMyOrAdmin(article.articleAuthor.userId)">
                <a class="iconfont icon-shanchu" @click="delConfirm = true"
                    v-if="useStore.isMyOrAdmin(article.articleAuthor.userId)">&nbsp;<span>删除</span></a>
                <ConfirmButton :text="'真的要删除文章么...'" v-model:model-value="delConfirm" @confirm="delArticle" />
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

            <div class="article-tag">
                <span>文章标签</span>
                <TagBar :tags="article.tagsData" v-bind:model-value="articleStore.checkedTags"></TagBar>
            </div>

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
        <CommentBox v-model:model-value="resourceId"></CommentBox>
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
        box-shadow: 0.6rem 0.6rem 1.2rem var(--shadow-color-deep);
        background-color: var(--div-background-color);
    }

    .article > h1 {
        color: var(--font-color);
        margin-bottom: 1rem;
    }

    .article-data > .confirm {
        margin-left: 27%;
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

    .ritem > * {
        border-radius: 1rem;
        box-shadow: 0.4rem 0.4rem 0.6rem var(--shadow-color-deep);
        background-color: var(--div-background-color);
    }

    .article-data {
        display: flex;
        flex-wrap: wrap;
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

    .article-data > * > span:hover {
        color: var(--link-hover-font-color);
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

    .article :deep(.markdown > .table-of-contents) {
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

    .article :deep(.markdown > .table-of-contents::before) {
        content: "目录";

        font-weight: bold;
        font-size: 1.2rem;
        color: var(--font-color-2);
    }

    .comment-area-box {
        margin: 2.5rem 5rem;
        padding: 2rem;

        border-radius: 1rem;
        background-color: var(--cover-page-background-color);
    }
</style>