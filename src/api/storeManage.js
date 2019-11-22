/**
 * 商铺管理接口
 * 2019-10-29 by 小貂蝉
 */

import req from '@/utils/request'


// 商铺列表
export const storeInfo = params => req.get('/store/shopinfo', params)  
export const storeEdit = params => req.post('/store/shopedit', params)  