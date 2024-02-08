import { StateCreator } from "zustand";
import { AuthSlice } from "../types";

export const createAuthSlice : StateCreator<AuthSlice> = (set) => ({
    userInfo: null,
    setUserInfo: (userInfo) => {
        set({userInfo})
    }
});