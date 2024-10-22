/**
组件 - 下滑加载文章
*/
<script lang="ts" setup>
    import { LazyImg, Waterfall } from 'vue-waterfall-plugin-next'
    import 'vue-waterfall-plugin-next/dist/style.css'
    import { FileRequest } from '@/request/FileRequest';
    import { ArticleRequest } from '@/request/ArticleRequest'
    import { onActivated, onDeactivated, watch} from 'vue';
    import { useArticleStore } from '@/stores/ArticleStore';
    import { Log } from '@/stores/LogStore';
    import { Page } from '@/utils/PageUtils';
    import { getSmallTime } from '@/utils/TextUtils';
    import TagBar from './bar/TagBar.vue';
    import CheckedTagBar from './bar/CheckedTagBar.vue';
    
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
        console.log(page)
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
        <div class="search-data">
            <h2 v-if="useStore.search !== ''">搜索: <span>{{ useStore.search }}</span></h2>
            <div v-if="useStore.checkedTags.length">
                <h2>选中标签:</h2>
                <CheckedTagBar v-model:modelValue="useStore.checkedTags"></CheckedTagBar>
            </div>
            <div class="not-article" v-if="!page.list.value.length">
                <h1>没有搜索到文章...</h1>
                <img src="../assets/not-article.jpg" loading="lazy" />
            </div>
        </div>

        <Waterfall :list="page.list.value" :width="450" :gutter="20" :crossOrigin="false" backgroundColor="null">
            <template #default="{ item }">
                <RouterLink :to="'/article/' + item.articleId" class="card">
                    <LazyImg :url="item.cover + '?scale=0.3'"/>
                    <div class="article-info">
                        <h3 class="article-title">{{ item.articleTitle }}</h3>
                        <TagBar :tags="item.tagsData" @onTag="(tag) => useStore.checkedTags.push(tag)" @click.prevent></TagBar>
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
    </div>
</template>

<style scoped>
    .game-list {
        margin: 5vh auto;
        width: 70vw;
    }

    .not-article {
        text-align: center;
    }
    
    .search-data {
        color: var(--font-color-2);
    }

    .search-data h2 {
        margin-bottom: 0.3rem;
    }

    .search-data h2 > span {
        color: var(--font-color);
    }

    :deep(.waterfall-item) {
        background-color: var(--div-background-color);
        box-shadow: 0.4rem 0.4rem 0.6rem var(--shadow-color-deep);
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

    .article-info :deep(.tag) {
        margin-bottom: 0.4rem;
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