<script lang="ts" setup>
    import MarkDown from '@/components/tool/MarkDown.vue';
    import { ref } from 'vue';

    const text= ref<string>("")
</script>

<template>
    <textarea v-model="text"></textarea>
    <MarkDown :text="text"></MarkDown>
</template>

<style scoped>

</style>