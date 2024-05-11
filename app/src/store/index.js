import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const storeName = `@${process.env.REACT_APP_NAME?.replaceAll(
  " ",
  "_"
).toUpperCase()}`;

const usePersistStore = create(
  persist(
    (set) => ({
      token: "",
      setToken: (t) => set({ token: t }),
      user: null,
      setUser: (t) => set({ user: t }),
      logout: () =>
        set({
          token: "",
          user: null,
        }),
    }),
    {
      name: storeName,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

const useStore = create((set) => ({
  keyword: "",
  setKeyword: (t) => set({ keyword: t }),
}));

export { usePersistStore, useStore };
