<script lang="ts" setup>
    import { ref } from 'vue';
    import Card from './Card.vue';

    var height = ref<string>(window.innerHeight + 40 + "px");
    window.addEventListener('resize', () => {
        height.value = window.innerHeight + 40 / window.devicePixelRatio + "px";
    });
</script>

<template>
    <div id="cover-page" :style="{height: height}">
        <div class="my">
            <img src="https://pbs.twimg.com/profile_images/1835535314913501184/DJ7LhgIR.jpg">
            <span>我玩 GalGame? 真的假的?</span>
        </div>

        <div class="card-list" style="padding: 0;">
            <Card url="https://space.bilibili.com/34394509">
                <i class="iconfont icon-bilibili"></i>
                <span>BiliBilb<br><span>我的 BiliBili 主页</span></span>
            </Card>
            <Card url="https://github.com/FengLiuFeseliud">
                <i class="iconfont icon-github-fill"></i>
                <span>Github<br><span>我的 Github 主页</span></span>
            </Card>
            <Card url="https://x.com/wcecya">
                <i class="iconfont icon-yooxi"></i>
                <span>Twitter<br><span>我的 Twitter 主页</span></span>
            </Card>
            <Card url="https://space.bilibili.com/34394509">
                <i class="iconfont icon-code"></i>
                <span>前端源码<br><span>本站前端源码开源</span></span>
            </Card>
            <Card url="https://space.bilibili.com/34394509">
                <i class="iconfont icon-sever-fill"></i>
                <span>后端源码<br><span>本站后端源码开源</span></span>
            </Card>
            <Card url="https://cn.vuejs.org/">
                <i class="iconfont icon-Vue"></i>
                <span>Vue 3<br><span>渐进式 JavaScript 框架</span></span>
            </Card>
        </div>
    </div>
</template>

<style scoped>
    #cover-page {
        width: 100%;
        min-height: fit-content;
        padding-bottom: 2rem;
        margin: auto;

        background-color: var(--cover-page-background-color);
    }

    #cover-page > .my {
        width: fit-content;
        margin: auto;
        padding-top: 10%;
    }

    #cover-page > .my > span {
        display: block;

        font-size: calc(1.5rem + 1vw);
        text-align: center;
        font-weight: bold;
        color: var(--font-color);
    }

    img {
        border-radius: 50%;
        height: 33%;
        width: 33%;
        display: block;
        margin: auto;
        margin-top: 1rem;

        box-shadow: 10px 10px 10px rgb(80, 80, 80);
    }

    .card-list{
        width: 32rem;
        max-width: 79%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        margin: auto;
    }

    .card-list > .card {
        height: 4.3rem;
        width: 15rem;
        margin: 0.5rem auto;
    }

    .card-list > .card:hover {
        width: 16rem;
        height: 4.4rem;
    }

    .card-list > .card > span {
        line-height: 100%;
        display: inline-block;
        width: 70%;
    }

    .card-list > .card > span > span {
        font-size: 70%;
    }

    .card-list > .card > i {
        font-size: 2rem;
        display: inline-block;

        text-align: center;
        line-height: 3rem;

        width: 20%;
        height: 70%;
        min-height: 3rem;
        
        margin: 4%;

        box-shadow: 1px 1px 2.5px 2.5px rgb(208, 207, 207);
        border-radius: 5px;
    }

    .card-list > .card:hover > i {
        line-height: 140%;
    }
</style>