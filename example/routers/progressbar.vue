<template>
    <yd-layout title="ProgressBar">
        <div class="demo-progressbar demo-pitch">
            <div class="demo-progress-cricle">
                <!-- 代码部分start -->
                <yd-progressbar :progress="progress1" trailWidth="4">
                    <yd-countup
                            :endnum="progress1 * 100"
                            duration="1"
                            suffix="%"
                    ></yd-countup>
                </yd-progressbar>
                <!-- 代码部分end -->
            </div>
            <div class="demo-progress-cricle">
                <!-- 代码部分start -->
                <yd-progressbar
                        :progress="progress2"
                        trailWidth="2"
                        strokeWidth="4"
                        strokeColor="#B2B2B2"
                        trailColor="#FE5D51"
                        fillColor="#FFF"
                >
                    <yd-countup
                            :endnum="progress2 * 100"
                            :duration="1"
                            suffix="%"
                    ></yd-countup>
                </yd-progressbar>
                <!-- 代码部分end -->
            </div>
        </div>
        <div class="demo-progressbar demo-pitch">
            <div class="demo-progress-line">
                <!-- 代码部分start -->
                <yd-progressbar type="line" :progress="progress3" trailWidth="4" trailColor="#FE5D51"></yd-progressbar>
                <!-- 代码部分end -->
            </div>
        </div>

        <yd-button-group>
            <yd-button size="large" type="hollow" @click.native="progress2 = 0.8">手动设置右圈为80%</yd-button>
        </yd-button-group>
    </yd-layout>
</template>

<script type="text/babel">
    export default {
        data() {
            return {
                progress1: 0.1,
                progress2: 0.4,
                progress3: 0.6
            }
        }
    }
</script>
