<template>
    <div class="wap">
        <h2>TOKEN ALLOCATION</h2>
      <div class="box">
          <div class="charts">
              <b-container class="bv-example-row ">
                  <b-row>
                      <b-col>
                          <div id="myEchartss" style="height: 400px;width: 100px;"></div>
                      </b-col>
                  </b-row>
              </b-container>
          </div>
      </div>

    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class PieChart extends Vue {
        private options = {
            tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend:{},

            series: [
                {
                    name: "a",
                    type: "pie",
                    radius: ["50%", "70%"],
                    avoidLabelOverlap: false,
                    center: ['40%', '50%'],
                    data: [
                        {value: 1, name: "Seed round"},
                        {value: 55, name: "Capital/Insurance Minning"},
                        {value: 14, name: "Private Sale"},
                        {value: 4, name: "Public Sale"},
                        {value: 10, name: "Foundation Reserve"},
                        {value: 10, name: "Marketing & Operations"},
                        {value: 6, name: "Team"},
                    ]
                }
            ],
        };

        public $echarts: any;

        private chart: any;


        public created(){
            if(document.body.clientWidth < 768){

                this.options.series[0].center = ['50%', '50%'];
            }else{
                this.options.legend =  {
                    orient: 'vertical',
                    top: '20px',
                    left: '70%',
                    data: ["Capital/Insurance Minning", "Seed round", "Private Sale", "Public Sale", "Foundation Reserve", "Marketing & Operations","Team"]
                };
            }
        }

        public mounted() {
            let ele:any = document.getElementById("myEchartss");
            ele.style.width = "100%";


            this.chart = this.$echarts.init(ele);
            this.chart.setOption(this.options);

        }

    }
</script>

<style lang="scss" scoped>
    .wap {
        max-width: 900px;
        margin: 0 auto;
        h2{
            height: 40px;
            font-size: 2rem;
            font-family: Arial;
            font-weight: bold;
            margin: 90px 0 30px 0;
            color: #F1F1EF;

        }
        .box{
            background-color: white;
        }
    }
</style>
