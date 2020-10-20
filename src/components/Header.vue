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
        padding: 0 3%;
        min-height: 30Px;
        display: flex;
        justify-content: left;
        align-items: center;
        img{
            margin-right: 15px;
            height: 40px;
            width: 40px;
        }
        span{
            font-size: 16Px;
            font-family: OpenSans-Regular;
            font-weight: bold;
            color: #F1F1EF;

        }

    }
</style>
