<template>
  <div class="loading-wrapper" v-show="showloadingwrap">
    <p class="line"></p>
    <img src="../assets/loading-bottom.gif" alt="" v-show="showloadingimg">
    <span v-show="!showloadingimg">暂无数据</span>
    <p class="line"></p>
  </div>
</template>

<script>
  export default {
    name: "loading",
    props: {
      showloadingwrap: Boolean,
      showloadingimg: Boolean
    },
  }
</script>

<style scoped>
  .loading-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0.8rem;
    background-color: #F2F6F9;
  }

  .loading-wrapper .line {
    height: 0px;
    width: 0.85rem;
    position: relative;
  }

  .loading-wrapper .line::after {
    content: "  ";
    position: absolute;
    left: 0;
    bottom: -0.02rem;
    width: 100%;
    height: 0px;
    background-color: #cacaca;
    border-bottom: 1px solid #cacaca;
    /* 如果不用 background-color, 使用 border-top:1px solid #e0e0e0; */
  }

  @media screen and (-webkit-min-device-pixel-ratio: 2) {
    .loading-wrapper .line::after {
      transform: scaleY(.5);
    }
  }

  @media screen and (-webkit-min-device-pixel-ratio: 3) {
    .loading-wrapper .line::after {
      transform: scaleY(.33333);
    }
  }

  .loading-wrapper img {
    margin: 0 0.08rem;
    width: 0.25rem;
    height: 0.25rem;
  }

  .loading-wrapper span {
    margin: 0 0.08rem;
    font-size: 0.09rem;
    color: #999999;
  }
</style>
