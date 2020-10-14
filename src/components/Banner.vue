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

        private date_ = "";
        private currentPrice = 0;

        private dataList: Array<any> = [];
        private startList: Array<any> = [];

        private now = +new Date(2020, 10, 13);
        private oneDay = 3600 * 100;
        public $echarts: any;
        private options = {
            tooltip: {
                trigger: "axis",
                formatter: (params) => {
                    params = params[0].data;
                    let date = new Date(params.name);
                    if(this.startList[0].name < params.name){
                        return ;
                    }
                    return params.value[1] + " <br/> " + date.getDate() + "/" + (date.getHours() + 1) + "/" + date.getMinutes();
                },
                axisPointer: {
                    animation: false
                }
            },
            xAxis: {
                type: "time",
                data: this.dataList.map((item) => {
                    return item.date;
                }),
                axisLabel: {
                    formatter: (value, idx) => {
                        let date = new Date(value);
                        return [date.getMonth(), date.getDate()].join("-");
                    }
                },
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
                boundaryGap: [0, "100%"],
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
                    data: this.dataList,
                    smooth: true,
                    lineStyle: {
                        color: "red",
                        width: 1
                    },
                    markLine: {
                        symbol: ["none", "none"],
                    },
                },
                {

                    type: "line",
                    showSymbol: false,
                    hoverAnimation: false,
                    data: this.startList,
                    // smooth: false,
                    smooth: true,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 2,
                                type: "dotted"  //'dotted'虚线 'solid'实线
                            }
                        }
                    },

                    lineStyle: {
                        color: "#fff",
                        width: 1
                    },
                    markLine: {
                        symbol: ["none", "none"],
                    },
                },
            ]
        };

        private chart: any;


        public mounted() {
            const ele = document.getElementById("myEcharts");
            this.chart = this.$echarts.init(ele);
            for (let i = 0; i < 240; i++) {
                this.dataList.push(this.randomData(0.00001));
            }
            this.getPrice();
            this.countdown();
            this.getCurrentPrice();
        }


        async getCurrentPrice() {
            let data = await ApiServer.getCurrentPrice();
            let spot = await ApiServer.spot();
            this.currentPrice = data.price * spot.data.amount;

        }


        countdown() {
            // 目标日期时间戳
            const end = Date.parse("2020-10-16");
            const now = Date.parse(new Date().toString());
            const msec: any = end - now;
            let day: any = parseInt(msec / 1000 / 60 / 60 / 24);
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
                this.dataList.push(this.randomData(ev.price));
            });

            this.endListFu();
            this.chart.setOption(this.options);
        }


        endListFu() {
            let _length:number = 1200 - this.dataList.length;
            let _tmpPrice:number = this.dataList[this.dataList.length - 1].value[1];
            this.startList.push(this.randomData(_tmpPrice),);

            const factor = 0.995;
            for (let i = 0; i < _length; i++) {
                this.startList.push(this.randomData( _tmpPrice));
                _tmpPrice = _tmpPrice*factor;
            }

        }


        randomData(ev: number) {
            this.now = new Date(+this.now + this.oneDay).valueOf();
            return {
                name: this.now,
                value: [
                    this.now,
                    ev
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

                    h4 {
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
