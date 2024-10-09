<script lang="ts" setup>
    const [ userName ] = defineModel<string>()
</script>

<template>
    <label class="name-input">
        <i class="iconfont icon-nickname_default"></i>
        <input type="text" v-model="userName"/>
    </label>
</template>

<style scoped>
    .name-input {
        display: flex;
    }

    input {
        padding: 0.5rem;
        flex: 1;
        
        border: none;
        font-size: 1rem;
    }

    .name-input i {
        width: 9%;
        line-height: 2.2rem;
        
        text-align: center;
        font-size: 1.5rem;
    }
</style>