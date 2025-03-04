import { usePagination } from "../hooks/usePagination";

const Pagination = ({ totalResults }: { totalResults: number }) => {
  const { currentPage, updatePage, totalPages } = usePagination(totalResults);
  const page = currentPage ?? 1;
  return (
    <nav className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <p className="text-sm text-gray-700">
        Showing <span className="font-medium">{(page - 1) * 10 + 1}</span> to{" "}
        <span className="font-medium">{Math.min(page * 10, totalResults)}</span>{" "}
        of <span className="font-medium">{totalResults}</span> results
      </p>
      <div className="flex">
        <button
          onClick={() => updatePage(Math.max(page - 1, 1))}
          disabled={page === 1}
          className={`px-3 py-2 text-sm font-semibold border rounded-md ${
            page === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-900 hover:bg-gray-100"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => updatePage(Math.min(page + 1, totalPages))}
          disabled={page === totalPages}
          className={`ml-3 px-3 py-2 text-sm font-semibold border rounded-md ${
            page === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-900 hover:bg-gray-100"
          }`}
        >
          Next
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
