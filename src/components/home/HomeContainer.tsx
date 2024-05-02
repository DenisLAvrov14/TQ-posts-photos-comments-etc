import React, { useState } from "react";
import Slider from "react-slick";
import { TPhoto } from "../../models/TPhotos";
import ItemPhoto from "../photos/ItemPhoto";
import styles from "./HomeContainer.module.css";
import { NavLink } from "react-router-dom";
import Button from "../../ui-kit/Button/Button";
import { useTranslation } from "react-i18next";

interface HomeProps {
    data: TPhoto[];
}

const sliderSettings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    speed: 500
};

export const Home: React.FC<HomeProps> = ({ data }) => {

    const { t, i18n } = useTranslation();

    const [loadedPhotos, setLoadedPhotos] = useState<TPhoto[]>(data.slice(0, 9)); // Загружаем только первые 9 фотографий
    const [nextIndex, setNextIndex] = useState(9); // Следующий индекс для загрузки

    const handleSlideChange = (currentSlide: number) => {
        if (currentSlide + 1 >= loadedPhotos.length) {
            // Если пользователь пролистал до последней загруженной фотографии, загрузим следующие 9
            const nextPhotos = data.slice(nextIndex, nextIndex + 9);
            setLoadedPhotos([...loadedPhotos, ...nextPhotos]);
            setNextIndex(nextIndex + 9);
        }
    };

    return (
        <div className={styles.slider}>
            <div className={styles.card}>
                <Slider {...sliderSettings} beforeChange={handleSlideChange}>
                    {loadedPhotos.map((photo, index) => (
                        <section key={index}>
                            <ItemPhoto photo={photo} />
                            <p className={styles.clampedText}>{photo.title}</p>
                            <NavLink to={`/photo/${photo.id}`}>
                                <Button text={t('learn')} className={styles.btnLearnMore} />
                            </NavLink>
                        </section>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Home;
