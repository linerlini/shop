<template>
    <div class="search">
      <div class="input">
        <van-search
          ref="searchInput"
          v-model="query"
          placeholder="请输入搜索关键词"
          @search="onSearch"
          background="rgb(0,175,236)"
          shape="round"
        />
      </div>
      <div class="searchHistory" v-show="!query">
        <div class="title">搜索历史 <div class="right" @click="clickRight1">清空历史</div></div>
        <div class="content">
          <van-tag size="medium" @click="addQuery(item)" round class="tag" color="#999999" v-for="(item,index) in searchHistory" :key="index">{{item}}</van-tag>
        </div>
      </div>
      <div class="searchRecommend" v-show="!query">
        <div class="title">搜索发现 <div class="right" @click="clickRight2">换一批</div></div>
        <div class="content">
          <van-tag size="medium" @click="addQuery(item)" round class="tag" color="#999999" v-for="(item,index) in searchRecommend[key1]" :key="index">{{item}}</van-tag>
        </div>
      </div>
      <div class="searchContent" v-show="query">
        <van-dropdown-menu v-show="result.length" style="margin-bottom: 15px">
          <van-dropdown-item v-model="value1" :options="option1" />
          <van-dropdown-item v-model="value2" :options="option2" />
          </van-dropdown-menu>
        <goodVue :lists="result"></goodVue>
        <van-empty image="search" v-show="!result.length" description="暂无搜索结果" />
      </div>
    </div>
</template>
<script setup>
import { Search as vanSearch, Tag as vanTag, Dialog, DropdownMenu as vanDropdownMenu, DropdownItem as vanDropdownItem, Empty as vanEmpty } from 'vant'
import { ref, nextTick, computed, onMounted } from 'vue'
import useSearchHistory from '../../src/assets/js/use-search-history'
import { useStore } from 'vuex'
import { getSearch } from '../../server/search'
import goodVue from '../components/good/good.vue'

const store = useStore()
const searchHistory = computed(() => store.state.searchHistory)
const searchInput = ref(null)
const { saveSearch, clearSearch } = useSearchHistory()
// const searchHistory = ['水果', '蔬菜', '番茄']

const value1 = ref(0)
const value2 = ref('a')
const option1 = [
  { text: '全部商品', value: 0 },
  { text: '新款商品', value: 1 },
  { text: '活动商品', value: 2 }
]
const option2 = [
  { text: '默认排序', value: 'a' },
  { text: '好评排序', value: 'b' },
  { text: '销量排序', value: 'c' }
]
const searchRecommend = [
  ['水果', '蔬菜', '青菜', '早餐', '鱼', '小龙虾', '芒果', '小台芒', '蛋糕', '料酒'],
  ['蔬菜', '水果', '青菜', '面包', '香蕉', '猪肉', '牛肉', '茄子', '黄瓜', '鸡肉'],
  ['礼品卡', '购物卡', '充值卡', '番茄', '胡萝卜', '玉米', '排骨', '料酒']
]

const key1 = ref(0)
const query = ref('')
const result = ref([])
const onSearch = async () => {
  saveSearch(query.value)
  result.value = await getSearch({ keyword: query.value })
  // console.log(result.value)
}

const addQuery = async (item) => {
  query.value = item
  onSearch()
}

const clickRight1 = () => {
  Dialog.confirm({
    // title: '您确定清除所有历史记录吗？',
    message:
    '您确定清除所有历史记录吗？'
  })
    .then(() => {
      clearSearch()
    })
}

onMounted(async () => {
  if (store.state.keyword) {
    query.value = store.state.keyword
    await onSearch()
    store.commit('setKeyword', '')
  }
})

const clickRight2 = () => {
  key1.value += 1
  key1.value %= 3
}

(async () => {
  await nextTick()
  searchInput.value.focus()
})()
</script>
<style lang="scss" scoped>
.search {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgb(246,246,246);
  .searchHistory, .searchRecommend {
    margin: 0 auto;
    width: 90%;
    .title {
      position: relative;
      margin: 10px 0;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.514);
      font-weight: 600;
      // width: 100px;
      .right {
        width: 60px;
        height: 16px;
        text-align: center;
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 7px;
        font-size: 14px;
        // border-radius: 50%;
        background-color: #00AFEC;
      }
    }
    .content {
      display: flex;
      // justify-content: space-around;
      flex-wrap: wrap;
      .tag {
        margin: 0 10px 10px 0;
      }
    }
  }
}
</style>
