<script lang="ts" setup>
    import { type Tag } from '@/request/ArticleRequest';
    import TagBar from './TagBar.vue';

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
    <TagBar :tags="checkedTags" @onTag="uncheckTag">
        <i class="iconfont icon-x"></i>
    </TagBar>
</template>

<style scoped>
    .tag-bar {
        border-radius: 10px;
        background-color: var(--cover-page-background-color);
    }
</style>