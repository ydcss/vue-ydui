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

            <img slot="center" src="http://static.ydcss.com/www/img/logo.png">

            <router-link to="/asidebar" slot="right">
                <yd-navbar-next-icon>前进</yd-navbar-next-icon>
            </router-link>
        </yd-navbar>

        <yd-navbar title="什么鬼，这个标题怎么那么长啊" class="demo-small-pitch">
            <router-link to="/asidebar" slot="left">
                <yd-icon name="home-outline" size=".36rem" color="#666"></yd-icon>
            </router-link>
            <router-link to="/asidebar" slot="right">
                <yd-icon name="share1" size=".36rem" color="#666"></yd-icon>
            </router-link>
            <router-link to="/asidebar" slot="right">
                <yd-icon name="share1" size=".36rem" color="#666"></yd-icon>
            </router-link>
            <router-link to="/asidebar" slot="right">
                <yd-icon name="share1" size=".36rem" color="#666"></yd-icon>
            </router-link>
        </yd-navbar>

        <yd-navbar title="Props可修改边框颜色啦~" class="demo-small-pitch" border-color="#337EF6" bgcolor="#FCCECD"></yd-navbar>
    </yd-layout>
</template>
