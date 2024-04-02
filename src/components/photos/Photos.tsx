import React from 'react';
import { TPhotos } from '../../models/TPhotos';

interface PhotosProps {
    photos: TPhotos[];
}

const Photos: React.FC<PhotosProps> = ({ photos }) => {
    return (
        <div className="photos">
            <h1>My Photos</h1>
            <div>
                {photos.map(photo => (
                    <p key={photo.id}>{photo.title}</p>
                ))}
            </div>
        </div>
    );
};

export default Photos;
