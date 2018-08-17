<template>
    <yd-layout title="Button">
        <yd-button-group class="demo-pitch">

            <yd-button type="primary" size="mini">mini</yd-button>
            <yd-button type="primary" size="mini" loading>mini</yd-button>
            <yd-button type="danger" size="mini">mini</yd-button>
            <yd-button type="warning" size="mini">mini</yd-button>
            <yd-button type="hollow" size="mini">mini</yd-button>

            <div style="height: .5rem;"></div>

            <yd-button type="primary">primary</yd-button>
            <yd-button type="primary" loading>loading</yd-button>
            <yd-button type="danger">danger</yd-button>
            <yd-button type="warning">warning</yd-button>
            <yd-button type="hollow">hollow</yd-button>

            <yd-button size="large" type="primary">primary</yd-button>
            <yd-button size="large" type="primary" loading loading-txt="缓慢提交中...">loading</yd-button>
            <yd-button size="large" type="danger">danger</yd-button>
            <yd-button size="large" type="warning">warning</yd-button>
            <yd-button size="large" type="disabled" disabled>disabled</yd-button>
            <yd-button size="large" type="hollow">hollow</yd-button>

            <yd-button size="large" type="primary" shape="circle">shape="circle"</yd-button>
            <yd-button size="large" type="primary" shape="angle">shape="angle"</yd-button>
            <yd-button size="large" type="hollow" shape="circle">shape="circle"</yd-button>
            <yd-button size="large" type="hollow" shape="angle">shape="angle"</yd-button>

        </yd-button-group>

    </yd-layout>
</template>
