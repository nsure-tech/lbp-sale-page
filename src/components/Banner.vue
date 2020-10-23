<template>
    <div class="wap padding20">
        <h2>Liquidity Bootstrapping Pool for Nsure</h2>

        <el-row class="echarts" :gutter="24" type="flex">
            <el-col :sm="19">
                <div class="left">
                    <a target="_Blank"
                       href="https://balancer.exchange/#/swap/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/0xe22e5Acede7391E41bcbb2af7b2D12787537470b">Access
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
                        <h4>{{currentPrice?  (currentPrice * 9000000).toFixed(2) :'---'}}</h4>
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
            <el-col :sm="3"><span style="color: transparent">'</span></el-col>
            <el-col :sm="6"><a target="_Blank" href="https://nsure.network">NSURE LBP sheet</a></el-col>
            <el-col :sm="3"><span style="color: transparent">'</span></el-col>

            <el-col :sm="6"><a target="_Blank" href="https://nsure.network/Nsure_WP_0.7.pdf">whitepaper</a></el-col>
        </el-row>

    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {ApiServer} from "@/request";

    const BigNumber = require("big-number");

    import {State, Action, Getter, Mutation} from "vuex-class";
    import {DenormalizedWeightAndGetbalance, Erc20Model} from "../store/erc20/erc20_model";

    const namespace = "Erc20";
    @Component
    export default class Banner extends Vue {
        @Getter("getPrice", {namespace}) private price: number;

        @Action("getSpotPrice", {namespace}) private getSpotPrice;
        private date_ = "";
        private currentPrice = 0;

        private getPriceTime: number = 30000;


        private endDate = new Date('2020/10/25');



        public mounted() {
            this.init();
        }

        async init() {
            this.getCurrentPrice();
            this.countdown();
            setInterval(async () => {
                await this.getCurrentPrice();
            }, this.getPriceTime,);

        }


        async getCurrentPrice() {
            await this.getSpotPrice();
            this.currentPrice = this.price * 1e12;
            this.$forceUpdate();

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
            setTimeout(() => {
                this.countdown();
                this.date_ = '123123';
            }, 60000);
        }









    }
</script>

<style lang="scss" scoped>
    .col {
        padding: 0;
    }


    @mixin size40 {
        font-size: 20px;
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
                        @include size20;
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
                        @include size20;
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
                    @include size40;

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
                    @include size40;
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
