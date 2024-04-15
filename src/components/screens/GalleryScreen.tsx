import { TPhoto } from "../../models/TPhotos";
import { usePhotoItem } from "../../hooks/usePhotoItem"
import ItemPhoto from '../photos/ItemPhoto';
import { NavLink } from 'react-router-dom'
import { AddPhoto } from "../photos/AddPhoto";
import styles from "./Gallery.module.css"

const Gallery: React.FC = () => {
    const { data, isLoading, isError } = usePhotoItem();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    if (!data || !Array.isArray(data)) {
        return <div>No data available</div>;
    }

    return (
        <div className={styles.gallery}>
            <AddPhoto />
            <div className={styles.photos}>
                {data.map((photo: TPhoto) => (
                    <NavLink key={photo.id} to={`/photo/${photo.id}`}>
                        <ItemPhoto photo={photo} />
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Gallery;
