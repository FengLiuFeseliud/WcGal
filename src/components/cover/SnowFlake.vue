<script lang="ts" setup>
    import { useWebStore } from '@/stores/WebStore';

    const useStore = useWebStore()
    const amount = defineModel<number>({
        default: 120
    })

    function randomX(): string{
        return Math.floor((Math.random()*98)+2) + "vw";
    }

    function randomDuration(): string{
        return Math.floor((Math.random()*10000)+5000) + "ms";
    }

    function randomSize(): string{
        const size = Math.random() + 0.8
        return (size < 1.3 ? size: 1.3) + "vw";
    }

    function randomPadding(): string{
        return Math.floor((Math.random()*40)-20) + "vw";
    }

</script>

<template>
    <div v-if="useStore.snowShow" class="snow-flake">
        <div class="snow" :style="{
                left: randomX(), 
                animationDuration: randomDuration(),
                opacity: Math.random() + 0.5,
                fontSize: randomSize(),
                paddingLeft: randomPadding()
            }" 
            v-for="index in amount" :key="index">
        </div>
    </div>
</template>

<style scoped>
    .snow {
        position: fixed;
        z-index: 1;
        animation: snow infinite linear;
    }

    @keyframes snow {
        0% {
            top: 0vh;
        }

        100% {
            transform: translateY(100vh);
            padding-left: 5vw;
            opacity: 0;
        }
    }
</style>