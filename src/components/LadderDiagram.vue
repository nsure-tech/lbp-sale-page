<template>
    <div class="wap padding20">
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

        private  startDate:Date = new  Date('2020/09/01');
        private dateList:Array<Date> = [

        ];
        private listInt: Array<{ name: string, list: Array<number> }> = [
            {
                name: "capital mining",
                list: [0, 0, 0, 0, 345600, 691200, 1036800, 1382400, 1728000, 2073600, 2419200, 2764800, 3110400, 3456000, 3801600, 4147200, 4492800, 4838400, 5184000, 5529600, 5875200, 6220800, 6566400, 6912000, 7257600, 7603200, 7948800, 8294400, 8640000, 8985600, 9331200, 9676800, 10022400],
            },
            {
                name: "marketing&operation",
                list: [0,0,0,0,0,0,1500000,1500000,1500000,1500000,1500000,1500000,3000000,3000000,3000000,3000000,3000000,3000000,4500000,4500000,4500000,4500000,4500000,4500000,6000000,6000000,6000000,6000000,6000000,6000000,6000000,6000000,6000000],
            },
            {
                name: "team",
                list: [4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000],
            },
            {
                name: "seed",
                list: [2800000,2800000,2800000,5600000,5600000,5600000,8400000,8400000,8400000,11200000,11200000,11200000,14000000,14000000,14000000,14000000,14000000,14000000,14000000,14000000,14000000,14000000,14000000,14000000,14000000,14000000,14000000,14000000,14000000,14000000,14000000,14000000,14000000],
            },
            {
                name: "private sale",
                list: [2000000,2000000,2000000,2000000,2000000,2000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,4000000,8000000,8000000,8000000,8000000,8000000,8000000,8000000,8000000,8000000,10000000,10000000,10000000,10000000,10000000,10000000,10000000,10000000,10000000],
            },
            {
                name: "public sale",
                list: [200000,200000,200000,400000,400000,400000,600000,600000,600000,800000,800000,800000,1000000,1000000,1000000,1000000,1000000,1000000,1000000,1000000,1000000,1000000,1000000,1000000,1000000,1000000,1000000,1000000,1000000,1000000,1000000,1000000,1000000],
            },
        ];
        private options: any = {
            tooltip: {
                trigger: "axis"
            },
            grid: {
                x: 35,
                y: 100,
                x2: 35,
                y2: 60,
                bottom: "8%",
                left: "5%",
                right: "3%",

                borderWidth: 1
            },


            legend: {
                top: "20px",
            },

            xAxis: {
                type: "category",
                data: this.dateList,
                axisLabel: {
                    formatter: (value, idx) => {
                        let _date = new Date(value);
                         return idx == 0 ? 'TGE' :[_date.getFullYear() ,_date.getMonth() + 1].join('-');
                    }
                },
                splitLine: {
                    show: false
                },
                boundaryGap: false,

            },
            yAxis: {
                type: "value",
                axisLabel: {
                    formatter: (value, idx) => {
                        return (value / 1000000) + "M";
                    }
                },
            },
            series: [

            ]
        };

        public $echarts: any;

        private chart: any;


        public created() {
            if (document.body.clientWidth < 768) {
                this.options.grid.left = "14%";
            }
            for(let i = 0;i<33;i++){
                this.startDate.setMonth(this.startDate.getMonth() +1);
                this.dateList.push(new Date(this.startDate.valueOf()));
            }
            this.listInt.map((ev) => {

                this.options.series.push({
                    name: ev.name,
                    type: "line",
                    symbol: "circle",
                    stack: "todo",

                    areaStyle: {
                        normal: {}
                    },
                    data: ev.list
                });
            });
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
        background-color: white;
        /*max-width: 900px;*/
        margin: 0 auto;
        padding-top: 30px;
        padding-bottom: 30px;

        h2 {
            font-size: 30px;
            font-weight: bold;
            text-align: left;
            margin-bottom: 20px;
            padding-left: 5%;
            color: #2F8FE9;
            @include respond-to(xs) {
                text-align: center;
            }


        }

        .box {
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;

            #ladderDiagram {
                height: 500px;
                min-height: 400Px;
                width: 1793px;
                @include respond-to(xs) {
                    height: 450px;
                }
            }
        }
    }
</style>
