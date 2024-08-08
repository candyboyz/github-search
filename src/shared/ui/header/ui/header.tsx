import React from "react";
import { Search } from "./search";

export const Header = () => {
  return (
    <header className="w-full h-[80px] bg-[#00838F] flex items-center px-8">
      <Search />
    </header>
  );
};
