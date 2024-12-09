"use client";

import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import useAxios from "../useAxios";

interface CreateSellingArgs {
  productItem: { productId: string; qty: number }[];
}

const useCreateSelling = () => {
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const createSelling = async (payload: CreateSellingArgs) => {
    setIsLoading(true);
    try {
      await axiosInstance.post("/products/selling", payload);
      toast.success("Selling product successfully!");
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data || "An error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { createSelling, isLoading };
};

export default useCreateSelling;
