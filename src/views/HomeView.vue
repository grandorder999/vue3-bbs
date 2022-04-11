<script setup lang="ts">
import { Article } from "@/types/article";
import { storeKey } from "@/providers/storeProvider";
import { inject, onMounted, ref } from "vue";
import CompComment from "@/components/CompComment.vue";

const name = ref("");
const content = ref("");
const store = inject(storeKey);
if (!store) {
  throw new Error("");
}

//メソッド
onMounted(() => {
  store.setArticle();
});
const saveArticle = (): void => {
  //IDの採番(時間があればする)
  const newArticle = new Article(1, name.value, content.value, []);
  store.addArticle(newArticle);
  name.value = "";
  content.value = "";
};
</script>

<template>
  <div class="container">
    <div id="app">掲示板画面</div>

    <!-- <div class="articleNameErrorMessage">{{ articleNameErrorMessage }}</div> -->
    <div>投稿者名：<input type="text" v-model="name" /></div>
    <!-- <div class="articleContentErrorMessage">
      {{ articleContentErrorMessage }}
    </div> -->
    <div>
      投稿内容：<textarea
        name="textarea"
        cols="30"
        rows="5"
        v-model="content"
      ></textarea>
    </div>
    <button type="button" v-on:click="saveArticle">記事投稿</button><br />
    <hr />

    <div
      v-for="(article, articleIndex) of store.articles.value"
      :key="article.id"
    >
      <div>投稿者名：{{ article.name }}</div>
      <div>
        投稿内容：
        <pre>{{ article.content }}</pre>
      </div>

      <button type="button" v-on:click="store.deleteArticle(articleIndex)">
        記事削除</button
      ><br />

      <div v-for="comment of article.commentList" :key="comment.id">
        <div>コメント者名：{{ comment.name }}</div>
        <div>
          コメント内容：
          <pre>{{ comment.content }}</pre>
        </div>
      </div>

      <CompComment v-bind:article-id="article.id"></CompComment>
      <hr />
    </div>
  </div>
</template>
