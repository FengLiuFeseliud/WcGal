<script lang="ts" setup>
    import type { Tag } from '@/request/ArticleRequest';

    var { tags } = defineProps<{tags: Tag[]}>()
    const emits = defineEmits(['onTag'])

    const [ checkedTags ] = defineModel<Tag[]>({
        default: []
    })

    function onTag(tag: Tag){
        emits("onTag", tag)
        
        var flag = false
        checkedTags.value.forEach(checkedTag => {
            if(checkedTag.tagId == tag.tagId){
                flag = true
            }
        })

        if(!flag){
            checkedTags.value.push(tag)
        }
    }
</script>
    
<template>
    <div class="tag-bar" >
        <a class="tag" v-for="tag in tags" :key="tag.tagId" @click="onTag(tag)">
            {{ tag.tagName }}<span>{{ tag.tagCount }}</span>
            <slot name="tag"></slot>
        </a>
        <slot name="end"></slot>
    </div>
</template>

<style scoped>
    .tag-bar {
        padding: 0.5rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    .tag {
        padding: 2px 8px;
        display: inline-block;
        margin-right: 6px;
        margin-bottom: 0.4rem;

        font-size: 80%;
        box-shadow: 0.5px 0.5px 1px 1px var(--shadow-color);
        border-radius: 3px;
        color: var(--font-color);
        transition: all 0.25s;
    }

    .tag > span {
        font-size: 60%;
        color: var(--link-hover-font-color);
    }
    
    .tag:hover {
        color: var(--link-hover-font-color);
    }

</style>