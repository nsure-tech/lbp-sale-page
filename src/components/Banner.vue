<template>
    <div class="wap">
        <h2>Liquidity Bootstrapping Pool for Nsure</h2>

        <b-container class="bv-example-row echarts">
            <b-row class="justify-content-md-center">
                <b-col sm="10">
                    <div class="left">
                        <div id="myEcharts" style="height: 50vh;min-height:300px;width: 600px;max-width: 600px;"></div>
                        <a href="https://kovan.balancer.exchange/#/swap/0xd0A1E359811322d97991E03f863a0C30C2cF029C/0x92c94707fdc3fE9FCb0278c310911A0371752A20">Access
                            LBP on Balancer</a>
                    </div>

                </b-col>
                <b-col sm="2" class="d-none d-sm-block right-box">
                    <b-container style="height: 100%;" class="bv-example-row bv-example-row-flex-cols">
                        <b-row align-v="center" style="height: 100%;" align-content="between">
                            <b-col xs="3">
                                <div class="r_div">
                                    <p>LBP Ends in</p>
                                    <h4>{{date_}}</h4>
                                </div>
                            </b-col>
                            <b-col xs="3">
                                <div class="r_div">
                                    <p>Latest Price(USDE)</p>
                                    <h4>{{currentPrice? currentPrice.toFixed(5):'---'}}</h4>
                                </div>
                            </b-col>
                            <b-col xs="3">
                                <div class="r_div">
                                    <p>Estimated Market cap at current price</p>
                                </div>
                            </b-col>
                        </b-row>
                    </b-container>

                </b-col>
            </b-row>
        </b-container>

        <div class="bottom_bar d-block d-sm-none">
            <div class="box">
                <div class="child">
                    <p>LBP Ends in</p>
                    <h4>{{date_}}</h4>
                </div>
                <div class="child">
                    <p>Latest Price(USDE)</p>
                    <h4>{{currentPrice? currentPrice.toFixed(5):'---'}}</h4>
                </div>
                <div class="child">
                    <p>Estimated Market cap at current price</p>
                </div>
            </div>

        </div>
        <div class="bottom">
            <p>whitepaper</p>
            <p>NSURE LBP sheet</p>
            <p>MUST READ</p>
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
        private endList: Array<any> = [];

        private endDate;
        public $echarts: any;
        private options = {
            tooltip: {
                trigger: "axis",
                formatter: (params) => {
                    let data: any = params;
                    data = data[0].data;
                    let date = new Date(data.name);
                    if (this.endList[1].name < data.name) {
                        return;
                    }
                    return data.value[1] + " <br/> " + this.dateFmt(date);
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
                        return [date.getMonth() + 1, date.getDate()].join("-");
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
                    data: this.endList,
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
            this.init();
        }

        async init() {
            let ele: any = document.getElementById("myEcharts");
            ele.style.width = "100%";

            this.chart = this.$echarts.init(ele);

            await this.getPrice();
            this.countdown();
            this.getCurrentPrice();

            setInterval(async () => {
                this.getCurrentPrice();
                this.endList[0] = this.dataList[this.dataList.length - 1];
                this.chart.setOption(this.options);
            }, 10000,);
        }


        async getCurrentPrice() {
            let _data = await ApiServer.getCurrentPrice();
            let _spot = await ApiServer.spot();
            this.currentPrice = _data.price * _spot.data.amount;
            this.dataList.push(this.randomData(_data.price, this.dataList[this.dataList.length - 1].value[0] + 10000,),);

        }



        countdown() {
            // 目标日期时间戳
            const end = this.endDate;
            const now = Date.parse(new Date().toString());
            const msec: any = end - now;
            let day: any = parseInt((msec / 1000 / 60 / 60 / 24).toString());
            let hr: any = parseInt((msec / 1000 / 60 / 60 % 24).toString()) + day * 24;
            let min: any = parseInt((msec / 1000 / 60 % 60).toString());
            let sec: any = parseInt((msec / 1000 % 60).toString());
            hr = hr > 9 ? hr : "0" + hr;
            min = min > 9 ? min : "0" + min;
            sec = sec > 9 ? sec : "0" + sec;
            this.date_ = `${hr}H ${min}m`;
            setTimeout(() => {
                this.countdown();
            }, 60000);
        }


        dateFmt(date: Date) {
            let
                month = "" + (date.getMonth() + 1),
                day = "" + date.getDate(),
                h = "" + date.getHours(),
                m = "" + date.getMinutes(),
                s = "" + date.getSeconds();
            if (month.length < 2) {
                month = "0" + month;
            }
            if (day.length < 2) {
                day = "0" + day;
            }
            if (h.length < 2) {
                h = "0" + h;
            }
            if (m.length < 2) {
                m = "0" + m;
            }
            if (s.length < 2) {
                s = "0" + s;
            }
            return [month, day].join("-") + "  " + [h, m, s].join(":");
        };


        async getPrice() {
            let data: Array<any> = await ApiServer.getHistoryPrice();
            data.map((ev) => {
                this.dataList.push(this.randomData(ev.price, ev.date));
            });
            this.endDate = new Date(data[0].date+ 200000  + 86400000 * 3 );
            this.endListFu();
            this.chart.setOption(this.options);
        }


        endListFu() {
            let _date = this.dataList[this.dataList.length - 1].value[0];
            let _tmpPrice: number = this.dataList[this.dataList.length - 1].value[1];
            const _factor = 0.995;
            let _scale:number = (this.endDate.valueOf() - _date) /500;

            for (let i = 0; i < 500; i++) {
                this.endList.push(this.randomData(_tmpPrice, _date + i * _scale),);
                _tmpPrice = _tmpPrice * _factor;
            }


        }


        randomData(ev: number, date: any) {
            let now = new Date(date).valueOf();
            return {
                name: now,
                value: [
                    now,
                    ev
                ]
            };
        }
    }
</script>

<style lang="scss" scoped>
    .col {
        padding: 0;
    }

    .wap {
        height: 90vh;
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        h2 {
            font-size: 2rem;
            font-family: Arial;
            font-weight: bold;
            color: #F1F1EF;
            text-align: center;

        }

        .echarts {
            height: 60vh;

            .left {
                background-color: #243142;
                padding-bottom: 20px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                align-items: center;

                a {
                    display: block;
                    background-color: #09c992;
                    border-radius: 10px;
                    padding: 10px;
                    width: 300px;
                    margin: 0 auto;
                    height: 50px;
                    line-height: 30px;

                    font-size: 1rem;
                    font-family: Arial;
                    font-weight: bold;
                    color: #1B2532;
                    text-align: center;

                }
            }

            .right-box {

                .r_div {
                    width: 140px;
                    height: 16vh;
                    background-color: #24303e;
                    padding: 10px;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    justify-items: center;

                    p {
                        font-weight: bold;
                        font-size: 0.5rem;
                        font-family: Arial;
                        color: #F1F1EF;

                    }

                    h4 {
                        flex: 1;
                        display: flex;
                        justify-items: center;
                        align-items: center;
                        justify-content: center;

                        font-size: 0.5rem;
                        font-family: Arial;
                        font-weight: bold;
                        color: #F1F1EF;
                    }

                }

            }
        }


        .bottom_bar {
            .box {
                display: flex;
                justify-content: space-around;
            }

            padding: 20px 0;

            .child {
                width: 29%;
                height: 80px;
                padding: 10px;
                box-sizing: border-box;
                background-color: #24303e;

                p {
                    font-size: 12px;
                    color: white;
                    font-weight: bold;
                    margin: 0;
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

        .bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;

            p {
                width: 30%;
                height: 60px;
                margin: 0;
                text-align: center;
                line-height: 60px;
                border: 3px solid #57F9AF;
                border-radius: 64px;
                font-size: 1rem;
                font-family: Arial;
                font-weight: bold;
                color: #57F9AF;
            }
        }
    }
</style>
