<template>
    <div class="footer">

        <el-row :gutter="10">
            <el-col :sm="8">
                <div class="log">
                    <img src="@/assets/images/logo@2x.png" width="40" alt="">
                    <span>   Nsure.Network</span>
                </div>
            </el-col>

            <el-col :sm="8">
                <p style="color: transparent">'</p>
            </el-col>
            <el-col :sm="8" :xs="24">
                <div class="right footer-right">
                    <div class="footer-right-item">
                        <div class="footer-title">SOCIAL</div>
                        <ul class="footer-right-item-list">
                            <li>
                                <img src="../assets/images/twiiter@2x.png" width="16" alt="">
                                <a href="https://twitter.com/Nsure_network" target="_blank" rel="">Twitter</a>
                            </li>
                            <li>
                                <img src="../assets/images/discord@2x.png" width="16" alt="">
                                <a href="https://discord.com/invite/nSvAapa" target="_blank" rel="">Discord</a>
                            </li>
                            <li>
                                <img src="../assets/images/telegram@2x.png" width="16" alt="">
                                <a href="https://t.me/nsurenet" target="_blank" rel="">Telegram</a>
                            </li>
                            <li>
                                <img src="../assets/images/medium@2x.png" width="16" alt="">
                                <a href="https://medium.com/@nsure_network" target="_blank" rel="">Medium</a>
                            </li>
                        </ul>
                    </div>
                    <div class="footer-right-item">
                        <div class="footer-title">CONTACT</div>
                        <ul class="footer-right-item-list">
                            <li>
                                contact@Nsure.network
                            </li>
                        </ul>
                    </div>
                </div>
            </el-col>
        </el-row>


    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class Footer extends Vue {
    }
</script>

<style lang="scss" scoped>
    .footer {
        color: #fff;
        background-color: #1B2532;
        padding: 30px 7% 50px 7%;

        .log {
            padding-top: 20px;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                margin-right: 10Px;
            }
        }

        .footer-right {
            display: flex;
            padding-top: 20px;
            justify-content: space-around;

            &-item {


                .footer-title {
                    font-weight: bold;
                    margin-bottom: 15Px;
                }

                &-list {
                    font-size: 14px;

                    li {
                        margin-bottom: 15Px;

                        display: flex;
                        justify-content: left;
                        align-items: center;
                        img{
                            margin-right: 10Px;
                        }
                        a {
                            color: #fff;
                            /*font-size: 30px;*/
                        }
                    }
                }
            }
        }
    }

</style>
