import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 登录页
  {
    path: '/',
    redirect: '/login' // 重定向
  },
  // 首页重定向到登录
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  // 主页
  {
    path: '/home',
    component: () => import('../views/Home.vue'),
    children: [
      // 后台首页
      {
        meta: [
          {
            path: "/home/backgroundindex", title: "首页"
          },
          {
            path: "/home/backgroundindex", title: "后台首页"
          },
        ],
        path: "backgroundindex",
        component: () => import('../views/BackgoundIndex.vue'),
      },
      // 订单管理
      {
        meta: [
          {
            path: "/home/backgroundindex", title: "首页"
          },
          {
            path: "/home/ordermanage", title: "订单管理"
          },
        ],
        path: "ordermanage",
        component: () => import('../views/OrderManage.vue'),
      },
      // 订单详情
      {
        meta: [
          {
            path: "/home/backgroundindex", title: "首页"
          },
          {
            path: "/home/ordermanage", title: "订单详情"
          },
        ],
        path: "orderinfo",
        component: () => import('../views/orderManage/orderInfo.vue'),
      },
      // 商品管理
      {
        path: "shopmanage",
        component: () => import('../views/ShopManage/ShopManage.vue'),
        children: [
          // 重定向
          {
            path: "",
            component: () => import('../views/ShopManage/ShopList.vue'),
          },
          // 商品列表
          {
            meta: [
              {
                path: "/home/backgroundindex", title: "首页"
              },
              {
                path: "/home/shopmanage/shoplist", title: "商品管理"
              },
              {
                path: "/home/shopmanage/shoplist", title: "商品列表"
              },
            ],
            path: "shoplist",
            component: () => import('../views/ShopManage/ShopList.vue'),
          },
          // 添加商品
          {
            meta: [
              {
                path: "/home/backgroundindex", title: "首页"
              },
              {
                path: "/home/shopmanage/shoplist", title: "商品管理"
              },
              {
                path: "/home/shopmanage/appendshop", title: "添加商品"
              },
            ],
            path: "appendshop",
            component: () => import('../views/ShopManage/AppendShop.vue'),
          },
          // 修改商品
          {
            meta: [
              {
                path: "/home/backgroundindex", title: "首页"
              },
              {
                path: "/home/shopmanage/shoplist", title: "商品管理"
              },
              {
                path: "/home/shopmanage/shopedit", title: "修改商品"
              },
            ],
            path: "shopedit",
            component: () => import('../views/ShopManage/ShopEdit.vue'),
          },
        ]
      },
      // 店铺管理
      {
        meta: [
          {
            path: "/home/backgroundindex", title: "首页"
          },
          {
            path: "/home/storemanage", title: "店铺管理"
          },
        ],
        path: "storemanage",
        component: () => import('../views/StoreManage.vue'),
      },
      // 账户管理
      {
        path: "usermanage",
        component: () => import('../views/UserManage/UserManage.vue'),
        children: [
          // 重定向
          {

            path: "",
            component: () => import('../views/UserManage/UserList.vue'),
          },
          // 商品列表
          {
            meta: [
              {
                path: "/home/backgroundindex", title: "首页"
              },
              {
                path: "/home/usermanage/userlist", title: "账户管理"
              },
              {
                path: "/home/usermanage/userlist", title: "商品列表"
              },
            ],
            path: "userlist",
            component: () => import('../views/UserManage/UserList.vue'),
          },
          // 添加账户
          {
            meta: [
              {
                path: "/home/backgroundindex", title: "首页"
              },
              {
                path: "/home/usermanage/userlist", title: "账户管理"
              },
              {
                path: "/home/usermanage/appenduser", title: "添加账户"
              },
            ],
            path: "appenduser",
            component: () => import('../views/UserManage/AppendUser.vue'),
          },
          // 修改密码
          {
            meta: [
              {
                path: "/home/backgroundindex", title: "首页"
              },
              {
                path: "/home/usermanage/userlist", title: "账户管理"
              },
              {
                path: "/home/usermanage/replacepassword", title: "修改密码"
              },
            ],
            path: "replacepassword",
            component: () => import('../views/UserManage/ReplacePassword.vue'),
          },
          // 个人中心
          {
            meta: [
              {
                path: "/home/backgroundindex", title: "首页"
              },
              {
                path: "/home/usermanage/userlist", title: "账户管理"
              },
              {
                path: "/home/usermanage/userindex", title: "个人中心"
              },
            ],
            path: "userindex",
            component: () => import('../views/UserManage/UserIndex.vue'),
          },
        ]

      },
      // 销售统计
      {
        path: "selltotal",
        component: () => import('../views/SellTotal/SellTotal.vue'),
        children: [
          // 重定向
          {
            path: "",
            component: () => import('../views/SellTotal/SellTotal.vue'),
          },
          // 商品统计
          {
            meta: [
              {
                path: "/home/backgroundindex", title: "首页"
              },
              {
                path: "/home/selltotal/shoptotal", title: "销售统计"
              },
              {
                path: "/home/selltotal/shoptotal", title: "商品统计"
              },
            ],
            path: "shoptotal",
            component: () => import('../views/SellTotal/ShopTotal.vue'),
          },
          // 订单统计
          {
            meta: [
              {
                path: "/home/backgroundindex", title: "首页"
              },
              {
                path: "/home/selltotal/shoptotal", title: "销售统计"
              },
              {
                path: "/home/selltotal/ordertotal", title: "订单统计"
              },
            ],
            path: "ordertotal",
            component: () => import('../views/SellTotal/OrderTotal.vue'),
          },
        ]
      },
    ],

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
