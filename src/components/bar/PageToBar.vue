<script lang="ts" setup>
    import type { Comment } from '@/request/CommentRequest';
    import type { Page } from '@/utils/PageUtils';
    import { ref } from 'vue';

    const { page } = defineProps<{page: Page<Comment>}>()
    const rangeList = ref<number[]>(range(page.pageIn.value))
    
    function range(index: number){
        let length = 5
        if(index <= 1){
            index = 0
            length = 6
        }

        if(index + 6 >= page.getPages()){
            index = page.getPages() - 6
            length = 6
        }

        
        return Array.from(
            {length: length}, 
            (value, key) => index + key + 1)
    }

    async function toPage(index: number){
        await page.to(index - 1)
        rangeList.value = range(page.pageIn.value)
    }

    async function prePage(){
        await page.pre()
        rangeList.value = range(page.pageIn.value)
    }

    async function nextPage(){
        await page.next()
        rangeList.value = range(page.pageIn.value)
    }
</script>

<template>
    <div class="page-to-bar" v-if="page.getPages() !== 1 && page.getPages() < 7">
        <button class="page-to iconfont icon-zititubiao2zuo" @click="prePage"></button>
        <button :class="index - 1 == page.pageIn.value ? 'page-in': 'page-to'" 
            v-for="index in page.getPages()" :key="index" @click="toPage(index)">{{ index }}</button>
        <button class="page-to iconfont icon-zititubiao2you" @click="nextPage"></button>
    </div>
    <div class="page-to-bar" v-if=" page.getPages() >= 7">
        <button class="page-to iconfont icon-zititubiao2zuo" @click="prePage"></button>
        <div v-show="page.pageIn.value >= 2">
            <button class="page-to" @click="toPage(1)">1</button>
            ...
        </div>
        <button :class="index - 1 == page.pageIn.value ? 'page-in': 'page-to'" 
            v-for="index in rangeList" :key="index" @click="toPage(index)">{{ index }}</button>
        <div v-show="page.pageIn.value < page.getPages() - 6">
            ...
            <button class="page-to" @click="toPage(page.getPages())">{{ page.getPages() }}</button>
        </div>
        <button class="page-to iconfont icon-zititubiao2you" @click="nextPage"></button>
    </div>
</template>

<style scoped>
    .page-to-bar {
        display: flex;
        gap: 0.5rem;
        justify-content: flex-end;

        z-index: 2;
    }

    .page-to-bar button {
        padding: 0.3rem 0.6rem;
        font-size: 1rem;
    
        border-radius: 0.3rem;
        box-shadow: 0.2rem 0.2rem 0.4rem var(--shadow-color);
        transition: all 0.2s;
    }

    .page-to-bar button:hover {
        color: var(--link-hover-font-color);
        background-color: var(--font-color);
    }

    .page-to-bar > div {
        color: var(--font-color-2);
    }

    .page-to {
        color: var(--font-color);
        background-color: var(--div-background-color);
    }

    .page-in {
        color: var(--font-color-2);
        background-color: var(--font-color);
    }
</style>