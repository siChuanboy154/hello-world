<template>
  <div id="app">
    <el-scrollbar
      :native="false"
      wrapStyle
      wrapClass
      viewClass
      viewStyle
      :noresize="false"
      tag="section"
    >
      <router-view></router-view>
    </el-scrollbar>
  </div>
</template>



<style lang="less">
body{

  overflow: overlay
}
#app {
  height: 100%;
}
</style>
