import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguegeDetector from "i18next-browser-languagedetector";

i18next
  .use(initReactI18next)
  .use(LanguegeDetector)
  // .use(Backend)
  .init({
    debuug: true,
    fallbackLng: "en",
    resourses: {
      en: {
        translation: {
          posts: "Posts",
          gallery: "Gallery",
          home: "Home",
        },
      },
      ru: {
        translation: {
          posts: "Посты",
          gallery: "Галерея",
          home: "Главная",
        },
      },
    },
  });
