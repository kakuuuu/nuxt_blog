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
          <div class="article_title" @click="articleDetail(scope.row._id)">
            {{ scope.row.title }}
          </div>
          <div class="article_gist">{{ scope.row.gist }}</div>
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
    articleDetail: function(id) {
      this.$router.push({ path: "articleDetail", query: { id } });
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
  margin:10px;
  /* border-bottom: 1px solid white; */
  cursor: pointer;
}

.article_title:hover {
  text-decoration:underline;
}

.article_info {
  color: #999;
  font-size: 14px;
  margin:10px;
}

.tag_margin {
  margin: 3px;
}

.article_gist {
  text-align: left;
  margin:10px;
  font-size: 16px;
}
</style>
