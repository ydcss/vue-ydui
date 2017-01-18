<template>
    <yd-layout title="Grids">

        <yd-grids-group :rows="2" title="等分2列(带图标)">
            <yd-grids-item>
                <img slot="icon" src="http://static.ydcss.com/ydui/img/logo.png">
                <span slot="text">image</span>
            </yd-grids-item>
            <yd-grids-item>
                <i slot="icon" class="demo-icons-cell"></i>
                <span slot="text">iconfont</span>
            </yd-grids-item>
        </yd-grids-group>

        <yd-grids-group :rows="3" title="等分3列">
            <yd-grids-item v-for="n in 6">
                <span slot="text">grids-3</span>
            </yd-grids-item>
        </yd-grids-group>

        <yd-grids-group rows="4" title="等分4列">
            <yd-grids-item v-for="n in 8">
                <span slot="text">grids-4</span>
            </yd-grids-item>
        </yd-grids-group>

        <yd-grids-group :rows="5" title="等分5列">
            <yd-grids-item v-for="n in 5">
                <span slot="text">grids-5</span>
            </yd-grids-item>
        </yd-grids-group>

    </yd-layout>
</template>
