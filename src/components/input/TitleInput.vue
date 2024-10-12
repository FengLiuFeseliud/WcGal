<script lang="ts" setup>
    const [ title ] = defineModel<string>()
</script>

<template>
    <label class="title-input">
        标题
        <input type="text" v-model="title"/>
    </label>
</template>

<style scoped>
    .title-input {
        display: flex;
    }

    input {
        padding: 0.5rem;
        flex: 1;
        
        border: none;
        font-size: 1rem;
    }

    .title-input i {
        width: 9%;
        line-height: 2.2rem;
        
        text-align: center;
        font-size: 1.5rem;
    }
</style>