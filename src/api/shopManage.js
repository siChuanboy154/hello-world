/**
 * 商品管理接口
 * 2019-10-27 by 小貂蝉
 */

import req from '@/utils/request'


// 添加商品
export const goodsAdd = params => req.post('/goods/goodsadd', params)

// 商品列表
export const goodsList = params => req.get('/goods/goodslist', params)

// 修改商品
export const goodsEdit = params => req.post('/goods/goodsedit', params)

// 删除商品
export const goodsDel = params => req.get('/goods/goodsdel', params)  