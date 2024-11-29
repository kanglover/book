<template>
    <div v-if="showComment" id="comment-container"></div>
</template>

<script lang="ts" setup>
import {onMounted, watch, ref, nextTick} from 'vue';
import 'gitalk/dist/gitalk.css';
import Gitalk from 'gitalk';
import {useData, useRouter} from 'vitepress';
import md5 from 'md5';

const {page} = useData();
const {route} = useRouter();

const gitDefault = {
    clientID: 'Ov23liDwIYPFAHUx8qxK',
    clientSecret: '2a8f8a58acbe5d14113b748fe32d5c9bcc781dd9',
    repo: 'book',
    owner: 'kanglover',
    admin: ['kanglover'],
    distractionFreeMode: false,
};

const showComment = ref(true);
onMounted(() => {
    watch(
        () => route.path,
        () => {
            showComment.value = false;
            nextTick(() => {
                showComment.value = true;

                setTimeout(() => {
                    const gitalk = new Gitalk({
                        ...gitDefault,
                        id: md5(page.value.relativePath) as string,
                    });
                    gitalk.render('comment-container');
                }, 0);
            });
        },
        {immediate: true}
    );
});
</script>

<style>
.gt-container .gt-header-textarea {
    color: #000;
}
</style>
