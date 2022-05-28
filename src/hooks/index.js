import { ResponseCode } from 'config/constants'
import { computed, ref, watch } from 'vue'

export function useGoodList(requestFunc, searchText) {
  const goods = ref([])
  const pageIndex = ref(0)
  // 下拉加载
  const loadingMore = ref(false)
  const loadingError = ref({
    error: false,
    msg: '',
  })
  const count = ref(0)
  const finished = computed(() => {
    return count.value === goods.value
  })
  async function handleLoadMore() {
    if (finished.value) {
      return
    }
    loadingMore.value = true
    const result = await requestFunc(pageIndex.value + 1, searchText ? searchText.value : '')
    if (result.code === ResponseCode.SUCCESS) {
      const { data, count: newCount } = result.data
      goods.value = [...goods.value, ...data]
      count.value = newCount
      pageIndex.value += 1
    } else {
      loadingError.value.error = true
      loadingError.value.msg = result.msg
    }
    loadingMore.value = false
  }
  function reset() {
    pageIndex.value = 0
    goods.value = []
    loadingMore.value = false
    count.value = 0
  }
  watch(searchText, (newValue, oldValue) => {
    if (newValue !== oldValue) {
      reset()
      handleLoadMore()
    }
  })
  return {
    goods,
    loadingMore,
    loadingError,
    finished,
    handleLoadMore,
  }
}
export const a = 1
