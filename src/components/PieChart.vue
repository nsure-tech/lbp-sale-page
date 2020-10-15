<template>
    <div class="wap">
        <!--<div id="myEchartss" style="height: 400px;"></div>-->
        <div class="charts">
            <b-container class="bv-example-row ">
                <b-row>
                    <b-col>
                        <div id="myEchartss" style="height: 400px;width: 100px;"></div>
                    </b-col>
                </b-row>
            </b-container>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class PieChart extends Vue {
        private options = {
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                top: 'center',
                left: '65%',
                data: ["a", "b", "c", "d", "e", "f"]
            },

            series: [

                {
                    name: "a",
                    type: "pie",
                    radius: ["50%", "70%"],
                    avoidLabelOverlap: false,
                    center: ['30%', '50%'],
                    data: [
                        {value: 335, name: "b"},
                        {value: 310, name: "c"},
                        {value: 234, name: "d"},
                        {value: 135, name: "e"},
                        {value: 1548, name: "f"}
                    ]
                }
            ],
        };

        public $echarts: any;

        private chart: any;


        public created(){
            if(document.body.clientWidth < 768){
                this.options.legend = null;
                this.options.series[0].center = ['50%', '50%'];
            }
        }

        public mounted() {
            const ele = document.getElementById("myEchartss");
            ele.style.width = "100%";


            this.chart = this.$echarts.init(ele);
            this.chart.setOption(this.options);

        }

    }
</script>

<style lang="scss" scoped>
    .wap {
        max-width: 900px;
        background-color: white;
        margin: 0 auto;
    }
</style>
