"use client";
import { ReposState } from "@/shared/store/slices/reposSlice";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Star } from "@mui/icons-material";
import { Badge } from "@/shared/ui/badge";

export const Sidebar = () => {
  const state = useSelector((state: { repos: ReposState }) => state.repos);

  const selected = useMemo(
    () => state.items.filter((item) => item.id === state.select[0])[0],
    [state],
  );

  if (state.items.length <= 0) return null;

  return (
    <aside className="max-w-[480px] w-full h-full bg-[#F2F2F2]">
      {state.select?.length <= 0 && !selected ? (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-[#4F4F4F]">Выберите репозиторий</p>
        </div>
      ) : (
        <div className="p-6 flex flex-col gap-4">
          <h2 className="text-[32px] leading-[40px]">{selected?.name}</h2>
          <div className="flex items-center justify-between">
            {selected?.languages.length > 0 && (
              <div className="bg-[#2196F3] rounded-full text-white py-[3px] px-[6px] min-w-[60px] text-[13px] leading-[18px] tracking-[0.16px] min-h-[32px] flex items-center justify-center">
                {selected.languages[0]}
              </div>
            )}

            <div className="gap-2 flex items-center">
              <Star className="!fill-[#FFB400] !stroke-[#FFB400]" />
              <p className="leading-[20.02px] tracking-[0.17px]">
                {selected?.stargazersCount.toLocaleString("ru-RU")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full flex-wrap">
            {selected?.languages?.map((language) => {
              return <Badge key={language}>{language}</Badge>;
            })}
          </div>
          <p>{selected?.license?.name || "No license"}</p>
        </div>
      )}
    </aside>
  );
};
