<script setup lang="ts">
    import CoverPage from "@/components/CoverPage.vue"
    import GameList from "@/components/GameList.vue";
</script>

<template>
    <CoverPage/>
    
    <Suspense>
        <GameList/>
    </Suspense>
</template>


<style>
    
</style>
