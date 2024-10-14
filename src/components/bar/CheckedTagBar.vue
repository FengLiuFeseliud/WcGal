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
    <div class="checked-tag-bar">
        <TagBar :tags="checkedTags" @onTag="uncheckTag">
            <template #tag>
                <i class="iconfont icon-x" />
            </template>
            
            <template #end>
                <slot></slot>
            </template>
        </TagBar>
    </div>
</template>

<style scoped>
    .tag-bar {
        border-radius: 10px;
        background-color: var(--cover-page-background-color);
    }
</style>