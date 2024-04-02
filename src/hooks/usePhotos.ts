import { useQuery } from "@tanstack/react-query";
import photosServices from "../services/photosServices";

export const usePhotos = () => {
  return useQuery({
    queryKey: ["photos"],
    queryFn: () => photosServices.getAll(),
    select: ({ data }) => data,
    retry: 3,
  });
};
