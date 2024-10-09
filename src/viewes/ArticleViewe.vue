<script lang="ts" setup>
    import MarkDown from '@/components/tool/MarkDown.vue';
    import { ArticleRequest } from '@/request/ArticleRequest';
    import { router } from '@/router';
    import { Log } from '@/stores/LogStore';

    const { articleId } = defineProps<{articleId: number}>()
    const article = await ArticleRequest.getArticle(articleId)
    if(article.code != 200){
        Log.error("获取文章失败... qwq")
        setTimeout(() => {
            router.back()
        }, 1000)
    }
</script>

<template>
    <div class="article">
        <MarkDown :text="article.data.articleContent" :line="false" :show="true"></MarkDown>
    </div>
</template>

<style scoped>

</style>