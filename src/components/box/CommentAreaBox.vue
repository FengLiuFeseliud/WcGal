<script lang="ts" setup>
    import { Page } from '@/utils/PageUtils';
    import CommentInput from '../input/CommentInput.vue';
    import CommentBox from './CommentBox.vue';
    import { CommentRequest } from '@/request/CommentRequest';
    import { onActivated, onDeactivated, ref, watch } from 'vue';
    import RadioBox from '../input/RadioBox.vue';
    import { useUserStore } from '@/stores/UserStore';
    import SubCommentsBox from './SubCommentsBox.vue';

    enum SortType {
        Likes = "likes",
        Desc = "desc",
        Asc = "asc"
    }

    const useStore = useUserStore()
    const sortType = ref<SortType>(SortType.Likes)
    const resourceId = defineModel<string>()
    const page = new Page(20, async (page, limit) => {
        if(resourceId.value == undefined){
            return null
        }
        return await CommentRequest.getComments(resourceId.value, page, limit, false)
    })

    watch(resourceId, async (id) => {
        if(id == undefined){
            return null
        }
        await page.resetList()
    })

    onActivated(page.startScroll.bind(page))
    onDeactivated(page.endScroll.bind(page))
</script>

<template>
    <div class="comment-area-box">
        <div class="comment-input-box">
            <span class="comment-name iconfont icon-message-comments"> 评论<span>&nbsp;{{ page.getCount() }}</span></span>
            <div class="comment-sort-set">
                <RadioBox :name="'sort'" :checked="0" :radio-types="[SortType.Likes, SortType.Desc, SortType.Asc]" v-model:model-value="sortType" />
            </div>
            <span class="comment-need-login-info" v-if="useStore.notLogin()">登录后发表跟回复评价哦~</span>
            <CommentInput :comment-id="0" :update="false" :reply="false" v-model:resource-id="resourceId" v-if="useStore.isLogin()"></CommentInput>
        </div>
        <div class="comment-info-box" v-for="(comment, index) in page.list.value" :key="index">
            <CommentBox :comment="comment"></CommentBox>
            <SubCommentsBox :comment="comment"></SubCommentsBox>
        </div>
    </div>
</template>

<style scoped>
    .comment-area-box {
        display: flex;
        flex-direction: column;
        gap: 1.3rem;
    }

    .comment-info-box {
        display: flex;
        flex-direction: column;
    }

    .comment-input-box > .comment-name {
        margin-bottom: 0.5rem;
        font-size: 1.5rem;
        font-weight: bolder;
        color: var(--font-color-2);
    }

    .comment-input-box > .comment-name > span {
        font-size: 1rem;
        font-weight: normal;
        color: var(--font-color);
    }

    .comment-input-box > .comment-sort-set {
        display: inline-block;
        width: fit-content;
        padding: 0.5rem;
    }

    .comment-sort-set :deep(input) {
        color: var(--font-color);
        padding: 0 0.5rem;
        border-left: 0.1rem solid var(--link-hover-font-color);
        transition: all 0.2s;
    }

    .comment-sort-set :deep(input:hover) {
        color: var(--link-hover-font-color);
    }

    .comment-sort-set :deep(.checked) {
        color: var(--link-hover-font-color);
    }

    .comment-sort-sett :deep(.button-box) {
        border-left: 0.1rem solid var(--link-hover-font-color);
    }

    .comment-sort-set :deep(.likes::after) {
        content: '点赞最多';
    }

    .comment-sort-set :deep(.desc::after) {
        content: '最新';
    }

    .comment-sort-set :deep(.asc::after) {
        content: '最早';
    }

    .comment-need-login-info {
        padding: 0.5rem;
        float: right;

        color: var(--font-color-2);
    }
</style>