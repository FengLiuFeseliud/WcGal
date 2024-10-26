<script lang="ts" setup>
    import TitleInput from '../input/TitleInput.vue';
    import TagInput from '../input/TagInput.vue';
    import CoverBox from './CoverBox.vue';
    import ImgInput from '../input/ImgInput.vue';
    import { ArticleRequest, type Article, type Tag } from '@/request/ArticleRequest';
    import { Log } from '@/stores/LogStore';
    import { ref, watch } from 'vue';

    const [ show ] = defineModel<boolean>("show", {
        required: true
    })
    const [ text ] = defineModel<string>("text")
    const article = defineModel<Article | undefined>("article")
    const title = ref<string>()
    const cover = ref<string>()
    const tags = ref<Tag[]>([])

    function reset(){
        title.value = undefined
        cover.value = undefined
        tags.value = []
        text.value = undefined
        show.value = false
    }

    async function uploadArticle() {
        if(title.value === undefined){
            Log.error("标题不填是留给我填么？")
            return
        }

        if(cover.value === undefined){
            Log.error("封面不填是留给我填么？")
            return
        }

        if(text.value === undefined){
            Log.error("封面不填是留给我填么？")
            return
        }

        Log.info("正在上传文章中...")
        const articleData = await ArticleRequest.upload(article.value == undefined ? 0: article.value.articleId,
            text.value, title.value, cover.value, tags.value, article.value == undefined)
        if(articleData.data != null){
            Log.info(getApiName() + "文章成功！")
            reset()
        }
    }

    function getApiName(): string{
        return article.value === undefined ? "上传": "编辑"
    }

    watch(article, () => {
        if(article.value === undefined){
            reset()
            return
        }

        title.value = article.value.articleTitle
        cover.value = article.value.cover
        tags.value = article.value.tagsData
        text.value = article.value.articleContent
    })
</script>

<template>
    <CoverBox :show="show">
        <div class="box">
            <h2>{{ getApiName() }}文章 ~</h2>
            <TitleInput v-model:model-value="title"></TitleInput>
            <ImgInput v-model:model-value="cover"></ImgInput>
            <TagInput v-model:model-value="tags"></TagInput>
            <div class="tools">
                <a @click="show = false">取消</a>
                <a @click="uploadArticle">{{ getApiName() }}</a>
            </div>
        </div>
    </CoverBox>
</template>

<style scoped>
    .cover {
        position: fixed;
        flex-direction: column;
        justify-content: center;
        
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