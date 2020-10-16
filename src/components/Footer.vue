<template>
    <div class="footer">
        <b-container  class="bv-example-row">
            <b-row class="justify-content-md-between">
                <b-col sm="2">
                    <div class="logon-wrapper">
                        <img src="@/assets/images/logo@2x.png" width="40" alt="">
                        <span>   Nsure.Network</span>
                    </div>
                </b-col>
                <b-col sm="4">
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
                </b-col>
            </b-row>
        </b-container>

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
        padding: 60px 0 100px;

        .logon-wrapper{
            padding-top: 20px;

        }

        .footer-right {
            display: flex;
            justify-content: space-between;
padding-top: 20px;
            &-item {


                .footer-title {
                    font-size: 14px;
                    font-weight: bold;
                    margin-bottom: 15px;
                }

                &-list {
                    font-size: 14px;

                    li {
                        margin-bottom: 15px;

                        img {
                            float: left;
                            margin: 2px 10px 0 0;
                        }

                        a {
                            color: #fff;
                        }
                    }
                }
            }
        }

    }

</style>
