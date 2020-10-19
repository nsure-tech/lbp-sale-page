<template>
    <div class="wap">
        <h2>TOKEN ALLOCATION</h2>

        <div class="box">
            <div id="ladderDiagram"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class LadderDiagram extends Vue {
        private options: any = {
            tooltip: {
                trigger: "axis"
            },
            grid:{
                x:35,
                y:100,
                x2:35,
                y2:60,
                bottom:'8%',
                left:"5%",
                right:'3%',

                borderWidth:1
            },


            legend: {
                top: "20px",
            },

            xAxis: {
                type: "category",
                boundaryGap: false,
                data: ["2020Q3", "2020Q4", "2021Q1", "2021Q2", "2021Q3", "2021Q4", "2022Q1", "2022Q2", "2022Q3", "2022Q4", "2023Q1"],

            },
            yAxis: {
                type: "value",
                axisLabel: {
                    formatter: (value, idx) => {
                        return (value/1000000) + 'Kw';
                    }
                },
            },
            series: [
                {
                    name: "capital mining",
                    type: "line",
                    symbol: "circle",
                    stack: "todo",
                    areaStyle: {
                        normal: {
                            // opacity: "0.4",
                        }
                    },
                    data: [0, 0, 1030000, 2060000, 4140000, 5170000, 6200000, 7230000, 8260000, 9290000, 10320000,]
                },
                {
                    name: "marketing&operation",
                    type: "line",
                    stack: "todo",

                    symbol: "circle",
                    areaStyle: {
                        normal: {
                            // opacity: ".4",
                        }
                    },
                    data: [2000000, 2000000, 4000000, 4000000, 4000000, 8000000, 8000000, 8000000, 10000000, 10000000, 10000000
                    ]
                },
                {
                    name: "team",
                    type: "line",
                    symbol: "circle",
                    stack: "todo",

                    areaStyle: {
                        normal: {
                            // opacity: ".4",
                        }
                    },
                    data: [0, 0, 1500000, 1500000, 3000000, 3000000, 4500000, 4500000, 6000000, 6000000, 6000000]
                },
                {
                    name: "seed",
                    type: "line",
                    stack: "todo",

                    symbol: "circle",
                    areaStyle: {
                        normal: {
                            // opacity: ".4",
                        }
                    },
                    data: [200000, 400000, 600000, 800000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000]
                },

                {
                    name: "private sale",
                    type: "line",
                    stack: "todo",

                    symbol: "circle",
                    areaStyle: {
                        normal: {
                            // opacity: ".4",
                        }
                    },
                    data: [2800000, 5600000, 8400000, 11200000, 14000000, 14000000, 14000000, 14000000, 14000000, 14000000, 14000000]
                },

                {
                    name: "public sale",
                    type: "line",
                    stack: "todo",

                    symbol: "circle",
                    areaStyle: {
                        normal: {
                            // opacity: ".4",
                        }
                    },
                    data: [4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000]
                },

            ]
        };

        public $echarts: any;

        private chart: any;


        public created() {
            if (document.body.clientWidth < 768) {
                this.options.grid.left = "14%";
            }
        }

        public mounted() {
            let ele: any = document.getElementById("ladderDiagram");

            this.chart = this.$echarts.init(ele);
            this.chart.setOption(this.options);

        }
    }
</script>

<style lang="scss" scoped>
    .wap {
        margin: 0 auto;

        h2 {
            font-size: 30px;
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

            #ladderDiagram {
                height: 700px;
                min-height: 400Px;
                width: 1793px;
            }
        }
    }
</style>
