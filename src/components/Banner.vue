<template>
    <div class="wap">
        <h2>Liquidity Bootstrapping Pool for Nsure</h2>

        <el-row class="echarts" :gutter="24" type="flex">
            <el-col :sm="19">
                <div class="left">
                    <span href=""> </span>
                    <div id="myEcharts" style="min-height:300px;"></div>
                    <a target="_Blank"
                       href="https://kovan.balancer.exchange/#/swap/0x05F9583926CD311FE960F9Fe8B83bAB3E13AffC1/0x3c438CBEC8CF581f6843191228402B9A5801Fb76">Access
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
                        <p>Latest Price</p>
                        <h4>{{currentPrice? currentPrice.toFixed(5):'---'}}</h4>
                    </div>

                    <div class="r_div">
                        <p>Estimated Market cap</p>
                        <h4>{{currentPrice? (currentPrice * 9000000).toFixed(2) :'---'}}</h4>
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
                    <p>Estimated Market cap</p>
                    <h4>{{currentPrice? (currentPrice * 9000000).toFixed(2) :'---'}}</h4>
                </div>
            </div>
        </div>

        <el-row :gutter="0" class="bottom">
            <el-col :sm="6">
                <a target="_Blank" href="https://nsure.network/Nsure_WP_0.7.pdf">whitepaper</a>
            </el-col>
            <el-col :sm="3">'</el-col>
            <el-col :sm="6"><a target="_Blank" href="https://nsure.network">NSURE LBP sheet</a></el-col>
            <el-col :sm="3">'</el-col>

            <el-col :sm="6"><a target="_Blank" href="https://nsure.network/Nsure_WP_0.7.pdf">whitepaper</a></el-col>
        </el-row>

    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {ApiServer} from "@/request";
    const  BigNumber = require('big-number');

    @Component
    export default class Banner extends Vue {

        private date_ = "";
        private currentPrice = 0;

        private dataList: Array<any> = [];
        private endList: Array<any> = [];
        // TODO denormalizedWeightAndGetbalance
        private dWAGL:any;

        private endDate;
        public $echarts: any;
        private options = {

            tooltip: {
                trigger: "axis",
                formatter: (params) => {
                    let data: any = params;
                    data = data[0].data;
                    let date = new Date(data.name);
                    if (this.dataList[this.dataList.length - 1].name < data.name) {
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
                        let _date = new Date(value);
                        // return this.dateFmt(date);
                        let _houes = _date.getHours() > 10 ? _date.getHours() : `0${_date.getHours()}`;
                        let _getMinutes = _date.getMinutes() > 10 ? _date.getMinutes() : `0${_date.getMinutes()}`;
                        return [_houes, _getMinutes].join(":");
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

                    markLine: {
                        symbol: ["none", "none"],
                    },
                    lineStyle: {
                        color: "#12C0FD",
                        width: 1
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
            setInterval(async () => {
                await this.getCurrentPrice();
                this.endListFu();
            }, 10000,);
        }


        async getCurrentPrice() {
            let _data = await ApiServer.getCurrentPrice();
            let _spot = await ApiServer.spot();
            this.currentPrice = _data.price;
            this.dataList.push(this.randomData(_data.price, _data.data,));
        }


        countdown() {

            const end = this.endDate.valueOf();
            const now = new Date().valueOf();
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
            // alert(`${hr}H ${min}m`);
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
            this.dWAGL = data;
            this.endDate = new Date(data.endDate);
            this.endListFu();
        }


        endListFu() {
            let _date = this.dataList[this.dataList.length - 1].value[0];
            let _tmpPrice: number = this.dataList[this.dataList.length - 1].value[1];
            let _initPrice: number = this.dataList[this.dataList.length - 1].value[1];
                this.endList = [];
            let balanceA = BigNumber(this.dWAGL.balanceA);
            let balanceB = BigNumber(this.dWAGL.balanceB);
            let weightA = BigNumber(this.dWAGL.weightA);
            let weightB = BigNumber(this.dWAGL.weightB);

            for (let i = 0; i < 60 * 6; i++) {
                _tmpPrice = (balanceA / weightA) / (balanceB / weightB);

                if(_tmpPrice < _initPrice){
                    _date += 60000;
                    this.endList.push(this.randomData(_tmpPrice, _date,),);
                }
                weightA = weightA.plus(9123263888888888);   // every min
                weightB = BigNumber(50000000000000000000).minus(weightA);
                if(_date>this.endDate.valueOf())
                    break;
            }
            this.options.series[1].data = this.endList;
            this.chart.setOption(this.options);
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



    @mixin size40 {
        font-size:20px;
        @include respond-to(xs) {
            font-size: 12Px;
        }
    }

    .wap {
        margin: 0;
       //
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        h2 {
            font-size: 42px;
            font-family: OpenSans-Regular;
            font-weight: bold;
            color: #F1F1EF;
            text-align: center;

            @include respond-to(xs) {
                font-size: 20Px;
            }

        }

        .echarts {
            height: 450px;

            min-height: 360Px;
            padding: 0;
            margin: 30px;
            @include respond-to(xs) {
                height: 400px;
            }

            .left {
                height: 100%;
                padding: 20px 0;
                box-sizing: border-box;
                background-color: #243142;
                flex-direction: column;
                justify-content: space-around;
                display: flex;
                align-items: center;


                a {
                    background-color: #12C0FD;
                    border-radius: 5px;
                    margin: 0 auto;
                    line-height: 30px;
                    padding: 10px 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    @include size40;
                    font-family: "OpenSans-Regular";
                    font-weight: bold;
                    color: #1B2532;
                    text-align: center;

                }

                #myEcharts {
                    width: 90%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 auto;
                    /*width: 1100px;*/
                    /*min-width: 300Px;*/
                    /*height: 515px;*/
                    height: 718px;

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
                    padding: 10px;
                    box-sizing: border-box;
                    position: relative;

                    p {
                        @include  size20;
                        font-family: OpenSans-Regular;
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
                        @include  size20;
                        font-family: OpenSans-Regular;
                        font-weight: bold;
                        color: #F1F1EF;

                    }
                }
            }
        }


        .bottom_bar {

            .box {
                height: 100Px;
                display: flex;
                justify-content: space-between;
            }

            .child {
                position: relative;
                width: 29%;
                height: 100%;
                box-sizing: border-box;
                background-color: #24303e;
                padding: 5px;
                box-sizing: border-box;

                p {
                    @include  size40;

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
                    @include  size40;
                    height: 20px;
                    font-family: OpenSans-Regular;
                    font-weight: bold;
                    color: #F1F1EF;

                }

            }


        }

        .bottom {
            margin-top: 20px;
            a {
                text-align: center;
                border: 2px solid #12C0FD;
                border-radius: 100px;
                font-size: 20px;
                font-weight: bold;
                color: #12C0FD;
                display: flex;
                height: 40px;
                justify-content: center;
                align-items: center;
            }
        }
    }
</style>
