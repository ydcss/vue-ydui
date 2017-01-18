<template>
    <yd-layout>

        <yd-navbar slot="navbar" title="NavBar">
            <router-link to="/asidebar" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

        <yd-navbar title="NavBar1" class="demo-small-pitch"></yd-navbar>

        <yd-navbar title="NavBar2" class="demo-small-pitch">
            <router-link to="/asidebar" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>

            <router-link to="/asidebar" slot="right">
                <yd-navbar-next-icon></yd-navbar-next-icon>
            </router-link>
        </yd-navbar>

        <yd-navbar class="demo-small-pitch">
            <router-link to="/asidebar" slot="left">
                <yd-navbar-back-icon>返回</yd-navbar-back-icon>
            </router-link>

            <img slot="center" src="http://static.ydcss.com/www/img/logo.png" alt="">

            <router-link to="/asidebar" slot="right">
                <yd-navbar-next-icon>前进</yd-navbar-next-icon>
            </router-link>
        </yd-navbar>

        <yd-navbar title="什么鬼，这个标题怎么那么长啊" class="demo-small-pitch">
            <router-link to="/asidebar" slot="left">
                <i class="demo-icons-discover"></i>
            </router-link>

            <router-link to="/asidebar" slot="right">
                <i class="demo-icons-me"></i>
            </router-link>
            <router-link to="/asidebar" slot="right">
                <i class="demo-icons-me"></i>
            </router-link>
            <router-link to="/asidebar" slot="right">
                <i class="demo-icons-me"></i>
            </router-link>
        </yd-navbar>

    </yd-layout>
</template>
