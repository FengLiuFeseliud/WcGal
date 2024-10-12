<script lang="ts" setup>

</script>

<template>
    <div class="cover">
        <slot></slot>
    </div>
</template>

<style scoped>
    .cover {
        display: flex;
        width: 100vw;
        height: 100vh;

        background-color: var(--cover-page-background-color);
    }
</style>