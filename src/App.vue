<script setup lang="ts">
    import FooterBar from "./components/bar/FooterBar.vue";
    import TopBar from "./components/bar/TopBar.vue"
    import LogBox from "./components/box/LogBox.vue";
    import SearchBox from '@/components/box/SearchBox.vue';
    import ToTopButton from "./components/button/ToTopButton.vue";
    import SnowFlake from "./components/cover/SnowFlake.vue";
</script>

<template>
    <SnowFlake v-bind:model-value="100"></SnowFlake>
    <TopBar />

    <div id="top"></div>
    <div class="page">
        <Suspense>
            <SearchBox />
        </Suspense>

        <Suspense>
            <router-view v-slot="{ Component }">
                <keep-alive>
                    <component :is="Component" />
                </keep-alive>
            </router-view>
        </Suspense>
    </div>
    <div id="bottom"></div>

    <ToTopButton></ToTopButton>
    <FooterBar></FooterBar>
    <LogBox></LogBox>
</template>


<style scoped>
    .page {
        width: 100vw;
        min-height: 100vh;
        height: fit-content;
    }
</style>
