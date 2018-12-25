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
    let cur = dayjs()
    let f = ''

    if(t.year() === cur.year()) { // 今年内
        if(t.month() === cur.month() && t.day() === cur.day()) { // 当天
            f = 'HH:mm'
        }else if(t.isBefore(cur.startOf('day')) && t.isAfter(cur.subtract(1, 'day').startOf('day'))) { // 昨天内
            f = '昨日HH:mm'
        }else {
            f = 'M月D日'
        }
    }else {
        f = 'YYYY年M月D日'
    }
    return t.format(f)
}

export default {
    short,
    date
}