<script lang="ts" setup>

</script>

<template>
    <div class="footer-bar">
        <a href="https://opensource.org/license/GPL-3.0">© 2024-2024 wcgal.xyz by FengLiu 本站以 GPLv3 协议开源！</a>
    </div>
</template>

<style scoped>
    .footer-bar {
        display: flex;
        flex-direction: column;
        width: 100vw;
        padding: 2rem;
        margin-top: 3rem;

        text-align: center;
        background-color: var(--cover-page-background-color-deep);
    }

    .footer-bar > a {
        width: fit-content;
        margin: 0 auto;
        
        font-weight: bolder;
        color: var(--font-color-2);
        transition: all 0.2s;
    }

    .footer-bar > a:hover {
        color: var(--link-hover-font-color);
    }
</style>