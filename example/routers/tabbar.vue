<template>
    <yd-layout>
        <yd-navbar slot="navbar" title="TabBar">
            <router-link to="/asidebar" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

        <yd-tabbar class="demo-small-pitch">
            <yd-tabbar-item title="微信" link="/asidebar">
                <i slot="icon" class="demo-icons-weixin"></i>
            </yd-tabbar-item>
            <yd-tabbar-item title="通讯录" link="/asidebar">
                <i slot="icon" class="demo-icons-contact"></i>
            </yd-tabbar-item>
            <yd-tabbar-item title="发现" link="/asidebar">
                <i slot="icon" class="demo-icons-discover"></i>
            </yd-tabbar-item>
        </yd-tabbar>

        <yd-tabbar class="demo-small-pitch">
            <yd-tabbar-item title="微信" link="/asidebar" active>
                <i slot="icon" class="demo-icons-weixin"></i>
                <yd-badge slot="badge" type="danger">2</yd-badge>
            </yd-tabbar-item>
            <yd-tabbar-item title="通讯录" link="/asidebar">
                <i slot="icon" class="demo-icons-contact"></i>
            </yd-tabbar-item>
            <yd-tabbar-item title="发现" link="/asidebar" dot>
                <i slot="icon" class="demo-icons-discover"></i>
            </yd-tabbar-item>
            <yd-tabbar-item title="图片" link="/asidebar">
                <img slot="icon" src="http://static.ydcss.com/ydui/img/logo.png"/>
            </yd-tabbar-item>
        </yd-tabbar>

        <yd-tabbar slot="tabbar">
            <yd-tabbar-item title="微信" link="/tabbar" active>
                <i slot="icon" class="demo-icons-weixin"></i>
                <yd-badge slot="badge" type="danger">2</yd-badge>
            </yd-tabbar-item>
            <yd-tabbar-item title="通讯录" link="/asidebar">
                <i slot="icon" class="demo-icons-contact"></i>
            </yd-tabbar-item>
            <yd-tabbar-item title="发现" link="/asidebar" dot>
                <i slot="icon" class="demo-icons-discover"></i>
            </yd-tabbar-item>
            <yd-tabbar-item title="我" link="/asidebar">
                <i slot="icon" class="demo-icons-me"></i>
            </yd-tabbar-item>
            <yd-tabbar-item title="图片" link="/asidebar">
                <img slot="icon" src="http://static.ydcss.com/ydui/img/logo.png" />
            </yd-tabbar-item>
        </yd-tabbar>

    </yd-layout>
</template>
