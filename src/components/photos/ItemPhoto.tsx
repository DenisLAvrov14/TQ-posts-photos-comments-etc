import { TPhoto } from "../../models/TPhotos";

type ItemPhotoProps = {
    photo: TPhoto;
};

const ItemPhoto: React.FC<ItemPhotoProps> = ({ photo }) => {
    return <img src={photo.thumbnailUrl} alt="" />;
};

export default ItemPhoto;
