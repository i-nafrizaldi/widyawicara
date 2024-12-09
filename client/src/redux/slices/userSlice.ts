import { Role, User } from "@/types/user.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { date } from "zod";

const initialState: Pick<User, "id" | "username" | "role"> = {
  id: 0,
  username: "",
  role: Role.USER,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
    logoutAction: (state) => {
      state.id = 0;
      state.username = "";
      state.role = Role.ADMIN;
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;

export default userSlice.reducer;
