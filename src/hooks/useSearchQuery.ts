import { useSearchParams } from "react-router-dom";

export const useSearchQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("query") || "";

  const updateSearch = (search: string) => {
    setSearchParams({ query: search, page: "1" });
  };

  return {
    searchTerm,
    updateSearch,
  };
};
