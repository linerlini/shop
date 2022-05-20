// 一些工具函数

// knuth洗牌算法
export function shuffle(sourece) {
    const arr = sourece.slice()
    for (let i = 0; i < arr.length; i++) {
        const j = getRandomInt(i)
        swap(arr, i, j)
    }
    return arr
}

function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1))
}
function swap(arr, i, j) {
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
