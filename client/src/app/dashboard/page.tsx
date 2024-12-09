"use client";
import TableProductItem from "@/components/ProductItem";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AuthGuard from "@/hoc/AuthGuard";
import useGetProductList from "@/hooks/api/product/useGetProductList";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { ReactToPrint } from "react-to-print";

const Dashboard = () => {
  const router = useRouter();
  const { data, isLoading, refetch } = useGetProductList();

  const componentRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container min-h-screen grid grid-cols-5 gap-8 mt-14">
      <div className="flex flex-col gap-4">
        <Button onClick={() => router.push("/dashboard/purchasing")}>
          Purchasing
        </Button>
        <Button onClick={() => router.push("/dashboard/selling")}>
          Selling
        </Button>
        <Button onClick={() => router.push("/change-password")}>
          Change Password
        </Button>
      </div>
      <div className="col-span-3 flex flex-col" ref={componentRef}>
        <p className="mb-4 text-4xl font-black">Product List</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[600px]">Product Name</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((product, index) => {
              return (
                <TableProductItem
                  key={index}
                  name={product.name}
                  price={product.price}
                  stock={product.stock}
                />
              );
            })}
          </TableBody>

          <div className="mt-5">
            <ReactToPrint
              trigger={() => {
                return <Button>Print</Button>;
              }}
              content={() => componentRef.current}
              documentTitle="Product List"
              pageStyle="print"
            />
          </div>
        </Table>
      </div>
    </div>
  );
};

export default AuthGuard(Dashboard);
