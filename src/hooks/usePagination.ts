import { useSearchParams } from "react-router-dom";

export const usePagination = (totalResults: number) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("query") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const totalPages = Math.ceil(totalResults / 10); // API returns 10 results per page

  const updatePage = (newPage: number) => {
    setSearchParams({ query: searchTerm, page: newPage.toString() });
  };

  return {
    currentPage,
    totalPages,
    updatePage,
  };
};
