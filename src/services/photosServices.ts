import axios from "axios";
import { TPhoto } from "../models/TPhotos";

class PhotosServices {
  private URL = "https://jsonplaceholder.typicode.com/photos";

  async getAll() {
    return axios.get<TPhoto[]>(`${this.URL}?page=4&size=10`); // instead of "infinite scroll" add pagination to photos
  }
  async deletePhoto(id: number) {
    try {
      await axios.delete(`${this.URL}/${id}`);
    } catch (error) {
      throw new Error("Failed to delete comment");
    }
  }
  async addPhoto(photo: {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
  }) {
    const newPhoto: TPhoto = {
      albumId: photo.albumId,
      id: photo.id,
      title: photo.title,
      url: photo.url,
      thumbnailUrl: photo.thumbnailUrl,
    };
    try {
      const response = await axios.post<TPhoto>(this.URL, newPhoto);
      return response.data;
    } catch (error) {
      throw new Error("Failed to add photo");
    }
  }
}

export default new PhotosServices();
