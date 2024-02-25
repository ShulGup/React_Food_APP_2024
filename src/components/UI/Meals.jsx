import MealsItem from "./Meals-Item";
import useHttp from "../hooks/useHttps";
import Error from "./Error";

const requestConfig = {};

export default function Meals() {
  const { data, isLoading, error } = useHttp(
    "http://localhost:3000/meals",
    requestConfig,
    []
  );

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }
  return (
    <ul id="meals">
      {data.map((item) => (
        <MealsItem key={item.id} meal={item} />
      ))}
    </ul>
  );
}
