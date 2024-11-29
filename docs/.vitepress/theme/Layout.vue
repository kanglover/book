<template>
    <Layout :class="layoutClass">
        <template #doc-after>
            <Comment />
        </template>
    </Layout>
</template>

<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme';
import Comment from './components/Comment.vue';
import {useData} from 'vitepress';
import {ref} from 'vue';

const {Layout} = DefaultTheme;
const {frontmatter} = useData();

const layoutClass = ref('');
if (frontmatter.value?.layoutClass) {
    layoutClass.value = frontmatter.value.layoutClass;
}
</script>
