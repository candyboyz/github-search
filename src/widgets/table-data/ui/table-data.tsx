"use client";
import { ReposState } from "@/shared/store/slices/reposSlice";
import { TablePaginations } from "@/features/pagination";
import { Table } from "@/features/table";
import React from "react";
import { useSelector } from "react-redux";

export const TableData = () => {
  const state = useSelector((state: { repos: ReposState }) => state.repos);

  return (
    <div className="w-full h-full flex flex-col pl-8 pr-4 pt-6 gap-6">
      {state.items.length <= 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          <h1 className="text-[46px] leading-[65.78px] tracking-[0.17px] text-[#4F4F4F]">
            Добро пожаловать
          </h1>
        </div>
      ) : (
        <>
          <h1 className="text-[48px] leading-[56.02px]">Результаты поиска</h1>
          <Table />
          <TablePaginations />
        </>
      )}
    </div>
  );
};
