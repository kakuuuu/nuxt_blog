<template>
  <div>
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="22">
            <el-input
              class="title_input"
              v-model="title"
              placeholder="请输入标题"
            ></el-input>
          </el-col>
          <el-col :span="2">
            <div class="save_button">
              <el-button type="primary" size="small" @click="saveArticle"
                >发布</el-button
              >
            </div></el-col
          >
        </el-row>
      </el-header>
      <el-main>
        <div class="edit_wrap">
          <div class="tag_wrap">
            <el-tag
              class="tag_margin"
              :key="tag"
              v-for="tag in labels"
              :closable="true"
              :close-trasition="true"
              @close="handleClose(tag)"
              type="primary"
              >{{ tag }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="inputVisible"
              v-model="inputValue"
              ref="saveTagInput"
              size="mini"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="showInput"
              >+ New Tag</el-button
            >
          </div>
          <div class="brief_wrap">
            <el-input
              type="textarea"
              autosize
              placeholder="请输入简介"
              v-model="gist"
            >
            </el-input>
          </div>
          <el-row>
            <el-col :span="12">
              <div class="markdown">
                <el-input
                  class="markdown_input"
                  type="textarea"
                  rows="20"
                  placeholder="请输入内容(Markdown编辑器)"
                  v-model="content"
                >
                </el-input>

                <div class="clear"></div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="markdown_compiled" v-html="compiledMarkdown()"></div>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import marked from "marked";
import hightlight from "highlight.js";
marked.setOptions({
  hightlight: function(code) {
    return hightlight.hightlightAuto(code).value;
  },
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});
export default {
  name: "articleEdit",
  data() {
    return {
      id: {},
      title: "",
      date: "",
      content: "",
      gist: "",
      labels: [],
      inputVisible: false,
      inputValue: ""
    };
  },
  mounted: async function() {
    let id = this.$route.query.id;
    this.id = id;
    if (id) {
      const { data } = await this.$axios.get("articleDetail/" + id);
      this.title = data.title;
      this.date = data.date;
      this.content = data.content;
      this.gist = data.gist;
      this.labels = data.labels;
    }
  },
  methods: {
    // 编译Markdown
    compiledMarkdown: function() {
      return marked(this.content);
    },
    // 延时赋值给content
    // update: _.debounce(function (e) {
    //   this.content = e.target.value
    // }, 300),
    // 获取发表时间
    getDate: function() {
      let mydate, y, m, d, hh, mm, ss;
      mydate = new Date();
      y = mydate.getFullYear();
      m = mydate.getMonth() + 1;
      d = mydate.getDate();
      hh = mydate.getHours();
      mm = mydate.getMinutes();
      ss = mydate.getSeconds();
      if (m < 10) m = "0" + m;
      if (d < 10) d = "0" + d;
      if (hh < 10) hh = "0" + hh;
      if (mm < 10) mm = "0" + mm;
      if (ss < 10) ss = "0" + ss;
      this.date = y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
    },
    // 保存文章
    async saveArticle() {
      let self = this;
      if (this.title.length === 0) {
        this.$notify({
          title: "提醒",
          message: "请输入标题",
          type: "warning"
        });
        return;
      }
      if (this.content.length === 0) {
        this.$notify({
          title: "提醒",
          message: "请输入内容",
          type: "warning"
        });
        return;
      }
      if (this.gist.length === 0) {
        this.$notify({
          title: "提醒",
          message: "请输入简介",
          type: "warning"
        });
        return;
      }
      if (this.id) {
        // 更新文章
        let obj = {
          _id: this.id,
          title: this.title,
          date: this.date,
          content: this.content,
          gist: this.gist,
          labels: this.labels
        };
        this.$axios
          .post("admin/updateArticle", {
            articleInformation: obj
          })
          .then(
            response => {
              self.$message({
                message: "更新文章成功",
                type: "success"
              });
              // 更新完成后跳转至该文章的详情页
              // self.$router.push({ path: "articleDetail",query: { self.id } });
            },
            response => console.log(response)
          );
      } else {
        // 新建文章
        // 获取时间
        this.getDate();
        let obj = {
          title: this.title,
          date: this.date,
          content: this.content,
          gist: this.gist,
          labels: this.labels
        };
        this.$axios
          .post("admin/saveArticle", {
            articleInformation: obj
          })
          .then(
            response => {
              self.$message({
                message: "发表文章成功",
                type: "success"
              });
              // 保存成功后跳转至文章列表页
              self.refreshArticleList();
            },
            response => console.log(response)
          );
      }
    },
    // 保存成功后跳转至文章列表页
    refreshArticleList: function() {
      this.$router.push("/home/article");
    },
    goBack: function() {
      this.$router.go(-1);
    },
    // element标签组件
    handleClose: function(tag) {
      this.labels.splice(this.labels.indexOf(tag), 1);
    },
    showInput: function() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm: function() {
      let inputValue = this.inputValue;
      if (inputValue) this.labels.push(inputValue);
      this.inputVisible = false;
      this.inputValue = "";
    }
  }
};
</script>

<style scoped>
h1 {
  font: 60px;
}
.tag_wrap {
  margin-bottom: 1em;
}
.brief_wrap {
  margin-bottom: 1em;
}
.markdown_compiled {
  height: 428px;
  overflow: auto;
}
</style>
