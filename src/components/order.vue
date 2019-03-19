<template>

  <div>
    <MyFilter v-if="currentIndex == 0"
              url="http://doclever.cn:8090/mock/5c62e01a3dce46264b25bf54/getChukuSupplier"></MyFilter>
    <MyFilter v-if="currentIndex == 1"
              url="http://doclever.cn:8090/mock/5c62e01a3dce46264b25bf54/getChukuSupplier"></MyFilter>
    <div class="date-wrap">
      <span class="show">{{this.date?this.date:initDate()}}</span>
      <div class="data-plugin-wrap">
        <input type="date" @input="getDate($event)">
        <i class="date-icon"></i>
      </div>
    </div>
    <!--<div class="tab-title">-->
      <!--<div class="nav-item" :class="{'nav_active':index == currentIndex}" v-for="(item,index) in titlebar"-->
           <!--:key="index" @click="changeIndex(index)">-->
        <!--<span>{{item.name}}</span>-->
      <!--</div>-->
    <!--</div>-->
    <div class="tab-title">
      <div class="nav-item" :class="{'nav_active':index == currentIndex}" v-for="(item,index) in titlebar"
           :key="index" @click="changeIndex(index,$event)" ref="nav_item">
        <span>{{item.name}}</span>
      </div>
      <span class="line" ref="line"></span>
    </div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="list-wrap" ref="wrapper">
            <div class="wrap">
              <ul class="content">
                <li v-for="(item,index) in salelist" :key="index">
                  <div class="head">
                    <div class="left">
                      <span class="materiel-name">{{item.materialname}}&nbsp;&nbsp;{{item.model}}</span>
                      <!--<span class="materiel-id">({{controlLength(item.tabNumber,20)}})</span>-->
                    </div>
                    <!--<div class="right">-->
                      <!--<span>{{item.status === 1 ? '正常':'关闭'}}</span>-->
                      <!--<i class="normal-icon"></i>-->
                    <!--</div>-->
                  </div>
                  <div class="supplier">{{item.clientname}}</div>
                  <div class="bottom">
                    <div class="label-wrap">
                      <span class="label">{{item.contractNumber}}</span>
                    </div>
                    <div class="more">
                      <router-link :to="{name: 'chukudetail',
                        params: {
                          materialname: item.materialname,
                          clientname:item.clientname,
                          data:item.data,
                          contractNumber:item.contractNumber,
                          chukuNum:item.chukuNum,
                          assistQty:item.assistQty,
                          taxPrice:item.taxPrice,
                          remark:item.remark,
                          model:item.model,
                       }
                      }">更多
                      </router-link>
                    </div>
                  </div>
                </li>
              </ul>
              <Loading :showloadingwrap="showLoadingWrap" :showloadingimg="showLoadingImg"></Loading>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="list-wrap" ref="wrapper1">
            <div class="wrap">
              <ul class="content">
                <li v-for="(item,index) in purchaselist" :key="index">
                  <div class="head">
                    <div class="left">
                      <span class="materiel-name">{{item.materialname}}&nbsp;&nbsp;{{item.model}}</span>
                      <!--<span class="materiel-id">({{controlLength(item.tabNumber,20)}})</span>-->
                    </div>
                    <!--<div class="right">-->
                      <!--<span>{{item.status === 1 ? '正常':'关闭'}}</span>-->
                      <!--<i class="normal-icon"></i>-->
                    <!--</div>-->
                  </div>
                  <div class="supplier">{{item.suppliername}}</div>
                  <div class="bottom">
                    <div class="label-wrap">
                      <span class="label">{{item.contractNumber}}</span>
                      <!--<span class="label">{{controlLength(item.organization,8)}}</span>-->
                    </div>
                    <div class="more">
                      <router-link :to="{name: 'rukudetail',
                       params: {
                          materialname: item.materialname,
                          suppliername:item.suppliername,
                          data:item.data,
                          contractNumber:item.contractNumber,
                          rukuNum:item.rukuNum,
                          assistQty:item.assistQty,
                          taxPrice:item.taxPrice,
                          remark:item.remark,
                          model:item.model,
                       }
                      }">更多
                      </router-link>
                    </div>
                  </div>
                </li>
              </ul>
              <Loading :showloadingwrap="showLoadingWrap" :showloadingimg="showLoadingImg"></Loading>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--<div class="loading-wrapper" v-show="!showLoadingWrap">-->
    <!--<p class="line"></p>-->
    <!--<img src="../assets/loading-bottom.gif" alt="" v-show="showLoadingImg">-->
    <!--<span v-show="!showLoadingImg">暂无数据</span>-->
    <!--<p class="line"></p>-->
    <!--</div>-->
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import axios from 'axios'
  import BScroll from 'better-scroll'
  import MyFilter from './myfilter'
  import Loading from './Loading'

  const titlebar = [
    {
      name: '出库',
      icon: 'icon-chuku',
      iconon: 'icon-chuku_on',
      fonton: 'font_on',
      link: 'chuku'
    },
    {
      name: '入库',
      icon: 'icon-ruku',
      iconon: 'icon-ruku_on',
      fonton: 'font_on',
      link: 'ruku'
    }
  ]

  export default {
    name: "order",
    data() {
      return {
        titlebar,
        detailSwiper: null,
        currentIndex: 0,
        date: '',
        salelist: [],
        purchaselist: [],
        salescroll: null,
        purchasescroll: null,
        showLoadingWrap: false,
        showLoadingImg: false,
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$nextTick(() => {
          vm.detailSwiper = new Swiper('.swiper-container', {
            pagination: {
              el: '.swiper-pagination'
            },
            on: {
              slideChangeTransitionStart: function () {
                vm.currentIndex = vm.detailSwiper.activeIndex
              }
            },
          })
          vm.loadData('sale', 1, 10)
        })
      })
    },
    mounted(){
      let {right} = this.$refs.nav_item[0].getBoundingClientRect()
      this.$refs.line.style.left = right/2 + 'px'
      this.$refs.line.style.transform = 'translateX(-50%)'
      this.$refs.line.style.visibility = 'visible'
    },
    components: {
      MyFilter,
      Loading
    },
    methods: {
      controlLength(str, len) {
        if (str) {
          return str.length > 6 ? str.slice(0, len) + '...' : str
        }
      },
      initDate() {
        let date = new Date();
        let seperator1 = "-";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        this.date = year + seperator1 + month + seperator1 + strDate;
      },
      getDate(e) {
        this.date = e.target.value
        this.loadData('sale', 1, 10)
      },
      loadData(type, page, pageAmount, materiel, organization, date, supplier) {
        this.showLoadingWrap = true;
        this.showLoadingImg = true
        if (type === 'sale') {
          axios.get('http://doclever.cn:8090/mock/5c62e01a3dce46264b25bf54/getPurchaseOrderListMock', {
            params: {
              page: page,
              pageAmount: pageAmount,
              materiel: materiel,
              organization: organization,
              date: date,
              supplier: supplier,
            }
          })
            .then((response) => {
              if (response.data.data.length > 0) {
                this.showLoadingWrap = false;

                this.page++
                this.salelist = response.data.data.concat(this.salelist);
                console.log('list', this.salelist)
                this.$nextTick(() => {
                  if (!this.salescroll) {
                    this.salescroll = new BScroll(this.$refs.wrapper, {
                      click: true,
                      pullUpLoad: {
                        threshold: -50 // 当上拉距离超过30px时触发 pullingUp 事件
                      }
                    })
                    this.salescroll.on('pullingUp', () => {
                      this.loadData(type)
                      this.salescroll.finishPullUp()
                      // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
                    })
                  } else {
                    this.salescroll.refresh()
                  }
                })
              } else {
                debugger
                this.showLoadingImg = false
              }

            })
            .catch((error) => {
              this.showLoadingImg = false
            })
        } else if (type === 'purchase') {
          axios.get('http://doclever.cn:8090/mock/5c62e01a3dce46264b25bf54/getPurchaseOrderListMock', {
            params: {
              page: page,
              pageAmount: pageAmount,
              materiel: materiel,
              organization: organization,
              date: date,
              supplier: supplier,
            }
          })
            .then((response) => {
              if (response.data.data.length > 0) {
                this.showLoadingWrap = false;
                this.page++
                this.purchaselist = response.data.data.concat(this.purchaselist);
                console.log('list', this.purchaselist)
                this.$nextTick(() => {
                  if (!this.purchasescroll) {
                    this.purchasescroll = new BScroll(this.$refs.wrapper1, {
                      click: true,
                      pullUpLoad: {
                        threshold: -50 // 当上拉距离超过30px时触发 pullingUp 事件
                      }
                    })
                    this.purchasescroll.on('pullingUp', () => {
                      this.loadData(type, this.page, 10, this.chosenMaterielList, this.chosenOrganizationList, this.date, this.selectedResultId)
                      this.purchasescroll.finishPullUp()
                      // 事情做完，需要调用此方法告诉 better-scroll 数据已加载，否则上拉事件只会执行一次
                    })
                  } else {
                    this.purchasescroll.refresh()
                  }
                })
              } else {
                this.showLoadingImg = false
              }

            })
            .catch((error) => {
              this.showLoadingImg = false
            })
        }

      },
      changeIndex(index,$event) {
        this.currentIndex = index;
        this.detailSwiper.slideTo(this.currentIndex);

        console.log($event.target)
        let {width,left} = $event.target.getBoundingClientRect()
        // this.$refs.line.style.width = width+'px'
        this.$refs.line.style.left = left+width/2 + 'px'
        this.$refs.line.style.transition = 'all 350ms'
      },
    },
    watch: {
      currentIndex() {
        console.log(this.currentIndex, this.purchaselist.length)
        if (this.currentIndex === 1) {
          if (this.purchaselist.length == 0) {
            this.loadData('purchase', 1, 10)
          }
        }
      }
    }
  }
