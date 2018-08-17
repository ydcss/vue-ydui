<template>
    <yd-layout>
        <yd-navbar slot="navbar" title="TabBar">
            <router-link to="/asidebar" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

        <yd-tabbar class="demo-small-pitch">
            <yd-tabbar-item title="微信" link="tabbar" active>
                <i slot="icon" class="demo-icons-weixin"></i>
            </yd-tabbar-item>
            <yd-tabbar-item title="通讯录" link="/asidebar">
                <i slot="icon" class="demo-icons-contact"></i>
            </yd-tabbar-item>
            <yd-tabbar-item title="发现" link="/asidebar">
                <i slot="icon" class="demo-icons-discover"></i>
            </yd-tabbar-item>
            <yd-tabbar-item title="我" link="/asidebar">
                <i slot="icon" class="demo-icons-me"></i>
            </yd-tabbar-item>
        </yd-tabbar>

        <yd-tabbar class="demo-small-pitch" padding="4px" active-color="#EE651C">
            <yd-tabbar-item title="" link="/asidebar">
                <img slot="icon" style="height: .7rem;" src="http://static.ydcss.com/ydui/img/taobao.png"/>
            </yd-tabbar-item>
            <yd-tabbar-item title="微淘" link="/asidebar" active>
                <yd-icon name="discount" slot="icon" size=".36rem"></yd-icon>
            </yd-tabbar-item>
            <yd-tabbar-item title="消息" link="/asidebar" dot>
                <yd-icon name="time" slot="icon" size=".36rem"></yd-icon>
            </yd-tabbar-item>
            <yd-tabbar-item title="购物车" link="/asidebar">
                <yd-icon name="shopcart-outline" slot="icon" size=".36rem"></yd-icon>
            </yd-tabbar-item>
            <yd-tabbar-item title="我的淘宝" link="/asidebar">
                <yd-icon name="ucenter-outline" slot="icon" size=".36rem"></yd-icon>
            </yd-tabbar-item>
        </yd-tabbar>

        <yd-tabbar class="demo-small-pitch" padding="0">
            <yd-tabbar-other>
                <img style="height: .86rem;" src="http://static.ydcss.com/ydui/img/ydcss.jpg"/>
            </yd-tabbar-other>
            <yd-tabbar-item title="购物车" link="/asidebar">
                <yd-icon name="shopcart-outline" slot="icon" size=".36rem"></yd-icon>
            </yd-tabbar-item>
            <yd-tabbar-item title="收藏" link="/asidebar">
                <yd-icon name="star-outline" slot="icon" size=".36rem"></yd-icon>
            </yd-tabbar-item>
            <yd-tabbar-item title="我的" link="/asidebar">
                <yd-icon name="ucenter-outline" slot="icon" size=".36rem"></yd-icon>
            </yd-tabbar-item>
        </yd-tabbar>

        <yd-tabbar class="demo-small-pitch" border-color="#337EF6" bgcolor="#FCCECD">
            <yd-tabbar-item title="Props" link="/asidebar">
                <yd-icon name="time" slot="icon" size=".36rem"></yd-icon>
            </yd-tabbar-item>
            <yd-tabbar-item title="轻松修改" link="/asidebar">
                <yd-icon name="star-outline" slot="icon" size=".36rem"></yd-icon>
            </yd-tabbar-item>
            <yd-tabbar-item title="边框颜色" link="/asidebar">
                <yd-icon name="ucenter-outline" slot="icon" size=".36rem"></yd-icon>
            </yd-tabbar-item>
        </yd-tabbar>

        <yd-tabbar slot="tabbar">
            <yd-tabbar-item title="首页" link="/tabbar" active>
                <yd-icon name="home" slot="icon" size=".36rem"></yd-icon>
                <yd-badge slot="badge" type="danger" scale=".6">2</yd-badge>
            </yd-tabbar-item>
            <yd-tabbar-item title="购物车" link="/asidebar">
                <yd-icon name="shopcart-outline" slot="icon" size=".36rem"></yd-icon>
            </yd-tabbar-item>
            <yd-tabbar-item title="收藏" link="/asidebar">
                <yd-icon name="star-outline" slot="icon" size=".36rem"></yd-icon>
            </yd-tabbar-item>
            <yd-tabbar-item title="我的" link="/asidebar" dot>
                <yd-icon name="ucenter-outline" slot="icon" size=".36rem"></yd-icon>
            </yd-tabbar-item>
        </yd-tabbar>

    </yd-layout>
</template>
