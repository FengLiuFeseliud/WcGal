<script lang="ts" setup>
    import TitleInput from '../input/TitleInput.vue';
    import TagInput from '../input/TagInput.vue';
    import CoverBox from './CoverBox.vue';
    import ImgInput from '../input/ImgInput.vue';
    import { ref } from 'vue';
    import { ArticleRequest, type Tag } from '@/request/ArticleRequest';
    import { Log } from '@/stores/LogStore';

    const [ show ] = defineModel<boolean>("show", {
        required: true
    })
    const [ text ] = defineModel<string>("text")

    const title = ref<string>()
    const imgUrl = ref<string>()
    const checkedTags = ref<Tag[]>([])

    async function uploadArticle() {
        if(title.value === undefined){
            Log.error("标题不填是留给我填么？")
            return
        }

        if(imgUrl.value === undefined){
            Log.error("封面不填是留给我填么？")
            return
        }

        if(text.value === undefined){
            Log.error("封面不填是留给我填么？")
            return
        }

        const article = await ArticleRequest.upload(text.value, title.value, imgUrl.value, checkedTags.value)
        if(article.data != null){
            Log.info("上传文章成功！")
        }
    }
</script>

<template>
    <CoverBox :show="show">
        <div class="box">
            <h2>上传文章 ~</h2>
            <TitleInput v-model:model-value="title"></TitleInput>
            <ImgInput v-model:model-value="imgUrl"></ImgInput>
            <TagInput v-model:model-value="checkedTags"></TagInput>
            <div class="tools">
                <a @click="show = false">取消</a>
                <a @click="uploadArticle">上传</a>
            </div>
        </div>
    </CoverBox>
</template>

<style scoped>
    .cover {
        display: flex;
        position: fixed;
        width: 100vw;
        height: 100vh;
        flex-direction: column;
        justify-content: center;
        z-index: 1;
        
        background-color: var(--cover-page-background-color-deep);
    }

    .box {
        display: flex;
        flex-direction: column;
        width: 23vw;
        height: fit-content;
        margin: 0 auto;
        padding: 1rem 1.5rem;
        gap: 0.5rem;
        
        border-radius: 1rem;
        background-color: var(--cover-page-background-color);
    }

    h2 {
        color: var(--font-color);
    }

    .tools {
        height: 2rem;
        display: flex;
        justify-content: space-evenly;
        
        text-align: center;
    }

    .tools > * {
        width: 40%;

        line-height: 2rem;
        color: var(--deep-button-font-color);
        background-color: var(--cover-page-background-color-deep);
    }
</style>