<script lang="ts" setup>
    import type { Tag } from '@/request/ArticleRequest';
    import CheckedTagBar from '../bar/CheckedTagBar.vue';
    import { ref } from 'vue';
    import TagSideBar from '../bar/TagSideBar.vue';

    const tagName = ref<string>()
    const [ checkedTags ] = defineModel<Tag[]>({
        default: [],
    })

    function addTag(){

    }
</script>

<template>
    <div class="tag-input">
        <label class="input-box">
            <CheckedTagBar v-model:model-value="checkedTags"></CheckedTagBar>
            <input type="text" v-model="tagName" @keyup.enter="addTag()">
        </label>
        <TagSideBar v-model:model-value="checkedTags"/>
    </div>
</template>

<style scoped>
    .tag-input {
        display: flex;
        flex-direction: column;
    }

    .input-box {
        display: flex;
    }

    .input-box > input {
        flex: 1;
    }
</style>