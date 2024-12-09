"use client";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { logoutAction } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Role } from "@/types/user.type";

const Navbar = () => {
  const router = useRouter();
  const { username, id, role } = useAppSelector((state) => state.user);

  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("token");
    dispatch(logoutAction());
  };
  return (
    <>
      <div className="sticky top-0 hidden md:block bg-white shadow-md z-50">
        <div className="container px-4 mx-auto flex justify-between items-center h-14 ">
          <div className="flex gap-4 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-xl font-bold">{username}</p>
          </div>
          <p
            className="text-3xl cursor-pointer font-extrabold text-primary"
            onClick={() => {
              if (role === Role.ADMIN) {
                router.push("/dashboard");
              } else {
                router.push("/");
              }
            }}
          >
            VAN's
          </p>
          <div className="flex gap-8">
            {id ? (
              <div>
                <Button
                  className="font-bold"
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                className="font-bold hover:bg-primary hover:text-white"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
