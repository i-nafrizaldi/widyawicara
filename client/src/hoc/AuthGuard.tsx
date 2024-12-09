"use client";

import { useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGuard(Component: any) {
  return function IsAuth(props: any) {
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useAppSelector((state) => state.user);

    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, []);

    useEffect(() => {
      if (!id && !isLoading) {
        redirect("/login");
      }
    }, [id, isLoading]);

    if (isLoading || !id) {
      return (
        <div className="flex flex-col px-6 h-screen place-content-center items-center gap-4">
          <div className="animate-pulse">
            <p>Loading</p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
