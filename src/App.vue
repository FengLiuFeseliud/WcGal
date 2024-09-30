<script setup lang="ts">
    import TopBar from "./components/bar/TopBar.vue"
</script>

<template>
    <TopBar/>
    <router-view v-slot="{ Component }">
        <keep-alive>
            <component :is="Component" />
        </keep-alive>
    </router-view>
</template>


<style>
    
</style>
