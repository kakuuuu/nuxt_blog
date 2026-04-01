<template>
  <div>
    <div id="content">
      <div class="article_wrap">
        <div class="article_title article_detail_title">
           <h1>
             {{ article.title }}
            </h1>
        </div>
        <div class="article_info">
          <span class="article_info_date">{{ article.date }}</span>
        </div>
        <div class="article_detail_content" v-html="compiledMarkdown()"></div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import highlight from "highlight.js";
marked.setOptions({
  highlight: function (code) {
    return highlight.highlightAuto(code).value;
  }
});
export default {
  data() {
    return {
      article: {}
    };
  },
  mounted: async function () {
    let id = this.$route.query.id;
    const { data } = await this.$axios.get("articleDetail/" + id);
    this.article = data;
  },
  methods: {
    compiledMarkdown: function () {
      return marked(this.article.content || "", { sanitize: true });
    }
  }
};
</script>

<style>
.article_detail_title {
  cursor: default;
  margin: 40px 0 0;
  font-size:2em;
}
.article_info_date{
  font:#909090;
}

.article_detail_content {
  text-align: left;
  padding: 60px 0;
  font-size: 18px;
}
</style>
