<template>
    <yd-layout title="List">

        <yd-cell-group title="排版样式" class="demo-small-pitch">
            <yd-cell-item arrow type="link" href="/list.theme/1">
                <span slot="left">theme1</span>
            </yd-cell-item>
            <yd-cell-item arrow type="link" href="/list.theme/2">
                <span slot="left">theme2</span>
            </yd-cell-item>
            <yd-cell-item arrow type="link" href="/list.theme/3">
                <span slot="left">theme3</span>
            </yd-cell-item>
            <yd-cell-item arrow type="link" href="/list.theme/4">
                <span slot="left">theme4</span>
            </yd-cell-item>
            <yd-cell-item arrow type="link" href="/list.theme/5">
                <span slot="left">theme5</span>
            </yd-cell-item>
        </yd-cell-group>

        <yd-cell-group title="异步数据加载">
            <yd-cell-item arrow type="link" href="/list.infinitescroll">
                <span slot="left">Infinite Scroll</span>
                <span slot="right">滚动加载</span>
            </yd-cell-item>
            <yd-cell-item arrow type="link" href="/list.pullrefresh">
                <span slot="left">Pull Refresh</span>
                <span slot="right">下拉刷新</span>
            </yd-cell-item>
        </yd-cell-group>

    </yd-layout>
</template>
