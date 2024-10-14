<script setup lang="ts">
    import WebsiteTitle from "../WebsiteTitle.vue"
    import TopSearchBar from "./TopSearchBar.vue";
    import UserInfoBar from "./UserInfoBar.vue";

</script>

<template>
    <div id="top-bar">
        <div id="top-left">
            <WebsiteTitle/>
        </div>
        <div id="top-right">
            <router-link to="/"><i class="iconfont icon-zhuye">主页</i></router-link>
            <UserInfoBar></UserInfoBar>
            <TopSearchBar></TopSearchBar>
        </div>
    </div>
</template>

<style scoped>
    #top-bar {
        width: 100%;
        display: flex;
        position: fixed;
        align-items: center;
        z-index: 10;

        font-size: calc(1vw);
    }

    #top-left {
        flex: 1;
        margin-left: 1rem;
    }

    #top-right {
        width: fit-content;
        display: flex;
        align-items: center;
        margin-right: 1rem;
    }

    #top-bar >>> a {
        margin: 0 0.5rem;
    }

    #top-bar >>> button {
        margin: 0 0.5rem;
    }

    #top-bar a {
        color: var(--font-color);
        transition: all 0.2s;
    }

    #top-bar a:hover {
        color: var(--link-hover-font-color);
        background-color: var(--font-color);
    }

</style>