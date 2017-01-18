<template>
    <yd-layout title="Badge">
        <aside class="demo-tip">
            <p>badge包含默认圆形样式和方形样式</p>
            <p>五中颜色：default/primary/danger/warning/hollow</p>
        </aside>

        <div class="demo-badege">
            <div class="demo-badege-title">圆形角标：</div>
            <div class="demo-small-pitch">
                <yd-badge>1</yd-badge>
                <yd-badge type="primary">2</yd-badge>
                <yd-badge type="danger">3</yd-badge>
                <yd-badge type="warning">4</yd-badge>
                <yd-badge type="hollow">5</yd-badge>
            </div>

            <div class="demo-small-pitch">
                <yd-badge>123</yd-badge>
                <yd-badge type="primary">321</yd-badge>
                <yd-badge type="danger">333</yd-badge>
                <yd-badge type="warning">4444</yd-badge>
                <yd-badge type="hollow">55555</yd-badge>
                <yd-badge bgcolor="#000" color="#FFF">custom color</yd-badge>
            </div>

            <div class="demo-badege-title">方形角标：</div>
            <div class="demo-small-pitch">
                <yd-badge-radius>1</yd-badge-radius>
                <yd-badge-radius type="primary">2</yd-badge-radius>
                <yd-badge-radius type="danger">3</yd-badge-radius>
                <yd-badge-radius type="warning">4</yd-badge-radius>
                <yd-badge-radius type="hollow">5</yd-badge-radius>
            </div>

            <div class="demo-small-pitch">
                <yd-badge-radius>123</yd-badge-radius>
                <yd-badge-radius type="primary">321</yd-badge-radius>
                <yd-badge-radius type="danger">333</yd-badge-radius>
                <yd-badge-radius type="warning">4444</yd-badge-radius>
                <yd-badge-radius type="hollow">55555</yd-badge-radius>
                <yd-badge-radius bgcolor="#000" color="#FFF">custom color</yd-badge-radius>
            </div>

        </div>

    </yd-layout>
</template>
