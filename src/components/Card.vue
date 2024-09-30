<script lang="ts" setup>
    import { router } from '@/Router';

    const props = defineProps({url: String, routerPath: String})

    function onTo(){
        console.log(props.routerPath, " ", props.url)

        if(props.routerPath != undefined){
            router.push(props.routerPath)
        }

        if(props.url != undefined){
            window.open(props.url, "_blank")
        }
    }
</script>

<template>
    <a class="card" target="_blank" @click="onTo">
        <slot/>
    </a>
</template>

<style scoped>
    .card {
        background-color: var(--div-background-color);
        display: block;
        border-radius: 10px;

        color: var(--font-color);
        box-shadow: 5px 5px 5px rgb(80, 80, 80);
        transition: all 0.25s;
    }

    .card:hover {
        color: var(--link-hover-font-color);
    }

    .card > *:hover {
        color: var(--link-hover-font-color);
    }

</style>