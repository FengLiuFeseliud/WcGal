<script lang="ts" setup>
    const { show = true } = defineProps<{show: boolean}>()
</script>

<template>
    <div class="cover" v-show="show">
        <slot></slot>
    </div>
</template>

<style scoped>
    .cover {
        display: flex;
        width: 100vw;
        height: 100vh;
        z-index: 3;
    }
</style>