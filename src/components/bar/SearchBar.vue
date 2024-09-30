<script lang="ts" setup>
    import { ref } from 'vue';

    const [ desc ] = defineModel<boolean>()

    const keyword = ref<string>()
    const emits = defineEmits<{keyword: [keyword: string]}>()
</script>

<template>
    <div class="search-bar">
        <input type="text" v-model="keyword">
        <button @click="keyword != undefined ? emits('keyword', keyword): null">
            <i class="iconfont icon-a-Searchbar_unselected"></i>
        </button>
        <button @click="desc = !desc">
            <i :class="desc ? 'iconfont icon-paixujiangxu': 'iconfont icon-paixushengxu'"></i>
        </button>
    </div>
</template>

<style scoped>
    .search-bar > * {
        border: none;
        display: inline-block;

        font-size: 2rem;
        overflow-x: scroll;
    }

    .search-bar {
        margin: auto;
        margin-top: 20px;
        margin-bottom: 20px;
        width: fit-content;
        height: 60px;

        border-radius: 10px;
        overflow: hidden;
    }

    .search-bar i {
        font-size: 30px;
        transition: all 0.25s;
    }

    .search-bar > input {
        padding: 0px;
        width: fit-content;
        height: 60px;

        text-align: center;

        border: 0px 5px 5px 5px;
        color: var(--font-color);
    }

    .search-bar > button {
        width: 60px;
        height: 60px;

        color: var(--font-color);
        background-color: aliceblue;
    }

    .search-bar > button:hover {
        color: var(--input-focus-font-color);
    }

    .search-bar:hover {
        border: 5px;
    }

    .search-bar > input:hover {
        color: var(--input-focus-font-color);
    }

    .search-bar > input:focus {
        border: none;
        color: var(--input-focus-font-color);
    }

    .search-bar button:hover {
        background-color: var(--div-background-color);
    }
</style>