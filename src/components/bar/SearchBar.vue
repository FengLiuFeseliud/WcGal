<script lang="ts" setup>
    import { showPlaceholderList } from '@/utils/TextUtils';
    import { ref, watch } from 'vue';

    const [ desc ] = defineModel<boolean>()
    const keyword = ref<string>("")
    const emits = defineEmits<{keyword: [keyword: string]}>()

    watch(keyword, () => {
        if(keyword.value == ""){
            emits('keyword', keyword.value)
        }
    })

    const placeholder = ref<string>("")
    showPlaceholderList(placeholder, [
        "从本站搜索所有文章！",
        "#[标签名] 也可以搜索标签！前面加空格！", 
        "@[用户名] 可以搜索用户文章！前面加空格！"
    ], 200, 10)
</script>

<template>
    <div class="search-bar">
        <label class="iconfont icon-sousuo"></label>
        <input type="text" v-model="keyword" :placeholder="placeholder" @keyup.enter="emits('keyword', keyword)">
        <button @click="emits('keyword', keyword)">
            <i class="iconfont icon-a-Searchbar_unselected"></i>
        </button>
        <button @click="desc = !desc">
            <i :class="desc ? 'iconfont icon-paixujiangxu': 'iconfont icon-paixushengxu'"></i>
        </button>
    </div>
</template>

<style scoped>
    .search-bar {
        position: relative;
        display: flex;
        width: fit-content;
        
        z-index: 2;
    }

    .search-bar > * {
        border: none;
    }

    .search-bar > label {
        color: rgb(111, 111, 111);
        background-color: var(--input-color);
    }

    .search-bar i {
        text-align: center;
        transition: all 0.25s;
    }

    .search-bar > input {
        flex: 1;

        color: var(--font-color);
        outline: none;
        background-color: var(--input-color);
    }

    .search-bar > button {
        color: var(--font-color);
        padding: 1%;
        background-color: var(--div-background-color-shallow);
    }

    .search-bar > button:hover {
        color: var(--input-focus-font-color);
    }

    .search-bar:hover {
        border: 5px;
        border: 0.1rem solid var(--font-color);
    }

    .search-bar > input:hover {
        color: var(--input-focus-font-color);
    }

    .search-bar > input:focus {
        color: var(--input-focus-font-color);
    }

    .search-bar button:hover {
        background-color: var(--div-background-color);
    }
</style>