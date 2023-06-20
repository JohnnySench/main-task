<template>
  <div id="app">
    <Header/>
    <SubHeader/>
    <MainWrapper></MainWrapper>
    <!-- <MyFooter/> -->
  
  </div>
</template>

<script>
// import Select from '@/components/Select.vue';
import MyFooter from '@/components/footer/MyFooter.vue';
import Header from '@/components/header/Header.vue';
import SubHeader from '@/components/header/SubHeader.vue'
import MainWrapper from '@/components/MainWrapper.vue';
export default {
  components: {
    MainWrapper,
    Header,
    SubHeader,
    MyFooter
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>
