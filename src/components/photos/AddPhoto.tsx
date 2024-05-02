import React, { useCallback, useState, useTransition } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import photosServices from "../../services/photosServices";
import { TPhoto } from "../../models/TPhotos";
import styles from "./AddPhoto.module.css"
import Button from "../../ui-kit/Button/Button";
import { useTranslation } from "react-i18next";

export const AddPhoto: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const queryClient = useQueryClient();

    const { t } = useTranslation()

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
                {t('choseFile')}
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
            <Button text={t("upload")} type="submit" disabled={!selectedFile} />
        </form>
    );
};
