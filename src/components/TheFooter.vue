<template>
  <footer class="app-bottom-navigator-wrapper app-shell-footer">
    <!--<div v-show="!loading" class="fill-height box-flex align-center">-->
    <div class="fill-height box-flex align-center">
      <router-link
      class="flex"
      active-class="on"
      v-for="nav in navigation"
      :key="nav.icon"
      :to="{name:nav.link}">
      <!-- 组件对象的name如果等于nav的name则为当前焦点 -->
        <i
        class="iconfont"
        :class="nav.link == $route.name?nav.iconon:nav.icon"
        ></i>
        <span :class="nav.link == $route.name?nav.fonton:''">{{nav.name}}</span>
      </router-link>
    </div>
  </footer>
</template>
<script>
// import bus from '../bus.js'
const navigation = [
  {
    name:'出库',
    icon:'icon-chuku',
    iconon:'icon-chuku_on',
    fonton:'font_on',
    link:'chuku'
  },
  {
    name:'入库',
    icon:'icon-ruku',
    iconon:'icon-ruku_on',
    fonton:'font_on',
    link:'ruku'
  },
  {
    name:'订单',
    icon:'icon-order',
    iconon:'icon-order_on',
    fonton:'font_on',
    link:'order'
  },
]
export default {
  data(){
    return {
      navigation,
      currentIndex:0,
      loading:true
    }
  },
  // created(){
  //   bus.$on('loading',(val)=>{
  //     this.loading = val
  //   })
  // },
  // watch:{
  //   loading: function (val) {
  //     window.console.log(val)
  //   }
  // }
}
</script>

<style scoped>
.app-shell-footer {
  position: fixed;
  z-index: 9999;
  bottom: 0;
  left: 0;
  right: 0;
}
.app-bottom-navigator-wrapper {
  height: 52px;
  background: #fff;
  box-shadow: 0 3px 14px 2px rgba(0,0,0,.12);
}
.fill-height {
  height: 100%;
}
.align-center {
  align-items: center;
}
.box-flex {
  display: flex;
}
.flex {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  color: #999;
}
.iconfont {
  margin-top: 0.08rem;
  font-size: 0.24rem;
  background-size: contain;
  background-repeat: no-repeat;
  width: 0.27rem;
  height: 0.27rem;
}
.flex span {
  padding: 0.05rem 0 0.03rem 0;
  font-size: 12px;
  text-align: center;
}
/*.on {*/
  /*color: #007aff;*/
/*}*/
.icon-chuku{
  background-image: url(../assets/footer/chuku.png);

}
.icon-chuku_on{
  background-image: url(../assets/footer/chuku_on.png);
}
.icon-ruku{
  background-image: url(../assets/footer/ruku.png);

}
.icon-ruku_on{
  background-image: url(../assets/footer/ruku_on.png);
}
.icon-order{
  background-image: url(../assets/footer/order.png);

}
.icon-order_on{
  background-image: url(../assets/footer/order_on.png);
}
.font_on{
  color: #007aff;
}
</style>
