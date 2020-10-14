<template>
    <div id="app">
        <HeaderBar/>
        <Banner/>
        <Footer/>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import HeaderBar from "@/components/Header.vue";
    import Footer from "@/components/Footer.vue";
    import Banner from '@/components/Banner.vue';

    @Component({components: {HeaderBar,Footer,Banner}})
    export default class App extends Vue {
    }
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        background-color: #1B2532;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
