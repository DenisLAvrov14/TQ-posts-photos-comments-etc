import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const locales: Record<string, { title: string }> = {
    en: { title: "English" },
    ru: { title: "Русский" },
};


export const NavBar = () => {
    const { t, i18n } = useTranslation();

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
                {Object.keys(locales).map((locale) => (
                    <button title={locales[locale].title} type="submit" key={locale} onClick={() => i18n.changeLanguage(locale)} disabled={i18n.resolvedLanguage === locale}>
                        {locales[locale].title}
                    </button>
                ))}
            </div>
        </header>
    );
};
