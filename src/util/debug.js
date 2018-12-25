const dev = true

export function print(...args) {
    if(dev) {
        console.log(...args)
    }
}