<script setup lang="ts">
    import WebsiteTitle from "../WebsiteTitle.vue"

</script>

<template>
    <div id="top-bar">
        <WebsiteTitle/>
    </div>
</template>

<style scoped>
    #top-bar {
        margin: 0 auto;
        width: 78%;

        border-bottom: 0.001vw solid;
        position: fixed;

        left: 0;
        right: 0;
    }

    * {
        margin-top: 5px;
        margin-left: 5px;

        font-size: calc(1rem + 1vw);
    }

    .top-bar span {
        font-size: calc(1rem + 1vw);
    }
</style>