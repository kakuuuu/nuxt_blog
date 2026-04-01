<template>
  <div id="content">
    <el-table :data="articleList" style="width: 100%" fit="false">
      <el-table-column label="文章">
        <template slot-scope="scope">
          <div class="article_info">
            <span class="article_info_date">发表于：{{ scope.row.date }}</span>
            <span class="article_info_label"
              >标签：
              <span v-if="scope.row.labels.length === 0">未分类</span>
              <el-tag
                v-else
                class="tag_margin"
                size="small"
                type="info"
                effect="plain"
                v-for="(tag, index) in scope.row.labels"
                :key="index"
                >{{ tag }}</el-tag
              >
            </span>
          </div>
          <div class="article_title" @click="articleEdit(scope.row._id)">
            {{ scope.row.title }}
          </div>
          <div class="article_gist">{{ scope.row.gist }}</div>
          <div class="button_edit">
            <el-button type="info" size="small" plain @click="articleEdit(scope.row._id)">修改</el-button>
            <el-button type="danger" size="small" plain @click="deleteArticle(scope.row._id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleList: []
    };
  },
  async asyncData(context) {
    const { data } = await context.$axios.get("articleList");
    return { articleList: data.reverse() };
  },
  methods: {
    // 跳转至文章编辑页
    articleEdit: function(id) {
      this.$router.push({ path: "write", query: { id } });
    },
    // 删除文章
    deleteArticle: function(id) {
      let self = this;
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          self.$axios
            .post("admin/deleteArticle", {
              _id: id
            })
            .then(
              response => {
                self.$message({
                  type: "success",
                  message: "删除成功!"
                });
                self.fetchData();
              },
              response => {
                console.log(response);
              }
            );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 更新数据
    async fetchData(){
      const { data } = await this.$axios.get("articleList");
      this.articleList=data;
    }
  }
};
</script>

<style scoped>
.article_wrap {
  padding: 40px;
}

.article_title {
  display: inline-block;
  color: #2e3135;
  font-size: 24px;
  font-weight: 600;
  margin: 10px;
  /* border-bottom: 1px solid white; */
  cursor: pointer;
}

.article_title:hover {
  text-decoration: underline;
}

.article_info {
  color: #999;
  font-size: 14px;
  margin: 10px;
}

.tag_margin {
  margin: 3px;
}

.article_gist {
  text-align: left;
  margin: 10px;
  font-size: 16px;
}
.button_edit{
  margin-left:10px;
}
</style>
