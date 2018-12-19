import dayjs from 'dayjs'

/**
 * 返回数字的简写形式
 * @param {Number} n 播放次数或评论次数
 * @param {Boolean} isComment 是否为评论次数
 */
function short(n, isComment = false) {
    let res = ''
    n = parseInt(n)

    if(isComment) {
        if(n >= 100000) {
            res = '10w+'
        }else if(n >= 10000) {
            res = '1w+'
        }else if(n >= 999) {
            res = '999+'
        }else {
            res = n
        }
    }else {
        res = n < 10000? n: Math.floor(n / 10000) + '万'
    }

    return res
}

/**
 * 返回格式化的日期
 * @param {Number} n 时间戳 
 */
function date(n) {
    let t = dayjs(n)
    return t.format(t.year() === dayjs().year()? 'M月D日': 'YYYY年M月D日') // 根据时间是否为今年格式有所不同
}

export default {
    short,
    date
}