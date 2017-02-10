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
                <yd-badge shape="square">1</yd-badge>
                <yd-badge shape="square" type="primary">2</yd-badge>
                <yd-badge shape="square" type="danger">3</yd-badge>
                <yd-badge shape="square" type="warning">4</yd-badge>
                <yd-badge shape="square" type="hollow">5</yd-badge>
            </div>

            <div class="demo-small-pitch">
                <yd-badge shape="square">123</yd-badge>
                <yd-badge shape="square" type="primary">321</yd-badge>
                <yd-badge shape="square" type="danger">333</yd-badge>
                <yd-badge shape="square" type="warning">4444</yd-badge>
                <yd-badge shape="square" type="hollow">55555</yd-badge>
                <yd-badge shape="square" bgcolor="#000" color="#FFF">custom color</yd-badge>
            </div>

        </div>

    </yd-layout>
</template>
