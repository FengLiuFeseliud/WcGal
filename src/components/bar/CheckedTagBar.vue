<script lang="ts" setup>
    import { type Tag } from '@/request/ArticleRequest';
    import TagBar from './TagBar.vue';

    const { tags } = defineProps<{tags: Tag[]}>()
    const [ checkedTags ] = defineModel<Tag[]>({
        default: [],
    })

    function uncheckTag(tag: Tag){
        if(checkedTags.value.indexOf(tag) == -1){
            return
        }
        checkedTags.value.splice(checkedTags.value.indexOf(tag), 1)
    }
</script>

<template>
    <TagBar :tags="tags" @onTag="uncheckTag">
        <slot><i class="iconfont icon-x"></i></slot>
    </TagBar>
</template>

<style scoped>
    .tag-bar {
        margin: auto;
        margin-bottom: 0.8%;
        padding: 0.5%;
        padding-top: 0;
        width: 24%;

        border-radius: 10px;
        background-color: var(--cover-page-background-color);
    }
</style>