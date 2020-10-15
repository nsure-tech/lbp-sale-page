<template>
    <div class="wap">
        <h2>TITLe</h2>
        <h3>(dasdajsghdakjsgdhjagfhjgahjkdgfhdgfajhdgahgfhjd)</h3>

        <b-container class="bv-example-row ">
            <b-row class="justify-content-md-center ">
                <b-col sm="7" class="left">
                    <div id="myEcharts" style="height: 400px;width: 600px;max-width: 600px;"></div>
                    <h4>Access LBP on Balancer</h4>
                </b-col>
                <b-col sm="2" class="d-none d-sm-block">
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

        // private now = +new Date("2020-10-13");
        private endDate = +new Date("2020-10-17");
        private oneDay = 3600 * 100;
        public $echarts: any;
        private options = {
            tooltip: {
                trigger: "axis",
                formatter: (params) => {
                    let data: any = params;
                    data = data[0].data;
                    let date = new Date(data.name);
                    if (this.endList[0].name < data.name) {
                        return;
                    }
                    return data.value[1] + " <br/> " + date.getDate() + "/" + (date.getHours()) + "/" + date.getMinutes();
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
                        return idx == 5 ? "" : [date.getMonth(), date.getDate()].join("-");
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
            const ele = document.getElementById("myEcharts");
            ele.style.width = "100%";
            this.chart = this.$echarts.init(ele);

            this.startListFu();
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

        async getPrice() {
            let data: Array<any> = await ApiServer.getHistoryPrice();


            data.map((ev) => {
                this.dataList.push(this.randomData(ev.price, ev.date));
            });

            this.endListFu();
            this.chart.setOption(this.options);
        }


        startListFu() {
            this.dataList.push(this.randomData(0.00001, "2020-10-14 00:00:00"),);
            this.dataList.push(this.randomData(0.00001, "2020-10-14 23:59:59"),);

        }

        endListFu() {
            let _date = this.dataList[this.dataList.length - 1].value[0];
            let _tmpPrice: number = this.dataList[this.dataList.length - 1].value[1];
            let _scale: number = 36000000;
            const factor = 0.4;

            // this.endList.push(this.randomData(_tmpPrice,_date),);
            // this.endList.push(this.randomData(0.00002,this.endDate - 10000),);
            // // this.endList.push(this.randomData(0,this.endDate),);

            for (let i = 0; i < ((this.endDate.valueOf() - _date) / _scale); i++) {
                this.endList.push(this.randomData(_tmpPrice, _date + i * _scale),);

                _tmpPrice = _tmpPrice * factor;

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
        h3 {
            margin-bottom: 10px;
        }

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

        .r_div {
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

        .bottom_bar {
            .box{
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
    }
</style>
