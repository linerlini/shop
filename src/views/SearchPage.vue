<template>
  <div class="search" @mousedown.prevent>
    <div class="input">
      <van-search
        ref="searchInput"
        v-model="queryText"
        placeholder="请输入搜索关键词"
        background="rgb(0,175,236)"
        shape="round"
        @mousedown.stop
        @search="handleSearch"
        @focus="handleSearchInputFocus(true)"
        @blur="handleSearchInputFocus(false)"
        @update:model-value="handleSearchTextUpdate"
      />
    </div>
    <div v-show="!queryText" class="searchHistory">
      <div class="title">
        搜索历史
        <div class="right" @click="handleClearSearchHistroy">清空历史</div>
      </div>
      <div class="content">
        <van-tag v-for="item in searchHistory" :key="item" size="medium" round class="tag" color="#999999" @click="handleClickSearchWord(item)">{{ item }}</van-tag>
      </div>
    </div>
    <div v-show="!queryText" class="searchRecommend">
      <div class="title">
        搜索发现
        <div class="right">换一批</div>
      </div>
      <div class="content">
        <van-tag v-for="item in searchRecommend[0]" :key="item" size="medium" round class="tag" color="#999999" @click="handleClickSearchWord(item)">{{ item }}</van-tag>
      </div>
    </div>
    <div v-for="item in associationalWords" v-show="queryText && searchInputIsFocus" :key="item" class="associationalWords" @click="handleClickSearchWord(item)">
      <div class="word" v-html="computeAssociationalWordsHTML(item)"></div>
    </div>
    <div v-show="searchText && !searchInputIsFocus" class="searchContent">
      <GoodFlow :goods="goods" :finished="finished" :loading-more="loadingMore" :loading-error="loadingError" @loadMore="handleLoadMore"></GoodFlow>
      <van-empty v-show="!goods.length" image="search" description="暂无搜索结果" />
    </div>
  </div>
</template>
<script setup>
import { Search as vanSearch, Tag as vanTag, Dialog, Empty as vanEmpty } from 'vant'
import { ref, computed, onMounted, nextTick } from 'vue'
import { useStore } from 'vuex'
import { requestSearchAssociational, requestSearchMain } from 'server/search'
import { ResponseCode } from 'config/constants'
import { useGoodList } from 'hooks/'
import GoodFlow from 'components/good_flow/GoodFlow'
import useSearchHistory from '../assets/js/use-search-history'
import { debounce } from '../assets/js/util'

const store = useStore()
const searchHistory = computed(() => store.state.searchHistory)

const searchInputIsFocus = ref(false)
const searchInput = ref(null)
const handleSearchInputFocus = (value) => {
  nextTick(() => {
    searchInputIsFocus.value = value
  })
}

const { saveSearch, clearSearch } = useSearchHistory()

const searchRecommend = [
  ['水果', '蔬菜', '青菜', '早餐', '鱼', '小龙虾', '芒果', '小台芒', '蛋糕', '料酒'],
  ['蔬菜', '水果', '青菜', '面包', '香蕉', '猪肉', '牛肉', '茄子', '黄瓜', '鸡肉'],
  ['礼品卡', '购物卡', '充值卡', '番茄', '胡萝卜', '玉米', '排骨', '料酒'],
]
// 搜索
const queryText = ref('')
const searchText = ref('')
const handleSearch = () => {
  if (!queryText.value) {
    return
  }
  saveSearch(queryText.value)
  searchText.value = queryText.value
}
const handleClickSearchWord = async (str) => {
  queryText.value = str
  handleSearch()
}
const { goods, loadingMore, loadingError, finished, handleLoadMore } = useGoodList(requestSearchMain, searchText)

// 搜索联想词
const associationalWords = ref([])
function computeAssociationalWordsHTML(associationalWord) {
  const highStr = `<font color='#00AFEC'>${queryText.value}</font>`
  return associationalWord.replace(queryText.value, highStr)
}
const handleSearchTextUpdate = debounce(async () => {
  const { value } = queryText
  if (value === '') {
    associationalWords.value = []
    return
  }
  const result = await requestSearchAssociational(value)
  if (result.code === ResponseCode.SUCCESS) {
    associationalWords.value = result.data
  } else {
    console.error(result.msg)
    associationalWords.value = []
  }
}, 1000)

const handleClearSearchHistroy = () => {
  Dialog.confirm({
    // title: '您确定清除所有历史记录吗？',
    message: '您确定清除所有历史记录吗？',
  }).then(() => {
    clearSearch()
  })
}

onMounted(() => {
  searchInput.value.focus()
})
</script>
<style lang="scss" scoped>
.search {
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 1003;
  background-color: rgb(246, 246, 246);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .associationalWords {
    padding: 10px;
    border-bottom: 1px solid rgba(38, 38, 38, 0.2);
    .word {
      line-height: 13px;
      // height: 16px;
      font-size: 13px;
      color: rgb(38, 38, 38);
    }
  }
  .searchHistory,
  .searchRecommend {
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
        background-color: #00afec;
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
  .searchContent {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
