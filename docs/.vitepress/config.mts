import {defineConfig} from 'vitepress';

export default defineConfig({
    base: '/book',
    title: 'kanglover 的读书笔记',
    description: 'Reading Notes',
    cleanUrls: true,
    head: [
        // 浏览器中图标
        ['link', {rel: 'icon', href: 'https://avatars.githubusercontent.com/u/35287056?s=96&v=4'}],
        // 添加百度统计代码
        [
            'script',
            {},
            `
                var _hmt = _hmt || [];
                (function() {
                    var hm = document.createElement("script");
                    hm.src = "https://hm.baidu.com/hm.js?a347aee2eb7431e3e3a8b06aef961ecb";
                    var s = document.getElementsByTagName("script")[0];
                    s.parentNode.insertBefore(hm, s);
                })();
            `,
        ],
    ],
    themeConfig: {
        logo: 'https://avatars.githubusercontent.com/u/35287056?s=96&v=4',
        nav: [
            {text: 'Home', link: '/'},
            {
                text: '网络篇',
                link: '/network/basic',
                activeMatch: '/network/',
            },
            {
                text: '前端框架',
                link: '/framework/further-react/introduce',
                activeMatch: '/framework/',
            },
        ],
        sidebar: {
            network: {
                base: '/network',
                items: [
                    {
                        text: '图解 HTTP',
                        collapsed: false,
                        items: [
                            {text: '1. 网络基础', link: '/basic'},
                            {text: '2. HTTP 协议', link: '/protocol'},
                            {text: '3. HTTP 信息', link: '/information'},
                            {text: '4. HTTP 状态码', link: '/status-code'},
                            {text: '5. Web 服务器', link: '/web-server'},
                            {text: '6. HTTP 首部', link: '/http-header'},
                            {text: '7. HTTPS', link: '/https'},
                            {text: '8. 身份认证', link: '/authorization'},
                            {text: '9. 追加的协议', link: '/upgrade-protocol'},
                        ],
                    },
                ],
            },
            framework: [
                {
                    text: 'React 框架',
                    base: '/framework',
                    items: [
                        {
                            text: '深入React技术栈',
                            collapsed: false,
                            items: [
                                {
                                    text: '1. React 简介',
                                    link: '/further-react/introduce',
                                },
                                {
                                    text: '2. 漫谈 React',
                                    link: '/further-react/talk',
                                },
                                {
                                    text: '3. 解读 React 源码',
                                    link: '/further-react/source-code',
                                },
                                {
                                    text: '4. Flux 架构模式',
                                    link: '/further-react/flux',
                                },
                            ],
                        },
                    ],
                },
                {
                    text: 'Vue 框架',
                    base: '/framework',
                    items: [],
                },
            ],
            psychology: {
                base: '/psychology',
                items: [
                    {
                        text: '自控力',
                        collapsed: false,
                        items: [
                            {
                                text: '1. 什么是意志力',
                                link: '/self-control/what',
                            },
                            {
                                text: '2. 意志力的本能',
                                link: '/self-control/instinct',
                            },
                            {
                                text: '3. 自控力的极限',
                                link: '/self-control/exercise',
                            },
                            {
                                text: '4. 容忍罪恶',
                                link: '/self-control/failure',
                            },
                            {
                                text: '5. 误把渴望当幸福',
                                link: '/self-control/desire',
                            },
                        ],
                    },
                ],
            },
            economy: {
                base: '/economy',
                items: [{text: '小狗钱钱', link: '/money-dog'}],
            },
        },
        search: {
            provider: 'local',
        },
        outline: {
            label: '页面导航'
        },
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
        editLink: {
            pattern: 'https://github.com/kanglover/book/edit/main/docs/:path',
            text: '在 GitHub 上编辑此页面'
        },
        lastUpdated: {
            text: '最后更新于',
            formatOptions: {
                dateStyle: 'short'
            }
        },
        socialLinks: [{icon: 'github', link: 'https://github.com/kanglover'}],
    },
});
