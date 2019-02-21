<template>
  <div style="flex: 1;">
    <div class="top-search">
      <div class="input-wrap" @click="showSearch">
        <span>{{selectedResult}}</span>
        <!--<input type="text" :value="selectedResult">-->
      </div>
      <div class="top-search-btn" @click="doSearch">
        <i class="search-icon"></i>
        <span>搜索</span>
      </div>
    </div>
    <div class="search-wrap" v-show="!searchStatus" @click="changeShowSearch" ref="searchWrap">
      <div class="search-bar-wrap" @click.stop="">
        <div class="search-bar">
          <i class="search-icon"></i>
          <label for="search" class="showName" v-show="!labelStatus">请输入供应商名称</label>
          <input type="text" id="search" @input="search($event)" @focus="focus" @blur="blur" :value="selectedResult">
        </div>
        <span class="cancelBtn" @click="hiddenSearch">取消</span>
      </div>
      <div class="result-wrap" @click.stop="" v-show="showResult" ref="resultWrap">
        <ul class="result">
          <li v-for="item in searchResult" @click="resultToSearchBar($event,item.supplierId)">{{item.supplierName}}</li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
  import axios from 'axios'
  import BScroll from 'better-scroll'
  export default {
    name: "TopSearch",
    data() {
      return {
        selectedResult: '',
        searchStatus: true,
        labelStatus: false,
        showResult: true,
        list: [],
        searchResult: [],
        selectedResultId: '',
      }
    },
    methods: {
      showSearch() {
        this.searchStatus = false
        this.showResult = true
        //this.search(null,this.selectedResult)
      },
      doSearch() {
        this.list.length = 0
        // this.loadData(1, 10, this.chosenMaterielList, this.chosenOrganizationList, this.date, this.selectedResultId)
      },
      changeShowSearch() {
        this.searchStatus = !this.searchStatus
      },
      labelHidden(e) {
        this.labelStatus = true
        if (e.target.value === '') {
          this.labelStatus = false
        }
      },
      search(e, keyword) {
        this.selectedResult = e.target.value
        this.labelHidden(e)
        //----------------
        //函数节流
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          if (e.target.value !== '') {
            axios.get('http://doclever.cn:8090/mock/5c62e01a3dce46264b25bf54/getSupplier', {
              params: {
                keyword: e.target.value
              }
            })
              .then((response) => {
                this.searchResult = response.data.data;
                this.$nextTick(() => {
                  if (!this.supplierScroll) {
                    this.supplierScroll = new BScroll(this.$refs.resultWrap, {
                      click: true,
                    })
                  } else {
                    this.supplierScroll.refresh()
                  }
                })
              })
              .catch(function (error) {
                console.log(error);
              });
          } else {
            this.showResult = false
            this.searchResult = []
            this.selectedResultId = ''
          }
        }, 300)
        //this.selectedResult = e != null ? e.target.value : keyword
      },
      hiddenSearch() {
        this.searchStatus = true
      },
      resultToSearchBar(e, id) {
        console.log(e.target.textContent)
        this.selectedResultId = id
        this.selectedResult = e.target.textContent
        this.hiddenSearch()
        this.searchResult = []
      },
      focus() {
        this.$refs.searchWrap.style.height = this.viewHeight
      },
      blur() {
        this.$refs.searchWrap.style.height = '100%'
      },
    }
  }
</script>

<style scoped>
  .top-search {
    margin-right: 0.13rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
  }

  .top-search .input-wrap {
    flex: 1;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .top-search .input-wrap span {
    margin-left: 0.1rem;
    display: inline-block;
    width: 100%;
    height: 0.17rem;
    font-size: 0.12rem;
    border: 0;
  }

  .top-search-btn {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .top-search-btn > span {
    padding-left: 0.04rem;
    font-size: 0.12rem;
    color: #8e8e93;
  }

  .search-icon {
    display: inline-block;
    width: 0.11rem;
    height: 0.11rem;
    background: url("../assets/search.png") no-repeat;
    background-size: contain;
  }


  .search-wrap {
    width: 100%;
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #fff;
  }

  .search-wrap .search-bar-wrap {
    padding: 0.1rem 0 0.1rem 0.12rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #F2F6F9;
  }

  .search-wrap .search-bar-wrap .search-bar {
    margin-right: 0.06rem;
    padding: 0.08rem 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: #e7e7e7;
    border-radius: 0.1rem;
    flex: 1;
    position: relative;
  }

  .search-wrap .search-bar-wrap .search-bar label {
    position: absolute;
    top: 50%;
    left: 0.35rem;
    transform: translateY(-50%);
    font-size: 0.14rem;
    color: #8e8e93;
  }

  .search-wrap .search-bar-wrap .search-bar .search-icon {
    margin: 0 0.12rem;
  }

  .search-wrap .search-bar-wrap .search-bar input {
    margin-right: 0.5rem;
    height: 0.22rem;
    font-size: 0.14rem;
    background: #e7e7e7;
    border: 0;
    flex: 1;
  }

  .search-wrap .search-bar-wrap .cancelBtn {
    margin-right: 0.1rem;
    font-size: 0.14rem;
    color: #007aff;
  }

  .search-wrap .result-wrap {
    margin-left: 0.12rem;
    height: calc(100% - 0.58rem);
    overflow: hidden;
  }

  .search-wrap .result-wrap .result li {
    padding: 0.14rem 0;
    position: relative;
    font-size: 0.12rem;
    color: #929292;
    /*border-bottom: 1px solid #efefef;*/
  }

  .search-wrap .result-wrap .result li::after {
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
    .search-wrap .result-wrap .result li::after {
      transform: scaleY(.5);
    }
  }

  @media screen and (-webkit-min-device-pixel-ratio: 3) {
    .search-wrap .result-wrap .result li::after {
      transform: scaleY(.333333);
    }
  }
</style>
