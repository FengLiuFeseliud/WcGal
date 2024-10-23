/**
组件 - 下滑加载文章
*/
<script lang="ts" setup>
    import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
    import 'vue-waterfall-plugin-next/dist/style.css'
    import { FileRequest } from '@/request/FileRequest';
    import { type Article } from '@/request/ArticleRequest'
    import { onActivated, onDeactivated} from 'vue';
    import { useArticleStore } from '@/stores/ArticleStore';
    import { Page } from '@/utils/PageUtils';
    import { getSmallTime } from '@/utils/TextUtils';
    import TagBar from '../bar/TagBar.vue';
    
    const useStore = useArticleStore()
    const page = defineModel<Page<Article>>({
        required: true
    })

    onActivated(page.value.startScroll.bind(page.value))
    onDeactivated(page.value.endScroll.bind(page.value))
</script>

<template>
    <Waterfall :list="page.list.value" :width="450" :gutter="20" :crossOrigin="false" backgroundColor="null" @afterRender="page.loading.value = false" >
        <template #default="{ item }">
            <RouterLink :to="'/article/' + item.articleId" class="card">
                <LazyImg :url="item.cover + '?scale=0.3'"/>
                <div class="article-info">
                    <h3 class="article-title">{{ item.articleTitle }}</h3>
                    <TagBar :tags="item.tagsData" v-bind:model-value="useStore.checkedTags" @click.prevent></TagBar>
                    <RouterLink :to="'/user/' + item.articleAuthor.userId" class="author-info">
                        <img loading="lazy" :src="FileRequest.img(item.articleAuthor.head + '?scale=0.3')">
                        <i class="iconfont icon-nickname_default">&nbsp;{{ item.articleAuthor.userName }}</i>
                    </RouterLink>
                    <div class="article-data">
                        <i class="iconfont icon-views">&nbsp;<span>{{ item.views }}</span></i>
                        <hr>
                        <i class="iconfont icon-message-comments">&nbsp;<span>{{ item.comments }}</span></i>
                        <hr>
                        <i class="iconfont like icon-likes">&nbsp;<span>{{ item.likes }}</span></i>
                        <hr>
                        <i class="iconfont favorite icon-favorites-fill">&nbsp;<span>{{ item.favorites }}</span></i>
                        <hr>
                        <i class="iconfont icon-e-date-upload">&nbsp;<span>{{ getSmallTime(item.createTime) }}</span></i>
                        <hr>
                        <i class="iconfont icon-update" v-if="item.updateTime !== item.createTime"
                            >&nbsp;<span>{{ getSmallTime(item.updateTime) }}</span></i>
                    </div>
                </div>
            </RouterLink>
        </template>
    </Waterfall>
    <div class="loading" v-if="page.loading.value"><h3>加载更多中...</h3></div>
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

    .loading {
        text-align: center;
        color: var(--font-color-2);
    }
</style>