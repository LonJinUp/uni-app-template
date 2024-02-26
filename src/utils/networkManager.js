/**
 * 监听网络状态变化
 */
class NetworkManager {
    constructor() {
        /**
         * 最大重试次数
         * @type {number}
         */
        this.MAX_RETRY_COUNT = 3
        /**
         * 当前重试次数
         * @type {number}
         */
        this.retryCount = 0
        /**
         * 网络状态 极好veryGood 正常good 较差poor
         * @type {string}
         */
        this.currentNetworkStatus = 'veryGood'
        /**
         * 网络状态变化的回调函数
         * @type {Function}
         */
        this.statusChangeCallback = null
        /**
         * 网络请求的url
         * @type {string}
         */
        this.url = ''
    }

    /**
     * 设置网络状态变化的回调函数
     * @param {*} callback 
     */
    setChangeCallback(callback) {
        this.statusChangeCallback = callback
    }

    // 设置请求的url
    setRequestUrl(url) {
        this.url = url
    }

    // 请求方法
    request() {
        return new Promise((resolve, reject) => {
            const startTime = Date.now()
            uni.downloadFile({
                url: `${this.url}?timer=${startTime}`,
                success: (res) => {
                    const endTime = Date.now()
                    const duration = endTime - startTime
                    this.checkNetworkStatus(duration)
                    resolve(res)
                },
                fail: (res) => {
                    this.retryCount++
                    if (this.retryCount < this.MAX_RETRY_COUNT) {
                        this.request()
                    } else {
                        console.log('网络状态不佳，已停止')
                        this.retryCount = 0
                        reject(res)
                    }
                },
            })
        })
    }

    /**
     * 判断网络状态
     * @param {*} duration 请求耗时
     */
    checkNetworkStatus(duration) {
        const previousStatus = this.currentNetworkStatus
        if (duration < 1000) {
            this.currentNetworkStatus = 'veryGood'
        } else if (duration >= 1000 && duration <= 1500) {
            this.currentNetworkStatus = 'good'
        } else {
            this.currentNetworkStatus = 'poor'
            // 请求失败，开始判断
            if (this.retryCount < this.MAX_RETRY_COUNT) {
                this.retryCount++
                this.request()
            } else {
                // 达到最大重试次数，停止递归
                this.retryCount = 0
                console.log('网络状态不佳，已停止')
            }
        }

        // 判断网络状态是否发生变化
        if (previousStatus !== this.currentNetworkStatus && this.statusChangeCallback) {
            this.statusChangeCallback(this.currentNetworkStatus)
        }
    }

    /**
     * 开启监听
     * @returns 
     */
    start() {
        if (!this.url) {
            console.error('请设置请求的url')
            return
        }
        this.request()
        uni.onNetworkStatusChange(() => {
            this.request()
        })
    }
}

export default NetworkManager

