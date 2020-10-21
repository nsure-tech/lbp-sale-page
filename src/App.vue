<template>
    <div id="app">

        <HeaderBar/>

       <!--<div class="padding20">-->
           <Banner/>
           <div class="caveat padding20">
               <div class="box">
                   <img src="@/assets/images/caveat.png" alt="">
                   <div class="text">
                       This Balancer LBP is intended to act as TGE for the public  and will be closed once the targeted block height (approx. 2 days) is reached. The Dynamics of this LBP are designed to allow users to purchase NSURE while allowing for fair price discovery, as it’s structure is based on principles of Dutch Auctions.

                   </div>
               </div>
           </div>
           <Problem></Problem>

           <PieChart/>
           <LadderDiagram/>
       <!--</div>-->
        <Footer/>
    </div>
</template>


<script lang="ts">
    import HeaderBar from '@/components/Header.vue';
    import Footer from '@/components/Footer.vue';
    import Banner from '@/components/Banner.vue';
    import PieChart from '@/components/PieChart.vue';
    import LadderDiagram from '@/components/LadderDiagram.vue';
    import {Component, Prop, Vue} from "vue-property-decorator";
    import Problem from '@/components/problem.vue';

    @Component({components: {HeaderBar,Footer,Banner,PieChart,LadderDiagram,Problem}})
    export default class App extends Vue {
    }
</script>

<style lang="scss">
    #app {
        .caveat{
            margin: 50px 0;
            box-sizing: border-box;

            /*max-width: 900px;*/


            .box{
                position: relative;
                img{
                    width: 50px;
                    height: 40px;
                    position: absolute;
                    left: 10px;
                    top: -25px;
                }
                .text{
                    background: #0a1525;
                    padding: 20px 18px;
                    box-sizing: border-box;
                    text-align: left;
                   @include  size20;
                    font-weight: bold;
                    color: #F1F1EF;
                }
            }
        }
        font-family: Avenir, Helvetica, OpenSans-Regular, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        background-color: #1B2532;
    }


    @media only screen and (max-width: 767px) {

    }

</style>
