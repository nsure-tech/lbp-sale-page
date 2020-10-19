<template>
    <div class="wap">
        <h2>Liquidity Bootstrapping Pool for Nsure</h2>

        <el-row class="echarts" :gutter="24" type="flex">
            <el-col :sm="19">
                <div class="left">
                    <span href=""> </span>
                    <div id="myEcharts" style="min-height:300px;"></div>
                    <a target="_Blank"
                       href="https://kovan.balancer.exchange/#/swap/0xd0A1E359811322d97991E03f863a0C30C2cF029C/0x92c94707fdc3fE9FCb0278c310911A0371752A20">Access
                        LBP on Balancer</a>
                </div>
            </el-col>

            <el-col :sm="4" class="hidden-xs-only">
                <el-row type="flex" style="height: 100%" class="echarts_right">
                    <div class="r_div">
                        <p>LBP Ends in</p>
                        <h4>{{date_}}</h4>
                    </div>
                    <div class="r_div">
                        <p>Latest Price(USDE)</p>
                        <h4>{{currentPrice? currentPrice.toFixed(5):'---'}}</h4>
                    </div>

                    <div class="r_div">
                        <p>Estimated Market cap at current price</p>
                        <h4>{{currentPrice? (currentPrice * 5000000).toFixed(2) :'---'}}</h4>
                    </div>
                </el-row>

            </el-col>

        </el-row>

        <div class="bottom_bar hidden-sm-and-up">
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

        <el-row :gutter="24" class="bottom">
            <el-col :sm="8">
                <a target="_Blank" href="https://nsure.network/Nsure_WP_0.7.pdf">whitepaper</a>
            </el-col>
            <el-col :sm="8"><a target="_Blank" href="https://nsure.network">NSURE LBP sheet</a></el-col>
            <el-col :sm="8"><a target="_Blank" href="https://nsure.network/Nsure_WP_0.7.pdf">whitepaper</a></el-col>
        </el-row>

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
            // grid: {
            //     left: '0',
            //     right: '0',
            //     bottom: '1%',
            //     containLabel: true
            // },
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
                    // hoverAnimation: true,
                    data: this.dataList,
                    hoverAnimation: false,
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
            this.currentPrice = _data.price;
            this.dataList.push(this.randomData(_data.price, this.dataList[this.dataList.length - 1].value[0] + 10000,),);

        }


        countdown() {
            // 目标日期时间戳
            const end = this.endDate;
            const now = Date.parse(new Date().toString());
            const msec: any = end - now;
            if (msec < 0) {
                return this.date_ = `End`;
            }
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
            let data: any = await ApiServer.getHistoryPrice();

            data.priceList.map((ev) => {
                this.dataList.push(this.randomData(ev.price, ev.date));
            });
            this.endDate = new Date(data.endDate);
            this.endListFu();
            this.chart.setOption(this.options);
        }


        endListFu() {
            let _date = this.dataList[this.dataList.length - 1].value[0];
            let _tmpPrice: number = this.dataList[this.dataList.length - 1].value[1];
            const _factor = 0.995;
            let _scale: number = (this.endDate.valueOf() - _date) / 500;

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
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        h2 {
            font-size: 72px;
            font-family: Arial;
            font-weight: bold;
            color: #F1F1EF;
            text-align: center;

        }

        .echarts {
            height: 700px;

            min-height: 360Px;
            padding: 0;
            margin: 50px;

            .left {
                height: 100%;
                padding: 42px 0;
                box-sizing: border-box;
                background-color: #243142;
                flex-direction: column;
                justify-content: space-around;
                display: flex;
                align-items: center;


                a {
                    background-color: #09c992;
                    border-radius: 10px;
                    padding: 10px;
                    width: 600px;
                    min-width: 200Px;
                    margin: 0 auto;
                    min-height: 30Px;
                    height: 70px;
                    line-height: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    font-size: 18px;
                    font-family: Arial;
                    font-weight: bold;
                    color: #1B2532;
                    text-align: center;

                }

                #myEcharts {
                    width: 1200px;
                    min-width: 300Px;
                    height: 515px;
                }
            }

            .echarts_right {
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                div {
                    height: 30%;
                    background-color: #243142;
                    text-align: center;
                    padding: 20px;
                    box-sizing: border-box;
                    position: relative;

                    p {
                        font-size: 20px;
                        font-family: Arial;
                        font-weight: bold;
                        color: #F1F1EF;
                    }

                    h4 {
                        position: absolute;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        top: 0;
                        height: 0;
                        margin: auto;
                        font-size: 20px;
                        font-family: Arial;
                        font-weight: bold;
                        color: #F1F1EF;

                    }
                }
            }
        }


        .bottom_bar {

            .box {
                height: 80Px;
                display: flex;
                justify-content: space-between;
            }

            padding: 20px 0;

            .child {
                position: relative;
                width: 29%;
                height: 100%;
                box-sizing: border-box;
                background-color: #24303e;
                padding: 20px;
                box-sizing: border-box;

                p {
                    font-size: 12px;
                    color: white;
                    font-weight: bold;
                    margin: 0;
                    text-align: center;
                }

                h4 {
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    top: 0;
                    margin: auto;
                    text-align: center;
                    font-size: 20px;
                    height: 20px;
                    font-family: Arial;
                    font-weight: bold;
                    color: #F1F1EF;

                }

            }


        }

        .bottom {

            a {
                margin-top: 10Px;
                line-height: 80px;
                min-height: 30Px;
                text-align: center;
                border: 3px solid #57F9AF;
                border-radius: 100px;
                font-size: 20px;
                font-family: Arial;
                font-weight: bold;
                color: #57F9AF;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
</style>
