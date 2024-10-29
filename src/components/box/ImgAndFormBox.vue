<script lang="ts" setup>

</script>

<template>
    <div class="img-and-form-box">
        <div class="img-box">
            <div class="text">
                <h1>Welcome~</h1>
                <h2>欢迎加入本站 QAQ</h2>
            </div>
        </div>
        <div class="form">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
    .img-and-form-box {
        position: relative;
        display: flex;
        margin: auto;
        box-shadow: 1.2rem 1.2rem 2.4rem var(--shadow-color);
        z-index: 2;

        background-color: var(--div-background-color);
    }

    .img-box {
        width: 40vw;
        height: 50vh;
    }

    .img-box::before {
        width: 40vw;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        filter: blur(2px);

        background-position: center;
        background-size: cover;
        background-image: url("http://localhost:8080/img/bg.jpg?scale=0.1");
        backdrop-filter: blur(6px);
    }

    .text {
        width: 100%;
        height: 100%;
        padding-left: 4vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: var(--cover-page-background-color);
    }

    h1 {
        color: var(--font-color-2);
    }

    h2 {
        color: var(--font-color);
    }

    .form {
        display: flex;
        flex-direction: column;
        padding: 8vh 1.5rem;
        width: 28rem;
        gap: 0.5rem;

        background-color: var(--div-background-color);
    }

    :deep(i) {
        padding: 0 0.5rem;
        line-height: 2.5rem;
        text-align: center;
        font-size: 1.5rem;
    }

</style>