<script lang="ts" setup>
    const { text } = defineProps<{text: string}>()
    const delConfirm = defineModel<boolean>()
    const emits = defineEmits<{confirm: []}>()
</script>

<template>
    <div class="confirm" v-if="delConfirm" style="position: absolute">
        <span>{{ text }}</span>
        <div class="confirm-buttons">
            <button @click="delConfirm = false">取消</button>
            <button @click="emits('confirm')">确定</button>
        </div>
    </div>
</template>

<style scoped>
    .confirm {
        overflow: hidden;
        padding: 0.5rem;
        
        background-color: var(--div-background-color);
        border-radius: 1rem;
        border: 0.2rem solid var(--font-color);
    }

    span {
        color: var(--font-color);
        font-size: 1rem;
    }

    button {
        position: relative;
        padding: 0 0.1rem;
        z-index: 2;

        font-size: 1rem;
        color: var(--font-color-2);
        background-color: var(--div-background-color);
        transition: all 0.2s;
    }

    button:hover {
        color: var(--link-hover-font-color);
    }

    .confirm-buttons {
        display: flex;
        margin-top: 0.5rem;
    }

    .confirm-buttons > button {
        flex: 1;
    }
</style>