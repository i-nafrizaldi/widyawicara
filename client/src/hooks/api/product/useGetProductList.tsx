"use client";

import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import useAxios from "../useAxios";
import { Product } from "@/types/product.type";

const useGetProductList = () => {
  const { axiosInstance } = useAxios();
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  
  

  const getProductList = async () => {
    try {
      const { data } = await axiosInstance.get("/products",);
      setData(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        (error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  return { data, isLoading, refetch: getProductList };
};

export default useGetProductList;
