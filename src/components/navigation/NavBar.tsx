import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { changeLanguage } from "i18next";

const locales = {
    en: { title: "English" },
    ru: { title: "Русский" },
};

export const NavBar = () => {
    const { t } = useTranslation();

    return (
        <header className={styles.header}>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/home">{t("home")}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/gallery">{t("gallery")}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/posts">{t("posts")}</NavLink>
                    </li>
                </ul>
            </nav>
            <div className={styles.languageSelector}>
                <button title={locales.en.title} onClick={() => changeLanguage("en")}>
                    EN
                </button>
                <button title={locales.ru.title} onClick={() => changeLanguage("ru")}>
                    RU
                </button>
            </div>
        </header>
    );
};
