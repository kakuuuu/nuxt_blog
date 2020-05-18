<template>
  <div>
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex"
          mode="horizontal"
          router="true"
          @select="handleSelect"
        >
          <el-menu-item index="/home/article">
            首页
          </el-menu-item>
          <el-menu-item index="/home/about">
            关于
          </el-menu-item>
          <el-menu-item index="/home/login">登录</el-menu-item>
          <el-menu-item index="4">管理</el-menu-item>
          <el-menu-item index="5">写文章</el-menu-item>
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  asyncData(context) {
    // called every time before loading the component
    return { name: "World" };
  },
  fetch() {
    // The fetch method is used to fill the store before rendering the page
  },
  head() {
    // Set Meta Tags for this Page
  }
  // and more functionality to discover
};
</script>

<style>
.el-main {
  background-color: #aaa;
  height: 1000px;
}
</style>
