<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item
        :key="i"
        v-for="(item, i) in breadArr"
        :to="{ path: item.path }"
      >{{ item.title }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data() {
    return {
      breadArr: []
    };
  },
  methods: {
    breadList() {
      this.breadArr = this.$route.meta;
    }
  },
  created() {
    this.breadList();
  },
  watch: {
    "$route.path"() {
      this.breadList(); // 计算面包屑
    }
  }
};
</script>

<style lang="scss" scoped>
</style>