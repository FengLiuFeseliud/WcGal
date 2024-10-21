<script lang="ts" setup>
    import { ref } from 'vue';
    import DropDownBox from '../box/DropDownBox.vue';
    import { useWebStore } from '@/stores/WebStore';

    const themes = ref<string>("default")
    const useStore = useWebStore()

    var root = document.querySelector(":root")
    if(root !== null){
        let themeNmae = localStorage.getItem("data-themes")
        root.setAttribute("data-themes", themeNmae !== null ? themeNmae : "default")
    }

    function onTheme(){
        if(root == null){
            return
        }

        if(root.getAttribute("data-themes") == "default"){
            root.setAttribute("data-themes", "dark")
            localStorage.setItem("data-themes", "dark")
        } else {
            root.setAttribute("data-themes", "default")
            localStorage.setItem("data-themes", "default")
        }
        
        let themeNmae = localStorage.getItem("data-themes")
        themes.value = themeNmae !== null ? themeNmae : "default"
    }

    function onSonwShow(){
        useStore.snowShow = !useStore.snowShow
        localStorage.setItem("snow", String(useStore.snowShow))
    }
</script>

<template>
    <DropDownBox>
        <template #icon>
            <i class="iconfont icon-theme"> 主题</i>
        </template>

        <template #list>
            <a class="iconfont icon-liangse" @click="onTheme" v-show="themes == 'dark'"> 亮色</a>
            <a class="iconfont icon-anse" @click="onTheme" v-show="themes == 'default'"> 暗色</a>
            <a class="iconfont icon-yun_o" @click="onSonwShow" v-show="useStore.snowShow"> 关闭下雪</a>
            <a class="iconfont" @click="onSonwShow" v-show="!useStore.snowShow">❆ 下雪</a>
        </template>
    </DropDownBox>
</template>

<style scoped>
</style>