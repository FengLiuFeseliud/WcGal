<script lang="ts" setup>
    import IimitInput from './IimitInput.vue';

    const [ userName ] = defineModel<string>()
</script>

<template>
    <IimitInput v-model:model-value="userName" :placeholder="'用户名'" 
        @canInput="(text, canInput) => canInput.value = text.length >= 2 && text.length <= 30">
        <slot><i class="iconfont icon-nickname_default"></i></slot>

        <template #error-msg>
            <span>用户名不能小于 2 位或大于 30 位...</span>
        </template>
    </IimitInput>
</template>

<style scoped>

</style>