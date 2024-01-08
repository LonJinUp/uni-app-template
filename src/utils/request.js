
import { toast, clearStorageSync, getStorageSync, useRouter } from './utils'
import { BASE_URL } from '@/config/index'
import RequestManager from '@/utils/requestManager.js'


const manager = new RequestManager()

const baseRequest = async (url, method, data = {}, loading = true) => {
	let requestId = manager.generateId(method, url, data)
	if (!requestId) {
		console.log('重复请求')
	}
	if (!requestId) return false;

	const header = {}
	header.token = getStorageSync('token') || ''

	let loadingPromise = loading ? new Promise((resolve) => {
		uni.showLoading({ title: 'loading' })
		resolve()
	}) : Promise.resolve()

	return Promise.all([
		loadingPromise,
		new Promise((resolve, reject) => {
			uni.request({
				url: BASE_URL + url,
				method: method || 'GET',
				header: header,
				timeout: 10000,
				data: data || {},
				complete: () => {
					manager.deleteById(requestId)
				},
				success: (successData) => {
					const res = successData.data
					if (successData.statusCode == 200) {
						if (res.resultCode == 'PA-G998') {
							clearStorageSync()
							useRouter('/pages/login/index', 'reLaunch')
						} else {
							resolve(res.data)
						}
					} else {
						toast('网络连接失败，请稍后重试')
						reject(res)
					}
				},
				fail: (msg) => {
					toast('网络连接失败，请稍后重试')
					reject(msg)
				}
			})
		})
	]).finally(() => {
		uni.hideLoading()
	});
}


const request = {};

['options', 'get', 'post', 'put', 'head', 'delete', 'trace', 'connect'].forEach((method) => {
	request[method] = (api, data, loading) => baseRequest(api, method, data, loading)
})



export default request