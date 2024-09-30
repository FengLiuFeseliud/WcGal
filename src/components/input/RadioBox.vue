<script lang="ts" setup>
    const { name, radioTypes } = defineProps<{
        name: string, 
        checked: number,
        radioTypes: string[],
    }>()

    const [ radioType ] = defineModel<string>()
</script>

<template>
    <input type="radio" :name="name" v-for="(item, index) in radioTypes" :key="item"  @click="radioType == item"
        :class="'button iconfont ' + item" :value="item" v-model="radioType" :checked="checked == index">
</template>

<style scoped>
    .button {
        appearance: none;
    }
</style>