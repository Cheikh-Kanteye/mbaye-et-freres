import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SkeletonTable = () => {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          {new Array(6).fill("").map((_, i) => (
            <TableHead key={i}>
              <Skeleton className="h-4 w-full" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {new Array(5).fill("").map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {/* Colonne Image */}
            <TableCell>
              <Skeleton className="h-10 w-10 rounded-sm" />
            </TableCell>

            {/* Colonne Nom */}
            <TableCell>
              <Skeleton className="h-4 w-[150px]" />
            </TableCell>

            {/* Colonne Prix */}
            <TableCell>
              <Skeleton className="h-4 w-[130px]" />
            </TableCell>

            {/* Colonne Catégorie */}
            <TableCell>
              <Skeleton className="h-4 w-[150px]" />
            </TableCell>

            {/* Colonne Actions */}
            <TableCell>
              <Skeleton className="h-4 w-[80px]" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SkeletonTable;
