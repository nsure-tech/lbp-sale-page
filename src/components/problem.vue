<template>
    <div class="wap">
        <h2>What do l need to know? </h2>
        <ul class="one">
            <li></li>
            <li v-for="item in problemList" :key="item.ask" @click="showAnswer(item)">
                <p><span></span>{{
                    item.ask
                    }}
                </p>
                <h5 v-if="item.isShow">{{ item.answer}}</h5>
            </li>
        </ul>

        <h3>NSURE Token Sale and Economics</h3>

        <ul class="tow">
            <li v-for="item in economicsList" :key="item.answer">
                <p>{{item.one }}</p>
                <p>{{item.tow }}</p>
            </li>
        </ul>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";


    export default class Problem extends Vue {

        private problemList: Array<{ ask: string, answer: string,isShow:boolean}>  = [
            {
                ask: "How can I get Nsure tokens?",
                isShow:false,
                answer: "The main options to get NSURE tokens now is either through capital mining or Balancer Liquidity Bootstrapping Pool (LBP). We also have a trading competition coming in a few weeks.",
            },
            {
                ask: "When will the TGE take place on Balancer LBP?",
                isShow:false,

                answer: "The TGE via LBP on Balance will take place on the XXXX starting at XXX UTC, for a duration of approximately 2 days, from block XXXX to block XXXX.\n"
            },
            {
                ask: "How does the Balancer LBP work?",
                isShow:false,
                answer: "The TGE via LBP on Balance will take place on the XXXX starting at XXX UTC, for a duration of approximately 2 days, from block XXXX to block XXXX.\n"
            },
            {
                ask: "Why can’t I purchase the tokens from Balancer LBP at the 1st block?\n",
                isShow:false,
                answer: "Participants should not purchase NSURE tokens when LBP starts, there will be a very large slippage to be dealt with."
            },
            {
                ask: "What is the best strategy to get PERP from LBP?",
                isShow:false,
                answer: "If you want to submit a very large order, the best strategy for you is to divide the order into small chunks and spread them out over 2 days to average down the price."
            },
            {
                ask: "Can I use tokens other than USDC to get NSURE from LBP?",
                isShow:false,
                answer: "Yes, any token supported on Balancer can be used to exchange for our token (but usually, the exchange rate will be worse due to multiple hops between different pools on Balancer)."
            },
            {
                ask: "Can I get NSURE from Uniswap?",
                isShow:false,
                answer: "It’s possible that during the three-day existence of the Balancer’s Liquidity Bootstrapping Pool (LBP), someone who has acquired our token and created a pool for people to buy it.\n" +
                    "But we expect there will be lots of scam pools on Uniswap. Therefore, it’s recommended only to get NSURE from our LBP on Balancer."
            },
            {
                ask: "Which Wallet is supported on Balancer LBP?",
                isShow:false,
                answer: "Metamask, Portis, or any wallet that can be connected to a desktop Dapp through wallet connect should be fine. You can test if your wallet is supported now by going to Balancer’s website and swapping a token to another. https://balancer.exchange"
            },
            {
                ask:"How about a whitelist and a fixed price?",
                isShow:false,
                answer:"The goal of the Nsure Network is to build a 1) permissionless protocol with 2) price discovery provided by a vAMM. We think it’s not aligned with our goal to have a whitelist and a fixed price."
            },
            {
                ask:"Who is behind Perpetual Protocol?",
                isShow:false,
                answer:"Our team members are also very decentralized. Team members and strategic partners are from Europe, America, and Asia, core members are based in Shanghai and Shenzhen, all have a solid combined working experience in the insurance and blockchain industry like Venture Capital, crypto exchanges, wallet solution services, multinational insurance companies, actuarial analysis etc."
            },
            {
                ask:"Who are the strategic investors of the Perpetual Protocol?",
                isShow:false,
                answer:"We have raised $1.45M in a strategic seed & private round led by Based Ventures with participation from Mechanism Capital, Three Commas, AU21, GenBlock and Signal Ventures. Further strategic partners and collaborations to be announced as we move on to Beta."
            },
            {
                ask:"Weight changes and other parameters for the Nsure LBP",
                isShow:false,
                answer:"Create doc like Perp:\thttps://docs.google.com/spreadsheets/d/10yyVQjPtWsWMP6L--AT0_PsNdZdEo6_Zkpv30qh3CZU/edit#gid=0\n"
            },

        ];

        private economicsList: Array<{ one: string, tow: string }> = [

            {
                one:" Launchpad Hard Cap",
                tow:'  3000000 USD'
            },
            {
                one:"Total Token Supply",
                tow:'  100000000 NSURE'
            },
            {
                one:"Initial Circulating Supply",
                tow:'  13.69% of Total Token Supply'
            },
            {
                one:"Launchpad Allocation",
                tow:'  6521739 KAVA (6.52% of Total Token Supply)'
            },
            {
                one:"Max Number of Winning Lottery Tickets",
                tow:'    15000'
            },
        ];



        mounted(): void {
        }

        showAnswer(ev){
            ev.isShow = !ev.isShow;
            this.$forceUpdate();
        }

    }
</script>

<style lang="scss" scoped>
    .wap {
        max-width: 900px;
        margin: 25px auto 0 auto;
        position: relative;
        text-align: left;

        h2 {
            position: absolute;
            color: #1B2532;
            text-align: center;
            width: 40%;
            margin: 0 auto 0 auto;
            font-size: 1rem;
            left: 0;
            right: 0;
            top: -25px;
            height: 50px;
            background-color: #09c992;
            border-radius: 3px;
            line-height: 50px;
            padding: 0;

            font-family: Arial;
            font-weight: bold;
            color: #1B2532;

        }

        .one {
            li {
                min-height: 50px;
                text-align: left;
                background-color: #25313f;
                line-height: 50px;
                padding-left: 20px;

                p{
                    display: flex;
                    margin: 0;
                    justify-content: left;
                    align-content: center;
                    align-items: center;
                    font-size: 1rem;
                    font-family: Arial;
                    font-weight: 400;
                    color: #57F9AF;
                    span{
                        display: block;
                        width: 5px;height: 5px;
                        border-radius: 100px;
                        background-color: #57F9AF;
                        margin-right: 10px;

                    }
                }


                h5{
                    color: white;
                    padding-bottom: 10px;
                    font-size: 1rem;
                    padding-right: 10px;
                }


            }

            li:nth-of-type(even) {
                background-color: #2d3a4c
            }
        }

        .tow{
            li {
                height: 40px;
                text-align: left;
                line-height: 50px;
                padding-left: 20px;
                display: flex;
                justify-content: left;
                align-content: center;
                align-items: center;
                background-color: #2d3a4c;
                font-size: 1rem;
                font-family: Arial;
                font-weight: 400;
                color: #57F9AF;

                p{
                    flex: 1;
                    margin: 0;
                    text-align: center;
                    line-height: 100%;

                    font-size: 1rem;
                    font-family: Arial;
                    font-weight: 400;
                    color: #57F9AF;


                }
            }

            li:nth-of-type(even) {
                background-color: #25313f;
            }
        }

        h3{
            font-size: 1rem;
            font-family: Arial;
            font-weight: bold;
            color: #57F9AF;
            margin: 60px 0 30px 0 ;

        }
    }
</style>
