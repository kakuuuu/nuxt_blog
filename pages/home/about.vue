<template>
  <div>
    <h1>基于Nuxt-服务端渲染(SSR)个人博客</h1>

    <h2>技术栈</h2>

    <ul>
      <li>开发语言：JavaScript</li>
      <li>服务端：Nodejs</li>
      <li>前端：Vue</li>
      <li>组件库：Element-UI</li>
      <li>服务端渲染框架：Nuxt</li>
      <li>数据库：MongoDB</li>
    </ul>

    <h2>进度</h2>

    <ul>
      <li>[x] 文章页</li>
      <li>[x] 用户登录</li>
      <li>[x] 写文章</li>
      <li>[x] 修改文章</li>
      <li>[x] 删除文章</li>
    </ul>

    <h3>项目地址</h3>

    <p>
      <a href="https://github.com/kakuuuu/nuxt">https://github.com/kakuuuu/nuxt</a>
    </p>

    <h3>更新文档</h3>

    <hr />

    <h4>2020/4/24</h4>

    <p>完成了个人博客的基础功能</p>

    <hr />

    <h3>Build Setup</h3>
    <p>
      For detailed explanation on how things work, check out
      <a href="https://nuxtjs.org">Nuxt.js docs</a>.
    </p>
  </div>
</template>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }

  a {
    color: #545455;
    cursor: pointer;
    display: block;
  }

  .clear {
    clear: both;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
    font-weight: bold;
    line-height: 1.5;
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 20px 0 15px;
  }

  h1 {
    font-size: 22px;
  }
</style>