<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import MainView from './components/MainView';
  export default {
    name: 'main-view',
    components: { MainView },
  };
</script>

<style>
  /* CSS */
  @font-face {
    font-family: 'Nanum Gothic';
    font-style: normal;
    src: url("~@/assets/fonts/NanumGothic-Regular.woff") format('woff') ;
  }
  @font-face {
      font-family: 'Nanum Gothic';
      font-style: normal;
      font-weight: 700;
      src: url("~@/assets/fonts/NanumGothic-Bold.woff") format('woff');
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: "Nanum Gothic"; }
</style>
