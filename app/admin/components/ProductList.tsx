"use client";
import * as React from "react";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { product_colums } from "./product_colums";
import SkeletonTable from "./SkeletonTable";
import AddEntityBtn from "./AddEntityBtn";
import AddProduitForm from "./AddProduitForm";
import SelectData from "./SelectData";
import { produit } from "@prisma/client";

const ProductList = ({
  data,
  pending,
}: {
  data: produit[];
  pending: boolean;
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [selectedCategorie, setSelectedCategorie] = React.useState<string>();
  const [selectedFamille, setSelectedFamille] = React.useState<string>();

  const table = useReactTable({
    data,
    columns: product_colums,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const handleCategorieChange = (value: string | undefined) => {
    setSelectedCategorie(value!);
    table.getColumn("categorie")?.setFilterValue(value || "");
  };

  const handleFamilleChange = (value: string | undefined) => {
    setSelectedFamille(value!);
    table.getColumn("famille")?.setFilterValue(value || "");
  };

  return (
    <section className="max-w-screen-lg mx-auto">
      <div className="flex justify-between gap-2 items-center">
        <div className="flex flex-1 items-center py-4 gap-2">
          <SelectData
            type="categories"
            placeholder="Filtrer par catégorie"
            label="Catégorie"
            onChange={handleCategorieChange}
            value={selectedCategorie}
            className="w-fit"
          />
          <SelectData
            type="familles"
            placeholder="Filtrer par famille"
            label="Famille"
            onChange={handleFamilleChange}
            value={selectedFamille}
            className="w-fit"
          />
        </div>
        <AddEntityBtn label="Ajouter produit" desc="Ajouter un nouveau produit">
          <AddProduitForm />
        </AddEntityBtn>
      </div>
      {!pending ? (
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="capitalize">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="items-center">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="text-left" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={product_colums.length}
                  className="h-24 text-center"
                >
                  Aucun résultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <SkeletonTable />
      )}
    </section>
  );
};

export default ProductList;
