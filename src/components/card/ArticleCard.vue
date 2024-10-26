<script lang="ts" setup>
    import { LazyImg } from 'vue-waterfall-plugin-next'
    import type { Article } from '@/request/ArticleRequest';
    import { getSmallTime } from '@/utils/TextUtils';
    import { FileRequest } from '@/request/FileRequest';
    import { useArticleStore } from '@/stores/ArticleStore';

    const useStore = useArticleStore()
    const { article, showUser = true } = defineProps<{article: Article, showUser?: boolean}>()
</script>

<template>
    <RouterLink :to="'/article/' + article.articleId" class="card">
        <LazyImg :url="article.cover + '?scale=0.3'"/>
        <div class="article-info">
            <h3 class="article-title">{{ article.articleTitle }}</h3>
            <TagBar :tags="article.tagsData" v-bind:model-value="useStore.checkedTags" @click.prevent></TagBar>
            <RouterLink v-if="showUser" :to="'/user/' + article.articleAuthor.userId" class="author-info">
                <img loading="lazy" :src="FileRequest.img(article.articleAuthor.head + '?scale=0.3')">
                <i class="iconfont icon-nickname_default">&nbsp;{{ article.articleAuthor.userName }}</i>
            </RouterLink>
            <div class="article-data">
                <i class="iconfont icon-views">&nbsp;<span>{{ article.views }}</span></i>
                <hr>
                <i class="iconfont icon-message-comments">&nbsp;<span>{{ article.comments }}</span></i>
                <hr>
                <i class="iconfont like icon-likes">&nbsp;<span>{{ article.likes }}</span></i>
                <hr>
                <i class="iconfont favorite icon-favorites-fill">&nbsp;<span>{{ article.favorites }}</span></i>
            </div>
            <div class="article-data">
                <i class="iconfont icon-e-date-upload">&nbsp;<span>{{ getSmallTime(article.createTime) }}</span></i>
                <hr>
                <i class="iconfont icon-update" v-if="article.updateTime !== article.createTime"
                    >&nbsp;<span>{{ getSmallTime(article.updateTime) }}</span></i>
            </div>
        </div>
    </RouterLink>
</template>

<style scoped>
    :deep(.waterfall-item) {
        background-color: var(--div-background-color);
        box-shadow: 0.4rem 0.4rem 0.6rem var(--shadow-color-deep);
        z-index: 2;
    }

    .article-info {
        display: flex;
        flex-direction: column;
        padding: 0.8rem;

        background-color: var(--div-background-color);
    }

    .article-info > h3 {
        color: var(--font-color-2);
        transition: all 0.2s;
    }

    .article-info > h3:hover {
        color: var(--link-hover-font-color);
    }

    .article-data {
        display: flex;
        gap: 0.4rem;
    }

    .article-data {
        color: var(--font-color-2);
    }

    .article-data span {
        color: var(--font-color);
    }

    .article-data > hr {
        color: var(--font-color);
    }

    .author-info > img {
        width: 3rem;
        border-radius: 50%;
    }

    .author-info {
        width: fit-content;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.6rem;
    }

    .author-info i {
        text-align: center;
    }

    .article-info a {
        color: var(--font-color);
        transition: all 0.2s;
    }

    .article-info a:hover {
        color: var(--link-hover-font-color);
    }

    .like {
        color: rgb(253, 90, 90);
    }

    .favorite {
        color: orange;
    }
</style>