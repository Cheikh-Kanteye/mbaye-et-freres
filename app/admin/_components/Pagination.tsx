import * as React from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  table: any;
  filteredDataLength: number;
  maxPagesVisible?: number; // Optional prop to control the maximum number of visible pages
}

const Pagination: React.FC<PaginationProps> = ({
  table,
  filteredDataLength,
  maxPagesVisible = 5, // Default value for maximum visible pages
}) => {
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

  // Create an array of page numbers to display
  const createPaginationRange = (
    current: number,
    total: number,
    maxVisible: number
  ) => {
    const range: (number | string)[] = [];
    const sideCount = Math.floor(maxVisible / 2);

    // Define the start and end of the range
    let start = Math.max(0, current - sideCount);
    let end = Math.min(total, current + sideCount + 1);

    // Adjust the range if it's too small
    if (start > 1) range.push(1, "...");
    for (let i = start; i < end; i++) {
      range.push(i + 1);
    }
    if (end < total - 1) range.push("...", total);

    return range;
  };

  const pageNumbers = createPaginationRange(
    currentPage,
    pageCount,
    maxPagesVisible
  );

  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-4">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="hidden sm:block"
        >
          Précédent
        </Button>

        {pageNumbers.map((page, index) =>
          typeof page === "number" ? (
            <Button
              key={index}
              variant={currentPage === page - 1 ? "default" : "outline"}
              onClick={() => table.setPageIndex(page - 1)}
            >
              {page}
            </Button>
          ) : (
            <span key={index} className="px-2">
              ...
            </span>
          )
        )}

        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="hidden sm:block"
        >
          Suivant
        </Button>
      </div>
      <span className="mt-2 md:mt-0">
        Affichage de {table.getRowModel().rows.length} résultats sur{" "}
        {filteredDataLength} entrées
      </span>
    </div>
  );
};

export default Pagination;
