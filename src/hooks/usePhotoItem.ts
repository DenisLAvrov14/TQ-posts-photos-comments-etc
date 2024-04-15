import { useQuery } from "@tanstack/react-query";
import photoItemServices from "../services/photoItemServices";
import { TPhoto } from "../models/TPhotos";

export const usePhotoItem = () => {
  return useQuery<TPhoto[], Error>({
    queryKey: ["photoItem"],
    queryFn: () => photoItemServices.getAll(),
    retry: 3,
  });
};

export default usePhotoItem;
