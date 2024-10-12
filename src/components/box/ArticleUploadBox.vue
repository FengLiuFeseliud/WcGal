<script lang="ts" setup>
    import TitleInput from '../input/TitleInput.vue';
    import TagInput from '../input/TagInput.vue';
    import { ref } from 'vue';
    import type { Tag } from '@/request/ArticleRequest';

    const { show } = defineProps<{show: boolean}>()
    const checkedTags = ref<Tag[]>()
</script>

<template>
    <div class="article-upload-box" v-show="show">
        <div class="box">
            <TitleInput></TitleInput>
            <TagInput v-model:model-value="checkedTags"></TagInput>
        </div>
    </div>
</template>

<style scoped>
    .article-upload-box {
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
        width: 30vw;
        height: fit-content;
        margin: 0 auto;

        background-color: var(--cover-page-background-color);
    }
</style>