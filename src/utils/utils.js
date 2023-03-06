/**
 * 提示方法
 * @param {String} title 提示文字
 * @param {String}  icon icon图片
 * @param {Number}  duration 提示时间
 */
export function toast(title, icon = 'none', duration = 1500) {
	if(title) {
		uni.showToast({
		    title,
		    icon,
		    duration
		})
	}
}

/**
 * 设置缓存
 * @param {String} key 键名
 * @param {String} data 值
 */
export function setStorageSync(key, data) {
    uni.setStorageSync(key, data)
}

/**
 * 获取缓存
 * @param {String} key 键名
 */
export function getStorageSync(key) {
    return uni.getStorageSync(key)
}

/**
 * 删除缓存
 * @param {String} key 键名
 */
export function removeStorageSync(key) {
    return uni.removeStorageSync(key)
}

/**
 * 清空缓存
 * @param {String} key 键名
 */
export function clearStorageSync() {
    return uni.clearStorageSync()
}


/**
 * 页面跳转
 * @param {'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab' | 'navigateBack' | number } url  转跳路径
 * @param {String} params 跳转时携带的参数
 * @param {String} type 转跳方式
 **/
export function useRouter(url, params = {}, type = 'navigateTo') {
    try {
        if (Object.keys(params).length) url = `${url}?data=${encodeURIComponent(JSON.stringify(params))}`
        if (type === 'navigateBack') {
            uni[type]({ delta: url })
        } else {
            uni[type]({ url })
        }
    } catch (error) {
        console.error(error)
    }
}

/**
 * 预览图片
 * @param {Array} urls 图片链接
 */
export function previewImage(urls, itemList = ['发送给朋友', '保存图片', '收藏']) {
    uni.previewImage({
        urls,
        longPressActions: {
            itemList,
            fail: function (error) {
                console.error(error,'===previewImage')
            }
        }
    })
}

/**
 * 保存图片到本地
 * @param {String} filePath 图片临时路径
 **/
export function saveImage(filePath) {
    if (!filePath) return false
    uni.saveImageToPhotosAlbum({
        filePath,
        success: (res) => {
            toast('图片保存成功', 'success')
        },
        fail: (err) => {
            if (err.errMsg === 'saveImageToPhotosAlbum:fail:auth denied' || err.errMsg === 'saveImageToPhotosAlbum:fail auth deny') {
                uni.showModal({
                    title: '提示',
                    content: '需要您授权保存相册',
                    showCancel: false,
                    success: (modalSuccess) => {
                        uni.openSetting({
                            success(settingdata) {
                                if (settingdata.authSetting['scope.writePhotosAlbum']) {
                                    uni.showModal({
                                        title: '提示',
                                        content: '获取权限成功,再次点击图片即可保存',
                                        showCancel: false
                                    })
                                } else {
                                    uni.showModal({
                                        title: '提示',
                                        content: '获取权限失败，将无法保存到相册哦~',
                                        showCancel: false
                                    })
                                }
                            },
                            fail(failData) {
                                console.log('failData', failData)
                            }
                        })
                    }
                })
            }
        }
    })
}

/**
 * 深拷贝
 * @param {Object} data
 **/
export const clone = (data) => JSON.parse(JSON.stringify(data))

