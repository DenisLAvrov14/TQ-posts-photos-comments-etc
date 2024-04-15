import React from "react";
import Slider from "react-slick";
import { TPhoto } from "../../models/TPhotos";
import ItemPhoto from "../photos/ItemPhoto";
import styles from "./HomeContainer.module.css";
import { NavLink } from "react-router-dom";

interface HomeProps {
    data: TPhoto[];
}

const Home: React.FC<HomeProps> = ({ data }) => {
    const sliderSettings = {
        focusOnSelect: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        speed: 500
    };

    return (
        <div className={styles.slider}>
            <div className={styles.card}>
                <Slider {...sliderSettings}>
                    {data.map((photo: TPhoto) => (
                        <section>
                            <ItemPhoto photo={photo} />
                            <p className={styles["clamped-text"]}>{photo.title}</p>
                            <NavLink to={`/photo/${photo.id}`}>
                                <button className={styles.btnLearnMore}>Learn more</button>
                            </NavLink>
                        </section>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Home;
