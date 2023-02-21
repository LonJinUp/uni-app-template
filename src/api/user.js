import request from '@/utils/request'

//个人信息
export const info = data => request.post('/v1/api/info', data)