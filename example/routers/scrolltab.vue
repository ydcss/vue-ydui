<template>
    <yd-layout>
        <yd-navbar slot="navbar" title="ScrollTab">
            <router-link to="/tabs" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

        <yd-scrolltab>
            <yd-scrolltab-panel label="空调" icon="demo-icons-category1">
                <div style="height: 350px;background-color: gray;"></div>
            </yd-scrolltab-panel>

            <yd-scrolltab-panel label="冰箱" icon="demo-icons-category2" active>
                <div style="height: 350px;background-color: blue;"></div>
            </yd-scrolltab-panel>

            <yd-scrolltab-panel label="洗衣机" icon="demo-icons-category3">
                <div style="height: 350px;background-color: yellow;"></div>
            </yd-scrolltab-panel>

            <yd-scrolltab-panel label="热水器" icon="demo-icons-category4">
                <div style="height: 350px;background-color: green;"></div>
            </yd-scrolltab-panel>

            <yd-scrolltab-panel label="厨房大家电" icon="demo-icons-category5">
                <div style="height: 350px;background-color: saddlebrown;"></div>
            </yd-scrolltab-panel>

            <yd-scrolltab-panel label="厨房小家电" icon="demo-icons-category6">
                <div style="height: 350px;background-color: darkgoldenrod;"></div>
            </yd-scrolltab-panel>

            <yd-scrolltab-panel label="生活家电" icon="demo-icons-category7">
                <div style="height: 350px;background-color: indianred;"></div>
            </yd-scrolltab-panel>

            <yd-scrolltab-panel label="风扇" icon="demo-icons-category8">
                <div style="height: 350px;background-color: aqua;"></div>
            </yd-scrolltab-panel>
        </yd-scrolltab>

    </yd-layout>
</template>
