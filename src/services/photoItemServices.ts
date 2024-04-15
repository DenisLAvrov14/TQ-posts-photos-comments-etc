import axios from "axios";
import { TPhoto } from "../models/TPhotos";

class PhotoItemService {
  private URL = "https://jsonplaceholder.typicode.com/photos";

  async getAll(): Promise<TPhoto[]> {
    try {
      const response = await axios.get<TPhoto[]>(this.URL);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch photos");
    }
  }
  async deleteItemPhoto(id: number) {
    try {
      await axios.delete(`${this.URL}/${id}`);
    } catch (error) {
      throw new Error("Failed to delete comment");
    }
  }
}

export default new PhotoItemService();
