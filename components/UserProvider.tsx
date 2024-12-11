"use client";

import { FC, ReactNode, createContext, useContext } from "react";
import { redirect, usePathname } from "next/navigation";

interface IUserProviderProps {
  children: ReactNode;
  data: { type: string };
}

const UserContext = createContext<any>(null);

export const useUser = () => useContext(UserContext) || {};

const UserProvider: FC<IUserProviderProps> = ({ children, data }) => {
  const pathname = usePathname();

  if (pathname.includes(data.type)) {
    return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
  }

  return redirect("/" + data.type);
};

export default UserProvider;
