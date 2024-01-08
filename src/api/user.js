import request from '@/utils/request'

//个人信息
export const info = data => request.get('/api/getImages?page=0&size=5', data)