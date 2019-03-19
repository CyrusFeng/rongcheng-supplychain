<template>
  <div class="detail-wrap">
    <!--<div class="date-wrap">-->
    <!--<span>{{startdate}}至{{enddate}}</span>-->
    <!--</div>-->

    <div class="panel">
      <div class="name">{{materialname}}</div>
      <div class="subtitle">
        <span class="">{{clientname}}</span>
        <span>{{data}}</span>
      </div>
      <div class="items">
        <div class="item">
          <span class="left">合同号</span>
          <span class="right">{{contractNumber}}</span>
        </div>
        <div class="item">
          <span class="left">出库数量</span>
          <span class="right">{{chukuNum}}</span>
        </div>
        <div class="item">
          <span class="left">辅助数量</span>
          <span class="right">{{assistQty}}</span>
        </div>
        <div class="item">
          <span class="left">含税单价</span>
          <span class="right">{{taxPrice}}</span>
        </div>
        <div class="item">
          <span class="left">备注</span>
          <span class="right">{{remark}}</span>
        </div>
        <div class="item">
          <span class="left">规格型号</span>
          <span class="right">{{model}}</span>
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
        dataObj: {},
        materialname: '',
        clientname: '',
        data: '',
        contractNumber: '',
        chukuNum: '',
        assistQty: '',
        taxPrice: '',
        remark: '',
        model: '',
      }
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        console.log('beforeRouteEnter')
        // vm.id = vm.$route.params.id
        vm.materialname = vm.$route.params.materialname
        vm.clientname = vm.$route.params.clientname
        vm.data = vm.$route.params.data
        vm.contractNumber = vm.$route.params.contractNumber
        vm.chukuNum = vm.$route.params.chukuNum
        vm.assistQty = vm.$route.params.assistQty
        vm.taxPrice = vm.$route.params.taxPrice
        vm.remark = vm.$route.params.remark
        vm.model = vm.$route.params.model

        // axios.get('http://doclever.cn:8090/mock/5c62e01a3dce46264b25bf54/getDetail', {
        //   params: {
        //     id: vm.id,
        //   }
        // })
        //   .then((response) => {
        //     vm.dataObj = response.data.data[0];
        //     // vm.dataObj = response.data.data;
        //     console.log(vm.dataObj.other.Vdaf)
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });
      })
    },
  }
</script>

<style scoped>
  .detail-wrap {
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

  .panel {
    padding: 0 0 0 0.12rem;
    background-color: #fff;
  }

  .panel > .name {
    padding-top: 0.12rem;
    font-size: 0.14rem;
    color: #030303;
  }
  .panel > .subtitle{
    padding-right: 0.12rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .panel > .subtitle span{
    padding-top: 0.12rem;
    font-size: 0.12rem;
    color: #030303;
  }

  .panel .items {
    padding-right: 0.12rem;
    padding-bottom: 0.1rem;
    border-bottom: 1px solid #efefef;
  }

  .panel .items .item {
    padding-top: 0.12rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .panel .items .item .left {
    font-size: 0.12rem;
    color: #929292;
  }

  .panel .items .item .right {
    font-size: 0.12rem;
    color: #030303;
  }

  .panel .other {
    padding-bottom: 0.2rem;
    padding-right: 0.12rem;
    padding-top: 0.12rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .panel .other .block {
    display: inline-flex;
    flex-direction: column;
  }

  .panel .other .block span:first-child {
    font-size: 0.12rem;
    color: #007aff;
  }

  .panel .other .block span:last-child {
    padding-top: 0.12rem;
    font-size: 0.12rem;
    color: #030303;
  }

  .panel .other {

  }
</style>
