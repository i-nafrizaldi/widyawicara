"use client";

import { useAppDispatch } from "@/redux/hooks";
import { loginAction } from "@/redux/slices/userSlice";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import useAxios from "../useAxios";

interface UpdateUser {
  password: string;
  newPassword: string;
}

const useUpdateUser = () => {
  const dispatch = useAppDispatch();
  const { axiosInstance } = useAxios();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateUser = async (payload: UpdateUser) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.patch(`/users/profile`, payload);

      dispatch(loginAction(data));
      toast.success("Password changed successfully!");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { updateUser, isLoading };
};

export default useUpdateUser;
