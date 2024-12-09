"use client";

import { AxiosError } from "axios";
import { Product } from "@/types/product.type";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import useAxios from "../useAxios";

interface CreatePurchasingArgs {
  productItem: { productId: string; qty: number }[];
}

const useCreatePurchasing = () => {
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createOrder = async (payload: CreatePurchasingArgs) => {
    setIsLoading(true);
    try {
      await axiosInstance.post("/products/purchasing", payload);
      toast.success("Purchase order created successfully!");
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data || "An error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { createOrder, isLoading };
};

export default useCreatePurchasing;
