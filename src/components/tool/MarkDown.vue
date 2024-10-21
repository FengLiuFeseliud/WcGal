<script lang="ts" setup>
    import markdownit from 'markdown-it'
    import attrs from 'markdown-it-attrs'
    import highlightjs from 'markdown-it-highlightjs'
    import MarkdownItContainer from 'markdown-it-container';
    import namedCodeBlocks from 'markdown-it-named-code-blocks';
    import { ruby } from "@mdit/plugin-ruby";
    import { tasklist } from "@mdit/plugin-tasklist";
    import { imgLazyload } from "@mdit/plugin-img-lazyload";
    import { ins } from "@mdit/plugin-ins";
    import { imgSize } from "@mdit/plugin-img-size";
    import { full as emoji } from 'markdown-it-emoji';
    import markdownItTocDoneRight from "markdown-it-toc-done-right";
    import anchor from "markdown-it-anchor";
    import twemoji from 'twemoji';
    import '@/assets/markdownTheme.css';
    
    const md = markdownit()
        .use(highlightjs, {
            inline: true
        })
        .use(attrs)
        .use(MarkdownItContainer)
        .use(namedCodeBlocks)
        .use(tasklist)
        .use(imgLazyload)
        .use(ins)
        .use(emoji)
        .use(imgSize)
        .use(ruby)
        .use(markdownItTocDoneRight)
        .use(anchor)

    md.renderer.rules.emoji = function(token, idx) {
        return twemoji.parse(token[idx].content);
    };

    const { text, line, show } = defineProps<{text: string, line: boolean, show?: boolean}>()
</script>

<template>
    <div class="markdown-line markdown" v-if="line" v-show="show">
        <span class="markdown-line-span" v-for="item in text.split('\n')" :key="item" v-html="md.render(item)"></span>
     </div>
     <div class="markdown" v-if="!line"  v-html="md.render(text)" v-show="show"></div>
</template>

<style scoped>
    .markdown {
        padding: 1.5rem;

        word-wrap: break-word;
        word-break: keep-all;
    } 

    .markdown-line-span {
        display: flex;
    }

    .markdown-line-span {
        display: block;
        padding: 0 0.5rem;
        flex: 1;

        counter-increment: line;
        text-align: right;
        font-size: 1rem;
    }

    .markdown-line-span::before {
        content: counter(line);
        padding: 0 0.5rem;
        margin-right: 1.5rem;

        text-align: right;
        font-size: 1rem;
        background-color: var(--markdown-line-color);
        color: var(--markdown-line-font-color);
    }
</style>