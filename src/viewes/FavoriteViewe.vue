<script lang="ts" setup>
    import { FavoriteRequset, type Favorite } from '@/request/FavoriteRequset';
    import { getSmallTime } from '@/utils/TextUtils';
    import { router } from '@/router';
    import { Log } from '@/stores/LogStore';
    import { Page } from '@/utils/PageUtils';
    import { onActivated, onDeactivated, ref } from 'vue';
    import { FileRequest } from '@/request/FileRequest';
    import { Waterfall } from 'vue-waterfall-plugin-next';
    import ArticleCard from '@/components/card/ArticleCard.vue';

    const { favoriteId } = defineProps<{favoriteId: string}>()
    const favorite = ref<Favorite>()
    const page = new Page(10, async (page, limit) => {
        if(favorite.value == undefined){
            return null
        }
        return await FavoriteRequset.getFavoriteItems(favorite.value.favoriteId, page, limit, false)
    })
    var preFavoriteId: number

    async function getFavorite(favoriteId: string) {
        if(Number.isNaN(favoriteId)){
            Log.error("收藏夹 id 错啦！！！")
            return
        }

        let id = Number(favoriteId)
        if(preFavoriteId == id){
            return
        }

        Log.info("获取收藏夹中...")
        const response = await FavoriteRequset.getFavorite(id)
        if(response == null || response.data == null){
            Log.info("获取收藏夹失败... qwq")
            setTimeout(() => {
                router.back()
            }, 1000)
            return
        }

        favorite.value = response.data
        preFavoriteId = favorite.value.favoriteId
    }

    onActivated(async () => {
        await getFavorite(favoriteId)
        page.startScroll.bind(page)()
    })
    onDeactivated(page.endScroll.bind(page))
</script>

<template>
    <div class="favorite-box" v-if="favorite !== undefined">
        <div class="favorite-info">
            <img :src="FileRequest.img(favorite.cover + '?scale=0.3')">
            <div class="favorite-data">
                <h1>{{ favorite.favoriteName }}</h1>
                <span>收藏数: {{ favorite.size }}</span><br />
                <span v-if="favorite.favoriteDescribe !== null">{{ favorite.favoriteDescribe }}<br /></span>
                <span>{{ getSmallTime(favorite.createTime) }}</span>
            </div>
        </div>
        <Waterfall :list="page.list.value" @afterRender="page.loading.value = false" :width="350" :gutter="20" :crossOrigin="false" backgroundColor="null">
            <template #default="{ item }">
                <ArticleCard :article="item.article"></ArticleCard>
            </template>
        </Waterfall>
    </div>
</template>

<style scoped>
    .favorite-box {
        display: flex;
        flex-direction: column;
        width: 60vw;
        min-height: 80vh;
        height: fit-content;
        margin: 0 auto;
        padding: 10vh 0;
        gap: 5vh;
    }

    .favorite-info {
        display: flex;
        padding: 1vw;
        color: var(--font-color);
        box-shadow: 0.4rem 0.4rem 0.6rem var(--shadow-color-deep);
        background-color: var(--div-background-color);
        gap: 2vw;
    }

    .favorite-info > img {
        width: 15vw;
    }
    

    :deep(.article-data > i) {
        font-size: 1rem;
    }

    h1 {
        color: var(--font-color-2);
    }
</style>