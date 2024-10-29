<script lang="ts" setup>
    import ArticleListBox from '@/components/box/ArticleListBox.vue';
    import { ArticleRequest, type Article } from '@/request/ArticleRequest';
    import { FileRequest } from '@/request/FileRequest';
    import { UserRequest, type User } from '@/request/UserRequest';
    import { router } from '@/router';
    import { Log } from '@/stores/LogStore';
    import { Page } from '@/utils/PageUtils';
    import { getSmallTime } from '@/utils/TextUtils';
    import { onActivated, ref, type VNodeRef } from 'vue';
    import { Waterfall, LazyImg } from 'vue-waterfall-plugin-next';

    const { userId } = defineProps<{userId: string}>()
    const showAllFavorite = ref<boolean>(false)
    const showAllArticle = ref<boolean>(false)
    const waterfall = ref<VNodeRef>()
    var page: Page<Article>
    var user = ref<User>()
    var preUserId: number

    async function getUser(userId: string) {
        if(Number.isNaN(userId)){
            Log.error("用户 id 错啦！！！")
            return
        }

        let id = Number(userId)
        if(preUserId == id){
            return
        }

        Log.info("获取用户中...")
        const response = await UserRequest.get(id)
        if(response == null || response.data == null){
            Log.info("获取用户失败... qwq")
            setTimeout(() => {
                router.back()
            }, 1000)
            return
        }

        user.value = response.data
        showAllFavorite.value = user.value.favorites.length <= 6
        preUserId = user.value.userId
        page = new Page(9, async (page, limit) => {
            return ArticleRequest.getArticles(page, limit, true, "@" + user.value?.userName)
        })
        await page.resetList()
    }

    onActivated(async () => {
        await getUser(userId)
    })
</script>

<template>
    <div class="user-box">
        <div class="user-info" v-if="user !== undefined">
            <img :src="FileRequest.img(user.head + '?scale=0.5')">
            <div class="user-data">
                <h1>{{ user.userName }}</h1>
                <span>{{ user.email }}</span>
                <span>{{ getSmallTime(user.createTime) }}</span>
            </div>
        </div>

        <div class="user-data-list" v-if="user !== undefined">
            <div class="user-data-list-title">
                <h2>{{ user.userName }} 的收藏夹</h2>
                <button v-if="user.favorites.length > 6"  @click="showAllFavorite = !showAllFavorite">展开显示 <span>{{ user.favorites.length }} 个收藏夹</span>
                    &nbsp;<i :class="'iconfont ' + (showAllFavorite ? 'icon-up': 'icon-down')"></i></button>
            </div>
            <Waterfall :list="showAllFavorite ? user.favorites: user.favorites.slice(0, 6)" :width="350" :gutter="20" 
                :crossOrigin="false" backgroundColor="null" :class="'card-list' + (showAllFavorite ? '-all': '')">
                <template #default="{ item }">
                    <RouterLink :to="'/favorite/' + item.favoriteId" class="card">
                        <LazyImg :url="FileRequest.img(item.cover + '?scale=0.3')"/>
                        <div class="favorite-info">
                            <h3>{{ item.favoriteName }}</h3>
                            <span class="iconfont icon-e-date-upload">&nbsp;{{ getSmallTime(item.createTime) }}</span>&nbsp;
                            <span>收藏数：{{ item.size }}</span>
                        </div>
                    </RouterLink>
                </template>
            </Waterfall>
        </div>

        <div class="user-data-list" v-if="user !== undefined">
            <div class="user-data-list-title">
                <h2>{{ user.userName }} 的文章</h2>
                <button @click="showAllArticle = !showAllArticle" v-if="page !== undefined">展开显示 <span>{{ page.count.value }} 个文章</span>
                    &nbsp;<i :class="'iconfont ' + (showAllArticle ? 'icon-up': 'icon-down')"></i></button>
            </div>
            <div :class="'card-list' + (showAllArticle ? '-all': '')">
                <ArticleListBox :showUser="false" :width="350" v-model:page="page" v-model:showAll="showAllArticle" v-model:waterfall="waterfall"></ArticleListBox>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .user-box {
        display: flex;
        flex-direction: column;
        width: 60vw;
        margin: 0 auto;
        padding: 10vh 0;
        gap: 5vh;
    }

    .user-info {
        display: flex;
        padding: 1vw;
        gap: 2vw;

        color: var(--font-color);
        box-shadow: 0.4rem 0.4rem 0.6rem var(--shadow-color-deep);
        background-color: var(--div-background-color);
    }

    .user-info > img {
        width: 7vw;
        border-radius: 50%;
    }

    .user-data {
        display: flex;
        flex-direction: column;
    }

    .user-data-list-title {
        position: relative;
        display: flex;
        padding: 1vw;
        z-index: 2;

        color: var(--font-color);
        box-shadow: 0.4rem 0.4rem 0.6rem var(--shadow-color-deep);
        background-color: var(--div-background-color);
    }

    .user-data-list-title > h2 {
        flex: 1;
    }

    .user-data-list-title > button {
        padding: 0.5rem;

        font-size: 1.005rem;
        color: var(--font-color);
        background-color: var(--div-background-color);
        transition: all 0.2s;
    }

    .user-data-list-title > button:hover {
        color: var(--link-hover-font-color);
    }

    .user-data-list {
        display: flex;
        flex-direction: column;
    }

    .card-list {
        max-height: 90vh;
        overflow-y: hidden;

        mask: linear-gradient(#000 60%, transparent);
    }

    h1 {
        color: var(--font-color-2);
    }

    h2 {
        color: var(--font-color-2);
    }

    h3 {
        color: var(--font-color-2);
    }

    :deep(.waterfall-item) {
        background-color: var(--div-background-color);
        box-shadow: 0.4rem 0.4rem 0.6rem var(--shadow-color-deep);
        z-index: 2;
    }

    .favorite-info {
        padding: 0.5vw;
        color: var(--font-color);
    }

    :deep(.article-data > i) {
        font-size: 1rem;
    }

</style>