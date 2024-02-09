import { create } from "zustand"
import { createAuthSlice } from "./slices/AuthSlice"
import { AuthSlice } from "./types"

export const useAppStore = create<AuthSlice>()((...a) => ({
  ...createAuthSlice(...a),
}))
