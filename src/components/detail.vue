<template>
  <div class="detail-wrap">
    <div class="date-wrap">
      <span>{{dataObj.startdate}}至{{dataObj.enddate}}</span>
    </div>

    <div class="panel">
      <div class="name">{{dataObj.name}}</div>
      <div class="items">
        <div class="item">
          <span class="left">净重</span>
          <span class="right">{{dataObj.jingzhong}}</span>
        </div>
        <div class="item">
          <span class="left">车辆</span>
          <span class="right">{{dataObj.carnum}}</span>
        </div>
        <div class="item">
          <span class="left">供应商</span>
          <span class="right">{{dataObj.supplier}}</span>
        </div>
        <div class="item">
          <span class="left">库存组织</span>
          <span class="right">{{dataObj.kczz}}</span>
        </div>
      </div>
      <div class="other" v-if="dataObj.other">
        <div class="block">
          <span>Vdaf</span>
          <span>{{dataObj.other.Vdaf}}</span>
        </div>
        <div class="block">
          <span>M10</span>
          <span>{{dataObj.other.M10}}</span>
        </div>
        <div class="block">
          <span>CSR</span>
          <span>{{dataObj.other.CSR}}</span>
        </div>
        <div class="block">
          <span>water</span>
          <span>{{dataObj.other.water}}</span>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  import axios from 'axios'
  export default {
    name: "detail",
    data() {
      return {
        dataObj: {}
      }
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        console.log('beforeRouteEnter')
        vm.id = vm.$route.params.id

        axios.get('http://doclever.cn:8090/mock/5c62e01a3dce46264b25bf54/getDetail', {
          params: {
            id: vm.id,
          }
        })
          .then((response) => {
            vm.dataObj = response.data.data[0];
            // vm.dataObj = response.data.data;
            console.log(vm.dataObj.other.Vdaf)
          })
          .catch(function (error) {
            console.log(error);
          });
      })
    },
  }
</script>

<style scoped>
  .detail-wrap{
    background-color: #F2F6F9;
  }
  .date-wrap {
    padding-left: 0.12rem;
    height: 0.42rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #F2F6F9;
    font-size: 0.12rem;
    color: #030303;
  }

  .panel{
    padding: 0 0 0 0.12rem;
    background-color: #fff;
  }
  .panel > .name {
    padding-top: 0.12rem;
    font-size:0.14rem;
    color:#030303;
  }
  .panel .items{
    padding-right: 0.12rem;
    padding-bottom: 0.1rem;
    border-bottom: 1px solid #efefef;
  }
  .panel .items .item{
    padding-top: 0.12rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .panel .items .item .left{
    font-size:0.12rem;
    color:#929292;
  }
  .panel .items .item .right{
    font-size:0.12rem;
    color:#030303;
  }
  .panel .other{
    padding-bottom: 0.2rem;
    padding-right: 0.12rem;
    padding-top: 0.12rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .panel .other .block{
    display: inline-flex;
    flex-direction: column;
  }
  .panel .other .block span:first-child{
    font-size:0.12rem;
    color:#007aff;
  }
  .panel .other .block span:last-child{
    padding-top: 0.12rem;
    font-size:0.12rem;
    color:#030303;
  }
  .panel .other{

  }
</style>
