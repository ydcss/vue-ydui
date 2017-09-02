<template>
    <yd-layout title="Step">

        <yd-step current="2" class="demo-pitch">
            <yd-step-item>
                <span slot="bottom">步骤一</span>
            </yd-step-item>
            <yd-step-item>
                <span slot="bottom">步骤二</span>
            </yd-step-item>
            <yd-step-item>
                <span slot="bottom">步骤三</span>
            </yd-step-item>
            <yd-step-item>
                <span slot="bottom">步骤四</span>
            </yd-step-item>
        </yd-step>

        <yd-step theme="2" current="3" class="demo-pitch">
            <yd-step-item>
                <span slot="top">已发货</span>
                <span slot="bottom">扬州市</span>
            </yd-step-item>
            <yd-step-item>
                <span slot="top">运输中</span>
            </yd-step-item>
            <yd-step-item>
                <span slot="top">派件中</span>
            </yd-step-item>
            <yd-step-item>
                <span slot="top">已签收</span>
                <span slot="bottom">南宁市</span>
            </yd-step-item>
        </yd-step>

    </yd-layout>
</template>
