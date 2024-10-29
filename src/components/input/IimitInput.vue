<script lang="ts" setup>
    import { ref, type Ref } from 'vue';
    import CanInputBox from '../box/CanInputBox.vue';

    const canInput = ref<boolean | undefined>()
    const { placeholder } = defineProps<{placeholder: string}>()
    const emit = defineEmits<{canInput: [text: string, canInput: Ref<boolean | undefined>]}>()
    const [ text ] = defineModel<string>({
        set(value) {
            emit("canInput", value, canInput)
            return value
        }
    })

</script>

<template>
    <CanInputBox v-model:model-value="canInput" class="input-box">
        <slot></slot>
        <input v-model="text" :placeholder="placeholder" />

        <template #error-msg>
            <slot name="error-msg"></slot>
        </template>
    </CanInputBox>
</template>

<style scoped>
    .input-box {
        display: flex;
    }

    input {
        flex: 1;
        
        border: none;
        font-size: 1rem;
        background-color: var(--input-color);
        color: var(--input-focus-font-color);
    }
</style>