<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm12>
                <v-card>
                    <v-list three-line>
                    <template v-for="(item, index) in items">
                        <v-list-tile
                            :key="item.github"
                            avatar
                            ripple
                        >
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                            <v-list-tile-sub-title class="ruphi-ife-list-sub-title">预览地址：<a :href="item.page+'.html'" target="blank" :title="item.page">{{ item.page }}</a></v-list-tile-sub-title>
                            <v-list-tile-sub-title class="ruphi-ife-list-sub-title">github源码：<a :href="item.github" target="blank" :title="item.github">{{ item.github }}</a></v-list-tile-sub-title>
                        </v-list-tile-content>
                        </v-list-tile>
                        <v-divider
                        v-if="index + 1 < items.length"
                        :key="index"
                        ></v-divider>
                    </template>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
const ifeItems = [
    {title: '颜色选择器', page: 'http://47.112.96.94/ife/color-picker', github: 'https://github.com/Ruphi/IFE/tree/master/src/pages/color-picker'},
    {title: '标签云', page: 'http://47.112.96.94/ife/tag-cloud', github: 'https://github.com/Ruphi/IFE/tree/master/src/pages/tag-cloud'},
    {title: '仿百度页面-布局练习', page: 'http://47.112.96.94/ife/BaiduIFE/HTML_CSS/task1-2/task1', github: 'https://github.com/Ruphi/Ruphi.github.io/tree/master/projects/BaiduIFE/HTML_CSS/task1-2'},
    {title: '三栏式布局', page: 'http://47.112.96.94/ife/BaiduIFE/HTML_CSS/task3/task3', github: 'https://github.com/Ruphi/Ruphi.github.io/tree/master/projects/BaiduIFE/HTML_CSS/task3'},
    {title: '模拟报纸排版', page: 'http://47.112.96.94/ife/BaiduIFE/HTML_CSS/task6/task6_paper', github: 'https://github.com/Ruphi/Ruphi.github.io/tree/master/projects/BaiduIFE/HTML_CSS/task6'},
    {title: '新世界页面', page: 'http://47.112.96.94/ife/BaiduIFE/HTML_CSS/task7/index', github: 'https://github.com/Ruphi/Ruphi.github.io/tree/master/projects/BaiduIFE/HTML_CSS/task7'}];
export default {
    data(){
        return {
            items: []
        }
    },
    created(){
        this.items = ifeItems;
    }
}
</script>

<style scoped>
    .ruphi-ife-list-sub-title{
        white-space: nowrap!important;
        overflow: hidden;
        text-overflow: ellipsis;
        display: inline-block!important;
    }
    .ruphi-ife-list-sub-title a{
        text-decoration: none;
    }
</style>
