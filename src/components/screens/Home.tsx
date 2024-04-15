import usePhotoItem from "../../hooks/usePhotoItem";
import Home from "../home/HomeContainer";

const HomeContainer: React.FC = () => {
    const { data, isLoading, isError } = usePhotoItem();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    if (!data) {
        return <div>No data available</div>;
    }

    return <Home data={data} />;
};

export default HomeContainer;

