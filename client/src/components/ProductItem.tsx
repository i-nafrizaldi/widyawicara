"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { FC } from "react";

interface ProductItemStock {
  name: string;
  stock: number;
  price: number;
}
const TableProductItem: FC<ProductItemStock> = ({ name, stock, price }) => {
  return (
    <TableRow className="text-md">
      <TableCell>{name}</TableCell>
      <TableCell>{stock}</TableCell>
      <TableCell>{price}</TableCell>
    </TableRow>
  );
};
export default TableProductItem;
