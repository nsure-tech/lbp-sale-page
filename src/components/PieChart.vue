<template>
    <div class="wap">
        <h2>TOKEN ALLOCATION</h2>
        <div class="box">
            <div id="myEchartss" style="height: 400px;"></div>
        </div>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class PieChart extends Vue {
        private options:any = {
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {},

            series: [
                {
                    name: "a",
                    type: "pie",
                    radius: ["50%", "70%"],


                    center: ["40%", "55%"],
                    data: [
                        {value: 1, name: "Seed round"},
                        {value: 55, name: "Capital/Insurance Minning"},
                        {value: 14, name: "Private Sale"},
                        {value: 4, name: "Public Sale"},
                        {value: 10, name: "Foundation Reserve"},
                        {value: 10, name: "Marketing & Operations"},
                        {value: 6, name: "Team"},
                    ]
                }
            ],
        };

        public $echarts: any;

        private chart: any;


        public created() {
            if (document.body.clientWidth < 768) {

                this.options.series[0].center = ["50%", "65%"];
                this.options.series[0].label = {
                    show: false,
                    position: 'center'
                };

                this.options.series[0].emphasis = {
                    label: {
                        show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                    }
                };
                this.options.series[0].labelLine = {
                    show: false
                };
                this.options.tooltip = null;
            } else {
                this.options.legend = {
                    orient: "vertical",
                    top: "20px",
                    left: "70%",
                    data: ["Capital/Insurance Minning", "Seed round", "Private Sale", "Public Sale", "Foundation Reserve", "Marketing & Operations", "Team"]
                };
            }
        }

        public mounted() {
            let ele: any = document.getElementById("myEchartss");


            this.chart = this.$echarts.init(ele);
            this.chart.setOption(this.options);

        }

    }
</script>

<style lang="scss" scoped>
    .wap {
        /*max-width: 900px;*/
        margin: 0 auto;

        h2 {
            font-size: 52px;
            font-family: Arial;
            font-weight: bold;
            margin: 90px 0 40px 0;
            color: #F1F1EF;

        }

        .box {
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;

            #myEchartss {
                height: 400px;
                width:  1793px;
                /*width: 1793px;*/
                /*width: 300Px;*/
            }
        }
    }
</style>
