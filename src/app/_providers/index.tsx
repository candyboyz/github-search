"use client";

import { store } from "@/shared/store/repos";
import { Provider } from "react-redux";

type ProviderProps = {
  children: React.ReactNode;
};

export const Providers = ({ children }: ProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};
