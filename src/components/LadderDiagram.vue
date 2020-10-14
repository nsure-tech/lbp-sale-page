<template>
    <div class="wap">
        <div class="charts">
            <div id="ladderDiagram" style="height: 500px;width: 900px;max-width: 900px;"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class LadderDiagram extends Vue {
        private options = {
            tooltip: {
                trigger: "axis"
            },

            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
            },
            legend: {


                // data: ['西凉', '益州', '兖州', '荆州', '幽州']
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
            },
            yAxis: {
                type: "value"
            },
            series: [
                {
                    name: "邮件营销",
                    type: "line",
                    stack: "总量",
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: "联盟广告",
                    type: "line",
                    stack: "总量",
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: "视频广告",
                    type: "line",
                    stack: "总量",
                    data: [150, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: "直接访问",
                    type: "line",
                    stack: "总量",
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: "搜索引擎",
                    type: "line",
                    stack: "总量",
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
                }
            ]
        };

        public $echarts: any;

        private chart: any;


        public mounted() {
            const ele = document.getElementById("ladderDiagram");
            this.chart = this.$echarts.init(ele);
            this.chart.setOption(this.options);

        }
    }
</script>

<style lang="scss" scoped>
    .wap {
        width: 900px;
        margin: 0 auto;
        background-color: white;
    }
</style>
