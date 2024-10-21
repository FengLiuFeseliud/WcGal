<script lang="ts" setup>
    const { name, radioTypes } = defineProps<{
        name: string, 
        checked: number,
        radioTypes: string[],
    }>()

    const [ radioType ] = defineModel<string>()
</script>

<template>
    <div class="radio-box">
        <div class="button-box" v-for="(item, index) in radioTypes" :key="item" @click="radioType == item">
            <input type="radio" :name="name" :value="item" v-model="radioType" :checked="checked == index"
                :class="'button iconfont ' + item" />
        </div>
    </div>
</template>

<style scoped>
    .radio-box {
        display: flex;
    }
    .button {
        position: relative;
        appearance: none;
        z-index: 2;
    }
</style>