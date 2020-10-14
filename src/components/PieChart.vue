<template>
    <div class="wap">
        <div class="charts">
            <div id="myEchartss" style="height: 400px;width: 900px;max-width: 900px;"></div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class PieChart extends Vue {

        private options ={
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                // orient: 'vertical',
                // top: 'middle',
                type: 'scroll',
                orient: 'vertical',
                right: 100,
                // top: 'centen',
                bottom: 'center',

                // data: ['西凉', '益州', '兖州', '荆州', '幽州']
            },
            series: [
                {
                    name: 'a',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: 335, name: 'b'},
                        {value: 310, name: 'c'},
                        {value: 234, name: 'd'},
                        {value: 135, name: 'e'},
                        {value: 1548, name: 'f'}
                    ]
                }
            ]};

        public $echarts: any;

        private chart: any;


        public mounted() {
            const ele = document.getElementById("myEchartss");
            this.chart = this.$echarts.init(ele);
            this.chart.setOption(this.options);

        }

    }
</script>

<style lang="scss" scoped>
.wap{
    width: 900px;
    background-color: white;
    margin: 0 auto;
}
</style>
