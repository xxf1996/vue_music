import {print} from './debug'

export function initTap(eventType = 'tap') {
    let isTap = false

    document.body.addEventListener('touchstart', e => {
        isTap = true
    }, true)

    document.body.addEventListener('touchmove', e => {
        isTap = false
    }, true)

    document.body.addEventListener('touchend', e => {
        if(isTap) {
            e.stopPropagation() // 阻止原事件继续传递
            let tapEvent = new Event(eventType, {
                bubbles: true, // 可以冒泡
                cancelable: false // 没有默认行为，不可取消默认行为
            }) // 构建自定义tap事件（点触）
            tapEvent.touches = e.touches
            tapEvent.targetTouches = e.targetTouches
            tapEvent.changedTouches = e.changedTouches
            // print(tapEvent)
            e.target.dispatchEvent(tapEvent) // 向target派发事件
        }
    }, true)
}