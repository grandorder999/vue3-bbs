<script setup lang="ts">
import { storeKey } from "@/providers/storeProvider";
import { ref, inject } from "vue";
import { Comment } from "@/types/comment";

defineProps<{
  articleId: number;
}>();
const commentName = ref("");
const commentContent = ref("");
const store = inject(storeKey);
if (!store) {
  throw new Error("");
}

//メソッド
const addComment = (articleId: number): void => {
  console.log(articleId);
  const newComment = new Comment(
    -1,
    commentName.value,
    commentContent.value,
    articleId
  );
  store.addComment(newComment);
  commentName.value = "";
  commentContent.value = "";
};
</script>

<template>
  <div class="compcomment">
    <div class="commentNameErrorMessage">{{ commentNameErrorMessage }}</div>
    <div>名前：<br /><input type="text" v-model="commentName" /></div>
    <div class="commentContentErrorMessage">
      {{ commentContentErrorMessage }}
    </div>
    <div>
      コメント：<br /><textarea
        name="textarea"
        cols="30"
        rows="5"
        v-model="commentContent"
      ></textarea>
    </div>
    <button type="button" v-on:click="addComment(articleId)">
      コメント投稿</button
    ><br />
  </div>
</template>

<style scoped></style>
