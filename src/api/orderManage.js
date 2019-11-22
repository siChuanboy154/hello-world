/**
 * 订单管理接口
 * 2019-10-26 by 小貂蝉
 */

import req from '@/utils/request'


// 查询&订单列表
export const orderList = params => req.get('/orders/orderlist', params)  

// 保存订单修改
export const orderEdit = params => req.post('/orders/orderedit', params)  