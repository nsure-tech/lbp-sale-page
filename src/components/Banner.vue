<template>
    <div class="wap">
        <h2>TITLe</h2>
        <h3>(dasdajsghdakjsgdhjagfhjgahjkdgfhdgfajhdgahgfhjd)</h3>
        <div class="charts">
            <div class="left">
                <div id="myEcharts" style="height: 400px;width: 600px;max-width: 600px;"></div>
                <h4>Access LBP on Balancer</h4>
            </div>
            <div class="right">
                <div>
                    <p>LBP Ends in</p>
                    <h4>{{date_}}</h4>
                </div>
                <div>
                    <p>Latest Price(USDE)</p>
                    <h4>{{currentPrice? currentPrice.toFixed(5):'---'}}</h4>
                </div>
                <div>
                    <p>Estimated Market cap at current price</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {ApiServer} from "@/request";

    @Component
    export default class Banner extends Vue {

        private date_ = '';
        private currentPrice = 0;

        private dataList: Array<any> = [];
        private now = +new Date(1997, 9, 3);
        private value = Math.random() * 1000;
        public $echarts: any;
        private options = {
            tooltip: {
                trigger: "axis",
                // formatter: (params) => {
                //     params = params[0].data;
                //     let date = new Date(params.name);
                //     return params.value[1] + " <br/> " + date.getDate() + "/" + (date.getHours() + 1) + "/" + date.getMinutes();
                // },
                axisPointer: {
                    animation: false
                }
            },
            xAxis: {
                type: "time",
                splitLine: {
                    show: false
                },
                // data: this.dataList.map( (item) =>{
                //     return item.date;
                // }),
                // axisLabel: {
                //     formatter: (value, idx) =>{
                //         let date = new Date(value);
                //         return idx === 0 ? value : [date.getMonth() + 1, date.getDate()].join('-');
                //     }
                // },
                splitLine: {
                    show: false
                },
                boundaryGap: false,
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    }
                },
            },
            yAxis: {
                type: "value",
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: "#fff"
                    }
                },
            },
            series: [
                {
                    type: "line",
                    showSymbol: false,
                    hoverAnimation: false,
                    data:[["2000-06-05",116],["2000-06-06",129],["2000-06-07",135]],
                    // data: this.dataList,
                    smooth: 0.6,
                    smooth: true,
                    lineStyle: {
                        color: 'red',
                        width: 1
                    },
                    markLine: {
                        symbol: ['none', 'none'],
                    },
                }
            ]
        };

        private chart: any;


        public mounted() {



            const ele = document.getElementById("myEcharts");
            this.chart = this.$echarts.init(ele);
            this.getPrice();
            this.countdown();

            this.getCurrentPrice();
        }

        async  getCurrentPrice(){
            let data = await  ApiServer.getCurrentPrice();
            let spot = await  ApiServer.spot();
            this.currentPrice = data.price * spot.data.amount;

        }


        countdown() {
            // 目标日期时间戳
            const end = Date.parse('2020-10-15');
            const now = Date.parse(new Date().toString());
            const msec = end - now;
            let day = parseInt(msec / 1000 / 60 / 60 / 24);
            let hr: any = parseInt(msec / 1000 / 60 / 60 % 24) + day * 24;
            let min: any = parseInt(msec / 1000 / 60 % 60);
            let sec: any = parseInt(msec / 1000 % 60);
            hr = hr > 9 ? hr : "0" + hr;
            min = min > 9 ? min : "0" + min;
            sec = sec > 9 ? sec : "0" + sec;
            this.date_ = `${hr}H ${min}m`;
            setTimeout(() => {
                this.countdown();
            }, 60000);
        }

        async getPrice() {
            let data: Array<any> = await ApiServer.getHistoryPrice();


            data.map((ev) => {
                this.dataList.push(this.randomData(ev.date, ev.price));
            });


            this.chart.setOption(this.options);
        }


        randomData(ev: number, price: number) {
            this.now = new Date(ev);
            return {
                name: this.now.toString(),
                value: [
                    ev,
                    price
                ]
            };
        }


    }
</script>

<style lang="scss" scoped>
    .wap {
        h3 {
            margin-bottom: 10px;
        }

        .charts {
            display: flex;
            justify-content: center;

            .left {
                width: 600px;
                background-color: #24303e;

                display: flex;
                flex-direction: column;
                align-items: center;

                h4 {
                    color: black;
                    background-color: #09c992;
                    border-radius: 10px;
                    padding: 10px;
                    margin-bottom: 20px;
                }
            }

            .right {
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                div {
                    width: 140px;
                    height: 140px;
                    background-color: #24303e;
                    padding: 10px;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    justify-items: center;

                    p {
                        font-size: 12px;
                        color: white;
                        font-weight: bold;
                    }

                    h4{
                        flex: 1;
                        display: flex;
                        justify-items: center;
                        align-items: center;
                        font-size: 14px;
                        color: white;
                        justify-content: center;
                    }

                }
            }
        }
    }
</style>
