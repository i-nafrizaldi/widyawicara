"use client";

import { loginAction } from "@/redux/slices/userSlice";
import { Role, User } from "@/types/user.type";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import useAxios from "../useAxios";

interface LoginResponses {
  message: string;
  data: User;
  token: string;
}

interface LoginArgs {
  role?: Role;
  password?: string;
  username: string;
}
const useLogin = () => {
  const { axiosInstance } = useAxios();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = async (payload: LoginArgs) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post<LoginResponses>(
        "/users/login",
        payload
      );

      dispatch(loginAction(data.data));
      localStorage.setItem("token", data.token);
      if (data.data.role === Role.ADMIN) {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
      toast.success(data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};

export default useLogin;
