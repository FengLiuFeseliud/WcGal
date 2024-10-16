<script lang="ts" setup>
    import type { Tag } from '@/request/ArticleRequest';
    import { TagData } from '@/request/ArticleRequest';
    import CheckedTagBar from '../bar/CheckedTagBar.vue';
    import { ref } from 'vue';
    import TagSideBar from '../bar/TagSideBar.vue';
    import { Log } from '@/stores/LogStore';

    const tagName = ref<string>()
    const [ checkedTags ] = defineModel<Tag[]>({
        default: [],
        required: true
    })

    function inputTag(){
        if(tagName.value === undefined){
            return
        }

        for(let index in checkedTags.value){
            if(checkedTags.value[index].tagName !== tagName.value){
                continue
            }

            Log.error("标签 " + tagName.value + " 重复啦！")
            return
        }

        checkedTags.value.push(new TagData(tagName.value))
        tagName.value = undefined
    }

    function delTag(){
        checkedTags.value.pop()
    }
</script>

<template>
    <div class="tag-input">
        <label class="input-box">
            <CheckedTagBar v-model:model-value="checkedTags">
                <input type="text" v-model="tagName" placeholder="输入标签名回车添加标签"
                    @keyup.enter="inputTag"
                    @keyup.backspace="delTag">
            </CheckedTagBar>
        </label>
        <TagSideBar v-model:model-value="checkedTags"/>
    </div>
</template>

<style scoped>
    .tag-input {
        display: flex;
        flex-direction: column;
    }

    .tag-input >>> * {
        background-color: var(--div-background-color);
    }

    .input-box {
        border: 0.1rem solid var(--font-color);
    }

    .input-box input {
        min-width: 6%;
        margin: 0.2rem;
        flex: 1;

        font-size: 1rem;
        padding: 0 0.3rem;
    }

    .tag-input >>> .tag {
        margin: 0.2rem;
    }
</style>