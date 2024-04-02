import axios from "axios";
import { TPhotos } from "../models/TPhotos";

class PhotosServices {
  private URL = "https://jsonplaceholder.typicode.com/photos";

  async getAll() {
    return axios.get<TPhotos[]>(`${this.URL}`);
  }
}

export default new PhotosServices();
