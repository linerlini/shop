<template>
    <div class="search">
      <div class="input">
        <van-search
          ref="searchInput"
          v-model="query"
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @focus="onFocus"
          @blur="onBlur"
          @update:model-value="debOnUpdate(query)"
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
      <div class="words" v-show="query && isFocus" v-for="(item, index) in words" :key="index">
        <div class="word" v-html="item"></div>
      </div>
      <div class="searchContent" v-show="query && !isFocus">
        <van-dropdown-menu v-show="result.length" style="margin-bottom: 15px">
          <van-dropdown-item v-model="value1" :options="option1" disabled />
          <van-dropdown-item v-model="value2" :options="option2"  @change="onChange"/>
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
import { getSearch, getAssociateWord } from '../../server/search'
import goodVue from '../components/good/good.vue'
import { debounce } from '../assets/js/util'

const store = useStore()
const searchHistory = computed(() => store.state.searchHistory)
const searchInput = ref(null)
const { saveSearch, clearSearch } = useSearchHistory()
// const searchHistory = ['水果', '蔬菜', '番茄']

const value1 = ref(0)
const value2 = ref('a')
const isFocus = ref(false)
const option1 = [
  { text: '全部商品', value: 0 },
  { text: '新款商品', value: 1 },
  { text: '活动商品', value: 2 }
]
const option2 = [
  { text: '默认排序', value: 'a' },
  { text: '价格排序', value: 'b' },
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
const AssociateWords = ref([])
const words = ref([])
const onSearch = async () => {
  if (query.value === '') {
    return
  }
  saveSearch(query.value)
  result.value = await getSearch({ keyword: query.value })
  // console.log(result.value)
}

const onFocus = () => {
  isFocus.value = true
}

const onBlur = () => {
  isFocus.value = false
}

const onChange = () => {

}

const onUpdate = async (value) => {
  words.value = []
  if (value === '') {
    return
  }
  AssociateWords.value = await getAssociateWord({ keyword: value })
  console.log(AssociateWords.value.keyword)
  if (AssociateWords.value.keyword === query.value) {
    const str = `<font color='#00AFEC'>${AssociateWords.value.keyword}</font>`
    AssociateWords.value.result.forEach((e) => {
      words.value.push(e.keyword.replace(AssociateWords.value.keyword, str))
    })
  }
}

const debOnUpdate = debounce(onUpdate, 1000)

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
  min-height: 100%;
  z-index: 1003;
  background-color: rgb(246,246,246);
  .words {
    padding: 10px;
    border-bottom: 1px solid rgba(38, 38, 38, 0.2);
    .word {
      line-height: 13px;
      // height: 16px;
      font-size: 13px;
      color: rgb(38, 38, 38);
    }
  }
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
