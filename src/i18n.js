import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: "ru",
    resources: {
      en: {
        translation: {
          posts: "Posts",
          gallery: "Gallery",
          home: "Home",
          delete: "Delete",
          name: "Name :",
          email: "E-mail :",
          comment: "Comment",
          submit: "Submit",
          learn: "Learn more",
          addNewPost: "Add new Post",
          postTitle: "Post title :",
          content: "Content :",
          save: "Save",
          choseFile: "Choose file :",
          upload: "Upload",
        },
      },
      ru: {
        translation: {
          posts: "Посты",
          gallery: "Галерея",
          home: "Главная",
          delete: "Удалить",
          name: "Имя :",
          email: "Почта :",
          comment: "Комментарий :",
          submit: "Отправить",
          learn: "Посмотреть",
          addNewPost: "Добавьте пост",
          postTitle: "Заголок :",
          content: "Текст :",
          save: "Сохранить",
          choseFile: "Выберите файл :",
          upload: "Загрузить",
        },
      },
    },
  });
