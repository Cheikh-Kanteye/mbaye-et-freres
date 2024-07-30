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
import { Famille, FamilleWCategorie } from "@/types";
import SkeletonTable from "./SkeletonTable";
import AddEntityBtn from "./AddEntityBtn";
import { famille_columns } from "./famille_columns";
import AddFamilleForm from "./AddFamilleForm";
import SelectData from "./SelectData";
import { Input } from "@/components/ui/input";

const FamilleList = ({
  data,
  pending,
}: {
  data: FamilleWCategorie[];
  pending: Boolean;
}) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [selectedCategorie, setSelectedCategorie] = React.useState<
    string | undefined
  >("");
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});

  // Filtrage des données par catégorie et par recherche
  const filteredData = React.useMemo(() => {
    let filtered = data;

    if (selectedCategorie) {
      filtered = filtered.filter(
        (item) => item.categories.id === parseInt(selectedCategorie)
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.nom.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [data, selectedCategorie, searchTerm]);

  const table = useReactTable({
    data: filteredData, // Utiliser les données filtrées
    columns: famille_columns,
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
    setSelectedCategorie(value || ""); // Mettre à jour l'état de la catégorie sélectionnée avec l'ID
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <section className="max-w-screen-lg mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex flex-1 gap-2 items-center">
          <Input
            type="text"
            placeholder="Rechercher une famille..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-fit"
          />
          <SelectData
            type="categories"
            placeholder="Filtrer par catégorie"
            label="Catégorie"
            onChange={handleCategorieChange}
            value={selectedCategorie}
            className="w-auto"
          />
        </div>
        <AddEntityBtn
          label="Ajouter famille"
          desc="Ajoute une nouvelle famille"
        >
          <AddFamilleForm />
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
                  colSpan={famille_columns.length}
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

export default FamilleList;
