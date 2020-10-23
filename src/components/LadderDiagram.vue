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

        private startDate: Date = new Date("2020/09/01");
        private dateList: Array<Date> = [];
        private legendList: Array<String> = [];
        private listInt: Array<{ name: string, list: Array<number> }> = [


            {
                name: "public sale",
                list: [200000, 200000, 200000, 400000, 400000, 400000, 600000, 600000, 600000, 800000, 800000, 800000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000, 1000000],
            },
            {
                name: "marketing&operation",
                list: [0, 0, 0, 0, 0, 0, 1500000, 1500000, 1500000, 1500000, 1500000, 1500000, 3000000, 3000000, 3000000, 3000000, 3000000, 3000000, 4500000, 4500000, 4500000, 4500000, 4500000, 4500000, 6000000, 6000000, 6000000, 6000000, 6000000, 6000000, 6000000, 6000000, 6000000],
            },
            {
                name: "team",
                list: [4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000],
            },
            {
                name: "seed",
                list: [2800000, 2800000, 2800000, 5600000, 5600000, 5600000, 8400000, 8400000, 8400000, 11200000, 11200000, 11200000, 14000000, 14000000, 14000000, 14000000, 14000000, 14000000, 14000000, 14000000, 14000000, 14000000, 14000000, 14000000, 14000000, 14000000, 14000000, 14000000, 14000000, 14000000, 14000000, 14000000, 14000000],
            },
            {
                name: "private sale",
                list: [2000000, 2000000, 2000000, 2000000, 2000000, 2000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 4000000, 8000000, 8000000, 8000000, 8000000, 8000000, 8000000, 8000000, 8000000, 8000000, 10000000, 10000000, 10000000, 10000000, 10000000, 10000000, 10000000, 10000000, 10000000],
            },
            {
                name: "capital mining",
                list: [0, 0, 0, 0, 345600, 691200, 1036800, 1382400, 1728000, 2073600, 2419200, 2764800, 3110400, 3456000, 3801600, 4147200, 4492800, 4838400, 5184000, 5529600, 5875200, 6220800, 6566400, 6912000, 7257600, 7603200, 7948800, 8294400, 8640000, 8985600, 9331200, 9676800, 10022400],
            },

        ];
        private options: any = {
            tooltip: {
                trigger: "axis",
                formatter: this.formatterFn ,
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
                data: this.legendList
            },

            xAxis: {
                type: "category",
                data: this.dateList,
                axisLabel: {
                    formatter: (value, idx) => {
                        let _date = new Date(value);
                        return idx == 0 ? "TGE" : [_date.getFullYear(), _date.getMonth() + 1].join("-");
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
            series: []
        };

        public $echarts: any;

        private chart: any;


        public created() {
            if (document.body.clientWidth < 768) {
                this.options.grid.left = "14%";
            }
            for (let i = 0; i < 33; i++) {
                this.startDate.setMonth(this.startDate.getMonth() + 1);
                this.dateList.push(new Date(this.startDate.valueOf()));
            }
            this.listInt.map((ev) => {
                this.legendList.push(ev.name);
                this.options.series.push({
                    name: ev.name,
                    type: "line",
                    stack: "todo",

                    areaStyle: {
                        normal: {}
                    },
                    data: ev.list
                });
            });
            this.legendList.reverse();

        }

        public mounted() {
            let ele: any = document.getElementById("ladderDiagram");

            this.chart = this.$echarts.init(ele);
            this.chart.setOption(this.options);

        }


        public  formatterFn(params) {
            let htmlStr = "";
            for (let i = params.length -1; i >= 0; i--) {
                let param = params[i];
                let xName = param.name;//x轴的名称
                let seriesName = param.seriesName;//图例名称
                let value = param.value;//y轴值
                let color = param.color;//图例颜色

                if (i === 5) {
                    htmlStr += xName + "<br/>";//x轴的名称
                }
                htmlStr += "<div style='text-align: start'>";
                //为了保证和原来的效果一样，这里自己实现了一个点的效果
                htmlStr += "<span style=\"margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:" + color + ";\"></span>";

                // 文本颜色设置--2020-07-23(需要设置,请解注释下面一行)
                //htmlStr += '<span style="color:'+color+'">';

                //圆点后面显示的文本
                htmlStr += seriesName + "：" + value;

                // 文本颜色设置--2020-07-23(需要设置,请解注释下面一行)
                //htmlStr += '</span>';

                htmlStr += "</div>";
            }
            return htmlStr;
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
