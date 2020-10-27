<template>
    <div class="wrpBox">
        <div class="bg-white wap padding20">
            <div>
                <h2><p>Token Distribution FAQ</p></h2>
                <ul class="one">

                    <li v-for="item in problemList" :key="item.ask" @click="showAnswer(item.isShow)">
                        <div>
                            <h5><span></span>{{
                                item.ask
                                }}
                            </h5>
                        </div>
                        <p v-if="item.isShow == showKey">{{ item.answer}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div class="wap padding20">
            <h3>Nsure Token Sale & Economics</h3>
            <ul class="tow">
                <li v-for="item in economicsList" :key="item.answer">
                    <p>{{item.one }}</p>
                    <p style="width: 10px;"></p>
                    <p>{{item.tow }} <a href="#tis">{{item.msg}}</a></p>
                </li>
            </ul>
            <h5 class="tis" id="tis">*1  Foundation reserves are split in equal parts, 5% dedicated to nurture and further build the Nsure Ecosystem, 5% will be allocated for participants of the NsureDAO to vote on. Foundation to be unlocked with mainnet launch (estimated Q1 2021). Reserve to be unlocked with DAO launch (estimated Q2 2021).
            </h5>
        </div>
    </div>

</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";


    export default class Problem extends Vue {

        private showKey: string = "";

        private problemList: Array<{ ask: string, answer: string, isShow: string }> = [
            {
                ask: "How can I get Nsure tokens?",
                isShow: "1",
                answer: "The main options to get NSURE tokens now is either through our upcoming Balancer Liquidity Bootstrapping Pool (LBP), or capital mining post-TGE.",
            },
            {
                ask: "When will the TGE take place on Balancer LBP?",
                isShow: "2",

                answer: "The TGE via LBP on Balance will take place on the October 28th starting at 11:00am UTC, for a duration of approximately 2 days, from block 11144773 to block 11157773."
            },

            {
                ask: "Why can’t I purchase the tokens from Balancer LBP at the 1st block?",
                isShow: "4",
                answer: "Participants should not purchase NSURE tokens when LBP starts, there will be a very large slippage to be dealt with."
            },
            {
                ask: "What is the best strategy to get NSURE from LBP?",
                isShow: "5",
                answer: "If you want to submit a very large order, the best strategy for you is to divide the order into small chunks and spread them out over 2 days to average down the price."
            },
            {
                ask: "Can I use tokens other than USDC to get NSURE from LBP?",
                isShow: "6",
                answer: "Yes, any token supported on Balancer can be used to exchange for our token (but usually, the exchange rate will be worse due to multiple hops between different pools on Balancer)."
            },
            {
                ask: "Can I get NSURE from Uniswap?",
                isShow: "7",
                answer: "It’s possible that during the two-day existence of the Balancer’s Liquidity Bootstrapping Pool (LBP), someone who has acquired our token and created a pool for people to buy it. But we expect there will be lots of scam pools on Uniswap. Therefore, it’s recommended only to get NSURE from our LBP on Balancer."
            },
            {
                ask: "Which Wallet is supported on Balancer LBP?",
                isShow: "8",
                answer: "Metamask, Portis, or any wallet that can be connected to a desktop Dapp through wallet connect should be fine. You can test if your wallet is supported now by going to Balancer’s website and swapping a token to another. https://balancer.exchange"
            },
            {
                ask: "What happens to the proceeds after LBP concludes?",
                isShow: "9",
                answer: "Once the LBP has come to an end, 10% of the funds raised will be utilised for seeding a pool of selected AMMs for trading purposes. For the resulting amount of NSURE unsold after the LBP, it will be partially utilised for liquidity purposes, as well as for initially providing capacity on insurance products once the Nsure Network goes live. After the platform naturally grows in capacity, and the boost is no longer needed, the tokens will be transferred to the Nsure DAO to decide on it’s management."
            },


        ];

        private economicsList: Array<{ one: string, tow: string }> = [

            {
                one: " LBP Allocation",
                tow: "  4,000,000 NSURE"
            },
            {
                one: "Total Token Supply",
                tow: "  100,000,000 NSURE"
            },
            {
                one: "Initial Circulating Supply",
                tow: "  9% of Total Token Supply"
            },
            {
                one: "LBP Token Price Ceiling",
                tow: "  5 USDC"
            },
            {
                one: "LBP Token Price Floor",
                tow: "  0.10 USDC"
            },
            {
                one: "Airdrop Allocation",
                tow: "100,000 NSURE"
            },
            {
                one: "LBP Vesting Period",
                tow: "No lockup"
            },
            {
                one: "Private Sale Token Price",
                tow: "1 NSURE = 0.10 USD"
            },
            {
                one: "Private Sale Allocation",
                tow: "14% of Total Token Supply"
            },
            {
                one: "Private Sale Vesting Period",
                tow: "20% unlocked, 20% release every 3 months (>1 year total vesting period)."
            },
            {
                one: "Seed Token Price",
                tow: "1 NSURE = 0.05 USD"
            },
            {
                one: "Seed Allocation",
                tow: "1% of Total Token Supply"
            },

            {
                one: "Foundation Reserve Allocation",
                tow: "10% of Total Token Supply",
                msg:'*1'
            },
            {
                one: "Marketing & Operations Allocation",
                tow: "10% of Total Token Supply "
            },
            {
                one: "Marketing & Operations Vesting Period",
                tow: "20%unlocked. 20% release every 6 months over 2 years."
            },
            {
                one: "Team Allocation",
                tow: "6% of Total Token Supply"
            },
            {
                one: "Team Vesting Period",
                tow: "6 Month fully locked, 25% release every 6 months (>2 year total vesting period)"
            },
            {
                one: "Token Type",
                tow: "ERC20"
            },
            {
                one: "Token Distribution(Airdrop, Private sale)",
                tow: "Within 3 days after LBP concluded"
            },
        ];


        mounted(): void {
        }

        showAnswer(ev) {
            if(this.showKey == ev){
                this.showKey = '0';
            }else{
                this.showKey = ev;

            }
            this.$forceUpdate();
        }

    }
</script>

<style lang="scss" scoped>

    .wrpBox{

        .wap {

            margin: 0 auto;
            /*padding: 40px 0 60px 0;*/
            padding-top: 40px;
            padding-bottom: 60px;

            text-align: left;

            h2 {
                margin: 0 auto 0 auto;
                background-color: #DEDEDE;
                text-align: center;
                position: relative;
                height: 70px;

                p {
                    position: absolute;
                    top: -30px;
                    min-width: 300px;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                    width: 60%;
                    max-width: 320px;
                    background-color: #B6B6B6;
                    border-radius: 3px;
                    font-size: 20px;
                    display: inline-block;
                    font-weight: bold;
                    color: #232323;
                    justify-content: center;
                    align-items: center;
                    padding: 20px 0;

                }

            }


            .tow {
                li {
                    text-align: left;
                    line-height: 50px;
                    /*padding-left: 20px;*/
                    display: flex;
                    justify-content: left;
                    align-content: center;
                    align-items: center;
                    background-color: #243142;
                    font-family: OpenSans-Regular;
                    font-weight: 400;
                    color: #57F9AF;
                    padding: 20px 15px;

                    p {
                        flex: 1;
                        margin: 0;
                        text-align: center;
                        line-height: 100%;
                        @include size20;
                        font-family: OpenSans-Regular;
                        font-weight: 400;
                        color: #2F8FE9;

                    }
                    p:last-child{
                        color: white;
                        display: flex;
                        align-items: flex-start;
                        justify-content: center;
                        a{
                            line-height: 1;
                            display: block;
                            margin-left: 5px;
                            font-size: 11px;
                            color: #2F8FE9;
                            cursor:pointer;
                        }
                    }
                }

                li:nth-of-type(even) {
                    background-color: #1B2532;
                }
            }


            h3 {
                font-size: 30px;
                font-weight: bold;
                color: #2F8FE9;
                text-align: center;
                margin-bottom: 30px;
                @include respond-to(xs){
                    font-size: 22px;
                    text-align: center;
                }

            }

            .tis{
                color: white;
                font-size: 14px;
                margin-top: 10px;
                font-style: italic;
                font-weight: 400;
            }

            .one {
                li {
                    min-height: 20Px;
                    text-align: left;
                    background-color: #F0EFEF;
                    padding: 25px 0 25px 30px;
                    div {
                        display: flex;
                        align-items: center;

                        h5 {
                            display: flex;
                            margin: 0;
                            justify-content: left;
                            align-content: center;
                            align-items: center;
                            @include size20;
                            /*font-weight: bold;*/
                            font-weight: 500;
                            color: #1b2532;
                            span {
                                display: block;
                                width: 15px;
                                height: 15px;
                                border-radius: 100%;
                                background-color: #232323;
                                margin-right: 20px;
                            }
                        }
                    }


                    p {
                        color: #1b2532;
                        @include  size16;
                        padding-top: 10Px;
                        padding-right: 10px;
                        opacity: .4;
                        padding-left: 35px;
                    }


                }

                li:nth-of-type(even) {
                    background-color: #DEDEDE;

                }
            }



        }

        .bg-white{
            background-color: white;
            padding-top: 70px;
            padding-bottom: 70px;
        }
    }



    @media only screen and (max-width: 767px) {
        .wap {
            .one, .tow {
                li {
                    p {
                        font-size: 60px;
                    }

                    div {
                        p {
                            font-size: 60px;
                        }
                    }
                }
            }
        }
    }
</style>
