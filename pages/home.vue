<template>
  <div>
    <el-container>
      <el-header>
        <el-menu
          mode="horizontal"
          router="true"
          @select="handleSelect"
          active-text-color="#0f87ff"
        >
          <el-menu-item index="/home/article">
            首页
          </el-menu-item>
          <el-menu-item index="/home/about">
            关于
          </el-menu-item>
          <div class="right" v-if="isLogin !== true">
            <el-button type="text"
              ><i class="el-icon-tickets"></i>写文章</el-button
            >
            <el-button type="text" @click="loginDialogVisible = true"
              >登录·注册</el-button
            >
          </div>
          <div class="right" v-if="isLogin === true">
            <el-dropdown
              split-button
              type="primary"
              size="small"
              @click="Write"
            >
              写文章
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>分享</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div>
              <el-dropdown @command="handleCommand">
                <el-avatar
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                ></el-avatar>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="write">写文章</el-dropdown-item>
                  <el-dropdown-item command="mange">管理</el-dropdown-item>
                  <el-dropdown-item command="layout" @click="loginout"
                    >登出</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-menu>
      </el-header>
      <el-main>
        <el-card class="box-card">
          <router-view></router-view>
        </el-card>
      </el-main>
    </el-container>
    <el-dialog
      title="用户登录"
      :visible.sync="loginDialogVisible"
      width="50%"
      @close="loginDialogClosed"
    >
      <!-- 内容主体区 -->
      <el-form
        :model="loginForm"
        status-icon
        :rules="loginFormRules"
        ref="loginFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            autocomplete="off"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部按钮区 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="loginDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Login">确 定</el-button>
      </span>
    </el-dialog>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      loginDialogVisible: false,
      loginForm: {
        username: "admin1",
        password: "123456"
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名的长度在3-10个字符之间",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "密码的长度在6-15个字符之间",
            trigger: "blur"
          }
        ]
      }
    };
  },
  asyncData(context) {
    // called every time before loading the component
  },
  fetch() {
    // The fetch method is used to fill the store before rendering the page
  },
  head() {
    // Set Meta Tags for this Page
  },
  beforeCreate() {
    this.$router.replace('/home/article')
  },
  // and more functionality to discover
  computed: {
    ...mapState("user", {
      isLogin: state => state.isLogin
    })
  },
  methods: {
    async Login() {
      this.$refs.loginFormRef.validate(async vaild => {
        if (!vaild) {
          return;
        }
        const { data } = await this.$axios.get(
          "admin/getUser/" + this.loginForm.username
        );
        console.log(data);
        if (data.password === this.loginForm.password) {
          this.$message.success("登录成功!");
          Promise.all([this.SET_isLogin(true)]);
        } else {
          this.$message.error("登录失败!");
        }

        this.loginDialogVisible = false;
        // this.getUserList();
      });
    },
    loginDialogClosed() {
      this.$refs.loginFormRef.resetFields();
    },
    handleCommand(command) {
      if (command === "write") {
        this.$router.push({ path: '/home/write'}) 
      } else if (command === "mange") {
        this.$router.push({ path: '/home/articlemanage'})
      } else if (command === "layout") {
        Promise.all([this.SET_isLogin(false)]);
        this.$message.success("登出成功!");
        this.$router.push("/home/article")
      }
    },
    Write(){
      this.$router.push({ path: '/home/write'}) 
    },  
    ...mapMutations("user", ["SET_isLogin"])
  }
};
</script>

<style scoped>
.el-main {
  background-color: #f4f5f5;
}
.el-menu {
  /* margin: 0 20% 0; */
  width: 70%;
  margin: auto;
}
.box-card {
  width: 70%;
  margin: auto;
}
.right {
  display: flex;
  justify-content: center;
  align-items: center;
  float: right;
  /* background-color: #6699FF; */
  margin: auto;
  position: absolute;
  top: 50%;
  right: -6%;
  transform: translate(-50%, -50%);
}
</style>
