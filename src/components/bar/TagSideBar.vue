<script lang="ts" setup>
    import { ArticleRequest, type Tag } from '@/request/ArticleRequest';
    import TagBar from './TagBar.vue';

    const [ checkedTags ] = defineModel<Tag[]>({
        default: []
    })
    const tags = await ArticleRequest.getAllTags()

</script>

<template>
    <div class="tag-side-bar">
        <TagBar :tags="tags" v-model:model-value="checkedTags"></TagBar>
    </div>
</template>

<style>
    .tag-side-bar {
        background-color: var(--cover-page-background-color);
        border-radius: 10px;
    }

    .tag {
        background-color: var(--div-background-color);
        color: var(--font-color);
    }
</style>