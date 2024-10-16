<script lang="ts" setup>
    import { ref } from 'vue';

    const show = ref<boolean>(false)
</script>

<template>
    <div class="drop-down-box"
        @mouseover="show = true" 
        @mouseout="show = false">

        <slot name="icon"></slot>
        <i class="iconfont icon-down"></i>

        <div class="drop-down-list" v-show="show">
            <slot name="list"></slot>
        </div>
    </div>
</template>

<style scoped>
    .drop-down-list {
        position: absolute;
        display: flex;
        flex-direction: column;
        width: fit-content;
        padding: 0.2rem 0.7rem;
    }
</style>