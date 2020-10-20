<template>
    <div class="logo">
        <img src="@/assets/images/logo@2x.png" width="40" alt="">
        <span>Nsure.Network</span>
    </div>

</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class HeaderBar extends Vue {
        home() {
            console.log(12312);
        }
    }
</script>

<style lang="scss" scoped>
    .logo{
        height: 80px;
        min-height: 30Px;
        display: flex;
        justify-content: left;
        align-items: center;
        padding: 30px 0;
        img{
            margin-right: 10Px;
            height: 65px;
            width: 65px;
            /*min-height: 30Px;*/
            /*min-width: 30Px;*/
        }
        span{
            font-size: 16Px;
            font-family: OpenSans-Regular;
            font-weight: bold;
            color: #F1F1EF;

        }

    }
</style>