</script>

<style scoped>
  .date-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #F2F6F9;
    /*border-bottom: 1px solid #e9e9e9;*/
  }

  .date-wrap::after {
    content: "  ";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #e9e9e9;
    /* 如果不用 background-color, 使用 border-top:1px solid #e0e0e0; */
  }

  @media screen and (-webkit-min-device-pixel-ratio: 2) {
    .date-wrap::after {
      transform: scaleY(.5);
    }
  }

  @media screen and (-webkit-min-device-pixel-ratio: 3) {
    .date-wrap::after {
      transform: scaleY(.33333);
    }
  }

  .date-wrap .show {
    padding: 0.08rem 0 0.08rem 0.12rem;
    font-size: 0.12rem;
    color: #030303;
  }

  .date-wrap .data-plugin-wrap {
    margin-right: 0.12rem;
    position: relative;
    font-size: 0.12rem;
    color: #030303;
  }

  .date-wrap .data-plugin-wrap input {
    position: absolute;
    top: 0;
    right: 0;
    opacity: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .date-wrap .data-plugin-wrap .date-icon {
    display: inline-block;
    width: 0.11rem;
    height: 0.11rem;
    background: url("../assets/date.png") no-repeat;
    background-size: contain;
  }

  .swiper-container {
    height: calc(100% - 1.54rem);
  }

  .swiper-wrapper {
    height: 100%;
  }

  .swiper-slide {
    font-size: 12px;
  }

  .tab-title {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
  }
  .line{
    background:#007aff;
    border-radius:0.015rem;
    width:0.21rem;
    height:0.03rem;

    position: absolute;
    visibility: hidden;
    /*left: 50%;*/
    /*transform: translateX(-50%);*/
    bottom: 0;
    /*border-bottom: 4px solid blue;*/
  }

  .nav-item {
    /*display: inline-block;*/
    padding: 0 14px;
    width: auto !important;
    font-size: 12px;
    flex: 1;
  }

  .nav-item span {
    display: inline-block;
    line-height: 32px;
    border-bottom: 2px solid rgba(237, 91, 0, 0);
    color: #b5b5b5;
    /*border-color: rgb(242, 242, 242);*/
    width: 100%;
    text-align: center;
  }

  .nav-item.nav_active span {
    /*color: rgb(237, 91, 0);*/
    color: #007aff;
    /*border-color: rgb(237, 91, 0);*/
  }

  .list-wrap {
    /*height: calc(100% - 0.8rem);*/
    /*height: calc(100% - 1.2rem);*/
    height: 100%;
    overflow: hidden
  }

  .list-wrap li {
    margin-left: 0.12rem;
    padding-top: 0.18rem;
    padding-bottom: 0.19rem;
    padding-right: 0.12rem;
    /*border-bottom: 1px solid #efefef;*/
    font-size: 0.1rem;
  }

  .list-wrap li::after {
    content: "  ";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background-color: #efefef;
    /* 如果不用 background-color, 使用 border-top:1px solid #e0e0e0; */
  }

  @media screen and (-webkit-min-device-pixel-ratio: 2) {
    .list-wrap li::after {
      transform: scaleY(.5);
    }
  }

  @media screen and (-webkit-min-device-pixel-ratio: 3) {
    .list-wrap li::after {
      transform: scaleY(.33333);
    }
  }

  .list-wrap .content li .head {
    margin-bottom: 0.08rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .list-wrap .content li .head .left {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .list-wrap .content li .head .left .materiel-name {
    font-size: 0.14rem;
    color: #030303;
  }

  .list-wrap .content li .head .left .materiel-id {
    font-size: 0.12rem;
    color: #4b4b4b;
  }

  .list-wrap .content li .head .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .list-wrap .content li .head .right > span {
    padding-right: 0.07rem;
    font-size: 0.12rem;
    color: #19be6b;
  }

  .list-wrap .content li .head .right .normal-icon {
    display: inline-block;
    width: 0.14rem;
    height: 0.14rem;
    background: url("../assets/normal.png") no-repeat;
    background-size: contain;
  }

  .list-wrap .content li .supplier {
    margin-bottom: 0.09rem;
    font-size: 0.12rem;
    color: #4b4b4b;
  }

  .list-wrap .content li .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .list-wrap .content li .bottom .label-wrap span {
    margin-right: 0.14rem;
    padding: 0.03rem 0.14rem;
    display: inline-block;
    font-size: 0.11rem;
    color: #3897ff;
    background-color: #d4e9ff;
    border-radius: 0.06rem;
  }

  .list-wrap .content li .bottom .more a {
    font-size: 0.09rem;
    color: #bbbbbb;
  }


</style>
