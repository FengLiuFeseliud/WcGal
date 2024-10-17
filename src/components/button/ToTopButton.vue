<script lang="ts" setup>
    import { onActivated, onDeactivated, ref } from 'vue';

    const toTop = ref<boolean>(false)
    const show = ref<boolean>(false)
    const hied = ref<boolean>(false)

    function canShowButton(): boolean {
        if(document.documentElement.clientHeight * 2 < document.documentElement.scrollHeight){
            show.value = true
        } else {
            show.value = false
        }

        return show.value
    }

    function scrollReset(): void {
        if(!canShowButton()){
            return
        }

        if(document.documentElement.clientHeight + window.scrollY > document.documentElement.scrollHeight / 2){
            toTop.value = true
        } else {
            toTop.value = false
        }
    }

    window.addEventListener("scroll", scrollReset)
    onActivated(() => {window.addEventListener("scroll", scrollReset)})
    onDeactivated(() => window.removeEventListener("scroll", scrollReset))
</script>

<template>
    <div class="to-top-box" :style="{right: (hied ? '0': '5.9vw'), bottom: (hied ? '15.5vh': '13.5vh')}">
        <a v-show="show && !hied" :href="toTop ? '#top': '#bottom' " :class="'to-top-button iconfont icon-' + (toTop ? 'xiangshang': 'xiangxia')"></a>
        <button v-show="show" @click="hied = !hied" :class="'hied iconfont icon-' + (hied ? 'zititubiao2zuo' : 'zititubiao2you')"></button>
    </div>
</template>

<style scoped>
    .to-top-box {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        position: fixed;
    }

    .to-top-button {
        padding: 1rem;
        font-size: 2rem;

        border-radius: 1.5rem;
        color: var(--font-color);
        border: 0.3rem solid var(--font-color);
        background-color: var(--div-background-color);
        transition: all 0.2s;
    }

    .to-top-box > * {
        box-shadow: 0.3rem 0.3rem 0.5rem var(--shadow-color-deep);
    }

    .to-top-button:hover {
        color: var(--link-hover-font-color);
        background-color: var(--div-background-color-deep);
    }

    .hied {
        padding: 0.4rem 0.2rem;
        height: 3rem;

        color: var(--font-color);
        border: 0.2rem solid var(--font-color);
        background-color: var(--div-background-color);
        border-radius: 1rem;
        transition: all 0.2s;
    }

    .hied:hover {
        color: var(--link-hover-font-color);
        background-color: var(--div-background-color-deep);
    }
</style>