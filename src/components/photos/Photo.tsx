import { useParams, NavLink } from "react-router-dom";
import Comments from "../../features/comments/Comments";
import ItemPhoto from "./ItemPhoto";
import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import photoItemServices from "../../services/photoItemServices";
import styles from "./Photo.module.css"

export const PhotoCard: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [photo, setPhoto] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`);
                setPhoto(response.data);
                setLoading(false);
            } catch (error) {
                const axiosError = error as AxiosError;
                setError(axiosError.message);
                setLoading(false);
            }
        };
        fetchPhoto();
    }, [id]);

    const queryClient = useQueryClient();

    const mutationDeletePhoto = useMutation({
        mutationFn: async (id: number) => {
            const result = await photoItemServices.deleteItemPhoto(id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["photoItem"] });
        }
    });

    const onDeletePhoto = useCallback(async (id: number) => {
        await mutationDeletePhoto.mutate(id);
        alert("Photo was deleted");
    }, [mutationDeletePhoto]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!photo) {
        return <div>No photo found</div>;
    }

    return (
        <div className={styles.photoCard}>
            <div className={styles.photo}>
                <ItemPhoto photo={photo} />
                <button onClick={() => onDeletePhoto(photo.id)}>Delete</button>
            </div>
            <Comments post={photo} />
            <NavLink to="/gallery">Back to Gallery</NavLink>
        </div>
    );
}

export default PhotoCard;
