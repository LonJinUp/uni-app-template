import request from '@/utils/request'

//个人信息
export const testApi = data => request.get('/api/getHaoKanVideo?page=0&size=2', data)