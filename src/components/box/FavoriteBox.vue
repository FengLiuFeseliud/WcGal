<script lang="ts" setup>
    import { FavoriteRequset, type Favorite, type FavoriteItem } from '@/request/FavoriteRequset';
    import CoverBox from './CoverBox.vue';
    import { onMounted, ref } from 'vue';
    import { FileRequest } from '@/request/FileRequest';
    import { Log } from '@/stores/LogStore';

    const show = defineModel<boolean>("show", {
        default: false
    })
    
    const favoriteIng = defineModel<boolean>("favoriteIng")
    const like = defineModel<boolean>("like")
    const resourceId = defineModel<string>("resourceId")
    const { favoriteItems } = defineProps<{favoriteItems: FavoriteItem[]}>()
    const favorites = ref<Favorite[]>()
    const checkedFavorites = ref<number[]>([])
    const showCreate = ref<boolean>(false)
    const createFavoriteName = ref<string>()
    const createFavoritePublic = ref<boolean>(true)

    async function init(){
        const data = await FavoriteRequset.getMyFavorites()
        if(data == null){
            return
        }

        let flag = false
        favorites.value = data.data
        favoriteItems.forEach(favoriteItem => {
            data.data.forEach(favorite => {
                if(favorite.favoriteId == favoriteItem.favoriteId && favorite.inLike){
                    like.value = true
                    flag = true
                }
            })
            checkedFavorites.value.push(favoriteItem.favoriteId)
        })

        if(!flag){
            like.value = false
        }

        if(favoriteItems.length >= 2 || (favoriteItems.length == 1 && !flag)){
            favoriteIng.value = true
        }
    }

    async function favoriteSetResource() {
        if(resourceId.value == undefined){
            return
        }

        const delFavoriteIds: number[] = []
        const addFavoriteIds: number[] = []
        favoriteItems.forEach(favoriteItem => {
            if(checkedFavorites.value.indexOf(favoriteItem.favoriteId) == -1){
                delFavoriteIds.push(favoriteItem.favoriteId)
            } 
        })

        checkedFavorites.value.forEach(favoriteId => {
            let flag = true
            favoriteItems.forEach(favoriteItem => {
                if(favoriteItem.favoriteId == favoriteId){
                    flag = false
                }
            })

            if(flag){
                addFavoriteIds.push(favoriteId)
            }
        })

        if(addFavoriteIds.length){
            const data = await FavoriteRequset.addFavoriteItem(addFavoriteIds, resourceId.value)
            if(data == null || data.code !== 200){
                Log.error("收藏失败...")
            } else {
                Log.info("收藏成功！！！")
                favoriteIng.value = true
            }
        }

        if(delFavoriteIds.length){
            const data = await FavoriteRequset.delFavoriteItem(delFavoriteIds, resourceId.value)
            if(data == null || data.code !== 200){
                Log.error("取消收藏失败...")
            } else {
                Log.info("取消收藏成功！！！")
                if(delFavoriteIds.length == favoriteItems.length && !addFavoriteIds.length){
                    favoriteIng.value = false
                }
            }
        }
    }

    async function createFavorite(){
        if(createFavoriteName.value == undefined || createFavoriteName.value == ""){
            Log.error("收藏夹名称不填是留给我填么？")
            return
        }
        const data = await FavoriteRequset.createFavorite(createFavoriteName.value, createFavoritePublic.value)
        if(data == null || data.code !== 200){
            Log.error("收藏夹创建失败...")
            return
        }
        Log.info("收藏夹创建成功！！！")
        favorites.value?.push(data.data)
    }

    onMounted(async () => {
        await init()
    })
</script>

