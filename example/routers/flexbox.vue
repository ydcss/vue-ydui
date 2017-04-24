<template>
    <yd-layout title="FlexBox">
        <div style="padding: 0 .12rem;">
            <h2 class="demo-flexbox-title">Horizontal</h2>
            <yd-flexbox class="demo-flexbox">
                <yd-flexbox-item>
                    <div class="demo-flexbox-text">&lt;yd-flexbox-item&gt;</div>
                </yd-flexbox-item>
                <yd-flexbox-item>
                    <div class="demo-flexbox-text">&lt;yd-flexbox-item&gt;</div>
                </yd-flexbox-item>
            </yd-flexbox>
            <yd-flexbox class="demo-flexbox">
                <yd-flexbox-item>
                    <div class="demo-flexbox-text">&lt;yd-flexbox-item&gt;</div>
                </yd-flexbox-item>
                <yd-flexbox-item>
                    <div class="demo-flexbox-text">&lt;yd-flexbox-item&gt;</div>
                </yd-flexbox-item>
                <yd-flexbox-item>
                    <div class="demo-flexbox-text">&lt;yd-flexbox-item&gt;</div>
                </yd-flexbox-item>
            </yd-flexbox>
            <yd-flexbox class="demo-flexbox">
                <div class="demo-flexbox-text" style="background-color:#BBB;">&lt;div&gt;</div>
                <yd-flexbox-item>
                    <div class="demo-flexbox-text">&lt;yd-flexbox-item&gt;</div>
                </yd-flexbox-item>
            </yd-flexbox>
            <yd-flexbox class="demo-flexbox">
                <div class="demo-flexbox-text" style="background-color:#BBB;">&lt;div&gt;</div>
                <yd-flexbox-item>
                    <div class="demo-flexbox-text">&lt;yd-flexbox-item&gt;</div>
                </yd-flexbox-item>
                <div class="demo-flexbox-text" style="background-color:#BBB;">&lt;div&gt;</div>
            </yd-flexbox>

            <h2 class="demo-flexbox-title">Vertical</h2>
            <yd-flexbox direction="vertical" class="demo-flexbox">
                <yd-flexbox-item style="margin-bottom: 8px;">
                    <div class="demo-flexbox-text">&lt;yd-flexbox-item&gt;</div>
                </yd-flexbox-item>
                <yd-flexbox-item style="margin-bottom: 8px;">
                    <div class="demo-flexbox-text">&lt;yd-flexbox-item&gt;</div>
                </yd-flexbox-item>
                <yd-flexbox-item>
                    <div class="demo-flexbox-text">&lt;yd-flexbox-item&gt;</div>
                </yd-flexbox-item>
            </yd-flexbox>

            <div style="height: 300px;">
                <yd-flexbox direction="vertical" class="demo-flexbox">
                    <div class="demo-flexbox-text" style="width: 100%;background-color:#BBB;margin-bottom: 8px;">&lt;div&gt;</div>
                    <yd-flexbox-item style="margin-bottom: 8px;background-color:#DCDCDC;">
                        <div class="demo-flexbox-text">&lt;yd-flexbox-item&gt;</div>
                    </yd-flexbox-item>
                    <div class="demo-flexbox-text" style="width: 100%;background-color:#BBB;">&lt;div&gt;</div>
                </yd-flexbox>
            </div>
        </div>
    </yd-layout>
</template>
