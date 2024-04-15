import React, { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import photosServices from "../../services/photosServices";
import { TPhoto } from "../../models/TPhotos";
import styles from "./AddPhoto.module.css"

export const AddPhoto: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const mutationAddPhoto = useMutation({
        mutationFn: async (newPhoto: TPhoto) => {
            const result = await photosServices.addPhoto(newPhoto);
            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["photos"] });
            setSelectedFile(null);
            setPreviewUrl(null);
            alert("Photo uploaded successfully");
        },
        onError: () => {
            alert("Failed to upload photo");
        },
    });

    const handleSubmit = useCallback(
        (event: React.FormEvent) => {
            event.preventDefault();
            if (selectedFile) {
                const newPhoto: TPhoto = {
                    albumId: 0,
                    id: 0, // убрать из отправки
                    title: selectedFile.name,
                    url: "",
                    thumbnailUrl: "",
                };
                mutationAddPhoto.mutate(newPhoto);
            }
        },
        [mutationAddPhoto, selectedFile]
    );

    return (
        <form className={styles.addphoto} onSubmit={handleSubmit}>
            <label>
                Choose file:
                <input type="file" onChange={handleFileChange} />
            </label>
            {previewUrl && (
                <div>
                    <img
                        src={previewUrl}
                        alt="Preview"
                        style={{ maxWidth: "100%", maxHeight: "300px" }}
                    />
                </div>
            )}
            <button type="submit" disabled={!selectedFile}>
                Upload
            </button>
        </form>
    );
};