<template>
    <CoverBox :show="show">
        <div class="box">
            <h2>收藏至收藏夹</h2>
            <div class="favorite-set">
                <button class="iconfont icon-folder-create" @click="showCreate = !showCreate"></button>
            </div>
            <div class="favorite-list">
                <div class="favorite-create" v-if="showCreate">
                    <label class="iconfont icon-folder-create"></label>
                    <input type="text" placeholder="收藏夹名称" v-model="createFavoriteName" @keyup.enter="createFavorite" />
                    <select v-model="createFavoritePublic">
                        <option value="true">公开</option>
                        <option value="false">私密</option>
                    </select>
                    <button @click="createFavorite">创建</button>
                </div>
                <div class="favorite" v-for="(favorite, index) in favorites" :key="index">
                    <input class="iconfont" type="checkbox" :value="favorite.favoriteId" v-model="checkedFavorites">
                    <img loading="lazy" :src="FileRequest.img(favorite.cover + '?scale=0.5')">
                    <div class="favorite-info">
                        <i class="iconfont icon-password_line" v-if="!favorite.favoritePublic">&nbsp;</i>
                        <span class="favorite-name">{{ favorite.favoriteName }}</span>
                        <br />
                        <span>收藏数: {{ favorite.size }}</span>
                    </div>
                </div>
            </div>
            <div class="tools">
                <a @click="show = false">取消</a>
                <a @click="favoriteSetResource">收藏</a>
            </div>
        </div>
    </CoverBox>
</template>

<style scoped>
    .cover {
        position: fixed;
        background-color: var(--cover-page-background-color);
    }

    .box {
        width: 20vw;
        height: 50vh;
        display: flex;
        flex-direction: column;
        margin: 30vh auto;
        align-items: center;
        padding: 1rem 1.5rem;
        gap: 1rem;
        
        box-shadow: 0.4rem 0.4rem 0.6rem var(--shadow-color);
        background-color: var(--div-background-color);
    }

    .box > h2 {
        color: var(--font-color-2);
    }

    .favorite-set {
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }

    .favorite-set > button {
        padding: 0.3rem;

        font-size: 1.2rem;
        color: var(--font-color);
        background-color: var(--div-background-color);
        transition: all 0.2s;
    }

    .favorite-set > button:hover {
        color: var(--link-hover-font-color);
    }

    .favorite-list {
        display: flex;
        flex-direction: column;
        width: 100%;
        
        overflow-y: scroll;
        background-color: var(--div-background-color);
    }

    .favorite-create {
        display: flex;
        margin-left: 0.8rem;
        justify-content: center;
        align-items: stretch;

        color: var(--font-color);
    }

    .favorite-create:hover {
        border: 0.2rem solid var(--font-color);
    }

    .favorite-create > label {
        padding: 0.2rem;
        font-size: 1.4rem;
    }

    .favorite-create > button {
        font-size: 0.8rem;
        padding: 0 1rem;

        color: var(--font-color);
        background-color: var(---button-font-color);
    }

    .favorite-create > button:hover {
        color: var(--link-hover-font-color);
    }

    .favorite-create > input {
        flex: 1;
        padding: 0.2rem;
        font-size: 0.8rem;
        color: var(--input-focus-font-color);
        background-color: var(-input-color);
    }

    .favorite-create > select {
        color: var(--font-color);
    }

    .favorite {
        display: flex;
        align-items: center;
        padding: 0.5rem 0;
        padding-left: 1rem;
        gap: 1rem;
        flex: 1;

        border-bottom: 0.1rem solid var(--font-color);
    }

    .favorite > img {
        width: 5vw;
    }

    .favorite-info {
        font-size: 0.8rem;
        color: var(--font-color);
    }

    .favorite-info > .favorite-name {
        font-size: 1.2rem;
        color: var(--font-color-2);
    }

    .tools {
        width: 100%;
        display: flex;
        gap: 1.5rem;
        text-align: center;
    }

    .tools > a {
        padding: 0.5rem;
        flex: 1;

        background-color: var(--cover-page-background-color-deep);
    }

    input[type="checkbox"] {
        font-size: 1.4rem;
        appearance: none;
        color: var(--font-color);
        transition: all 0.2s;
    }

    input[type="checkbox"]:hover {
        color: var(--link-hover-font-color);
    }

    input[type="checkbox"]::before {
        content: "\e63e";
    }

    input[type="checkbox"]:checked::before {
        content: "\e63d";
    }
</style>