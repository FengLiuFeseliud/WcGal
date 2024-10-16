<script lang="ts" setup>
    import MarkDownEditor from '@/components/tool/MarkDownEditor.vue';
    import MarkDown from '@/components/tool/MarkDown.vue';
    import ArticleUploadBox from '@/components/box/ArticleUploadBox.vue';
    import { onActivated, ref } from 'vue';
    import type { Article } from '@/request/ArticleRequest';
    import { useArticleStore } from '@/stores/ArticleStore';

    const { articleId } = defineProps<{articleId: string}>()
    const article = ref<Article | undefined>(undefined)
    const text = ref<string>("")
    const showUpload = ref<boolean>(false)

    onActivated(() => {
        const useStore = useArticleStore()
        if(Number(articleId) == useStore.lookArticle?.articleId){
            article.value = useStore.lookArticle
        } else {
            article.value = undefined
        }
    })
</script>

<template>
    <ArticleUploadBox v-model:article="article" v-model:text="text" v-model:show="showUpload"></ArticleUploadBox>
    <div class="upload-box">
        <div class="markdown-box">
            <MarkDown :text="'test'" :line="false" :show="true"></MarkDown>
        </div>
        <MarkDownEditor v-model:text="text" v-model:showUpload="showUpload"></MarkDownEditor>
    </div>
</template>

<style scoped>
    .upload-box {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 0 auto;
        padding-top: 10vh;
        width: 90vw;
        height: fit-content;
    }

    .markdown-box {
        border-radius: 1rem;
        background-color: var(--div-background-color);
    }

    .markdown-editor {
        min-height: fit-content;
        height: 100vh;
    }
</style>