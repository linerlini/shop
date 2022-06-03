import { ResponseCode } from 'config/constants'
import { computed, ref, watch } from 'vue'

const PAGE_SIZE = 20
export function useGoodList({ requestFunc, searchText, type, goodType }) {
  const goods = ref([])
  const pageIndex = ref(0)
  // 下拉加载
  const loadingMore = ref(false)
  const loadingError = ref({
    error: false,
    msg: '',
  })
  const count = ref(-1)
  const finished = computed(() => {
    return count.value === goods.value.length
  })
  async function handleLoadMore() {
    if (finished.value) {
      return
    }
    loadingMore.value = true
    const result = await requestFunc({
      searchText: searchText ? searchText.value : '',
      type: type ? type.value : '',
      goodType: goodType ? goodType.value : '',
      offset: pageIndex.value * PAGE_SIZE,
      size: PAGE_SIZE,
    })
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
    count.value = -1
  }
  watch([searchText, type, goodType], () => {
    reset()
    handleLoadMore()
  })
  return {
    goods,
    loadingMore,
    loadingError,
    finished,
    handleLoadMore,
    count,
  }
}
export function useComment() {
  const commentVisible = ref(false)
  const submitLoading = ref(false)
  const rules = {
    rate: [
      {
        required: true,
        message: '请选择评分',
      },
    ],
    commentMessage: [
      {
        required: true,
        message: '请填写你的评价',
      },
    ],
  }
  const rate = ref('')
  const commentMessage = ref('')
  function handleBeforeClose() {
    return !submitLoading.value
  }
  function handleClickCloseButton() {
    commentVisible.value = submitLoading.value
  }
  async function handleComment(value) {
    submitLoading.value = true
    const result = await requestComment({
      orderId: orderId.value,
      comment: value.commentMessage,
      rate: value.rate,
      goodIds: goods.value.map((item) => item.uuid),
    })
    if (result.code === ResponseCode.SUCCESS) {
      Notify({
        type: 'success',
        message: '评论成功',
      })
      commentVisible.value = false
      router.push({
        name: RouteName.ORDER_SUCESS,
        query: {
          id: orderId.value,
        },
      })
    } else {
      Notify(result.msg)
    }
    submitLoading.value = false
  }
}
