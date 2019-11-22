/**
 * 账号管理接口
 * 2019-10-22 by 小貂蝉
 */

import req from '@/utils/request'

// 获取账户信息
export const getAccountInfo = params => req.get('/users/accountinfo', params)  

// 修改用户头像
export const avatarEdit = params => req.get('/users/avataredit', params)  

// 登录
export const login = params => req.post('/users/login', params)  

// 添加账户
export const addAccount = params => req.post('/users/addaccount', params)  // 这里就只需要传入1个值了

// 账户列表
export const accountList = params => req.get('/users/accountlist', params)

// 删除账户
export const deleteAccount = params => req.get('/users/deleteaccount', params)

// 批量删除
export const batchDelete = params => req.get('/users/batchdelete', params)  

// 编辑账户
export const editAccount = params => req.get('/users/editaccount', params)  

// 验证旧密码
export const checkOldpwd = params => req.get('/users/checkoldpwd', params)  

// 修改密码
export const replacePassword = params => req.post('/users/passwordedit', params)  
