import { Article } from "@/types/article";
import { Comment } from "@/types/comment";
import { reactive, toRefs, type InjectionKey } from "vue";

type State = {
  articles: Array<Article>;
};

export const useStore = () => {
  //state
  const globalState = reactive<State>({
    articles: [
      new Article(3, "佐藤", "アイウエオ", []),
      new Article(2, "山田", "こんにちは", [
        new Comment(13, "鈴木", "ヤッホー", 2),
      ]),
    ],
  });

  //actions
  const setArticle = () => {
    globalState.articles;
  };

  const addArticle = (article: Article) => {
    globalState.articles.unshift(article);
  };

  const addComment = (comment: Comment) => {
    const article = globalState.articles.find(
      (article) => article.id === comment.articleId
    );
    if (article) {
      const newComment = new Comment(
        comment.id,
        comment.name,
        comment.content,
        comment.articleId
      );
      article.commentList.unshift(newComment);
    }
  };

  const deleteArticle = (index: number) => {
    for (let i = 0; i < globalState.articles.length; i++) {
      if (i === index) {
        globalState.articles.splice(index, 1);
      }
    }
  };

  return {
    ...toRefs(globalState),
    addArticle,
    deleteArticle,
    setArticle,
    addComment,
  };
};

type storeType = ReturnType<typeof useStore>;
export const storeKey: InjectionKey<storeType> = Symbol("store");
