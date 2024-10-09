<script lang="ts" setup>
    import { ref } from 'vue';

    var height = ref<string>(window.innerHeight + 40 + "px");
    window.addEventListener('resize', () => {
        height.value = window.innerHeight + 40 / window.devicePixelRatio + "px";
    });
</script>

<template>
    <div class="cover" :style="{height: height}">
        <slot></slot>
    </div>
</template>

<style scoped>
    .cover {
        display: flex;
        width: 100%;

        background-color: var(--cover-page-background-color);
    }
</style>