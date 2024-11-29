import DefaultTheme from 'vitepress/theme';
import Layout from './Layout.vue';

export default {
    ...DefaultTheme,
    Layout,
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp(ctx);

        ctx.router.onBeforeRouteChange = (to) => {
            if (typeof _hmt !== 'undefined') {
                _hmt.push(['_trackPageview', to]);
            }
        };
    },
};
