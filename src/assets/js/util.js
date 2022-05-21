// 一些工具函数

// knuth洗牌算法
export function shuffle (sourece) {
  const arr = sourece.slice()
  for (let i = 0; i < arr.length; i++) {
    const j = getRandomInt(i)
    swap(arr, i, j)
  }
  return arr
}

function getRandomInt (max) {
  return Math.floor(Math.random() * (max + 1))
}
function swap (arr, i, j) {
  const k = arr[i]
  arr[i] = arr[j]
  arr[j] = k
}
// function shuffle(arr) {
//     let i = arr.length;
//     while (i) {
//         let j = Math.floor(Math.random() * i--);
//         [arr[j], arr[i]] = [arr[i], arr[j]];
//     }
// }

// 防抖节流
export function debounce (fn, delay) {
  let timer = null
  return function (...args) {
    const context = this
    if (timer) clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

export function throttle (fn, delay) {
  let last = 0; const timer = null
  return function (...args) {
    const context = this
    const now = new Date()
    if (now - last > delay) {
      clearTimeout(timer)
      setTimeout(function () {
        last = now
        fn.apply(context, args)
      }, delay)
    } else {
      // 这个时候表示时间到了，必须给响应
      last = now
      fn.apply(context, args)
    }
  }
}
