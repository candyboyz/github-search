"use client";
import { AppDispatch } from "@/shared/store/repos";
import {
  fetchRepos,
  ReposState,
  setParams,
} from "@/shared/store/slices/reposSlice";
import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: { repos: ReposState }) => state.repos);

  return (
    <div className="flex gap-2 w-full">
      <input
        type="text"
        value={state.query}
        onChange={(e) => {
          console.log(typeof e.target.value === "string");
          dispatch(setParams({ query: e.target.value }));
        }}
        placeholder="Введите поисковый запрос"
        className="bg-[#F2F2F2] rounded-[4px] max-w-[912px] h-[42px] w-full px-[16px] text-[14px] font-medium leading-[24px] tracking-[0.17px] placeholder:font-normal placeholder:italic placeholder:text-[#828282] outline-none"
      />
      <Button
        onClick={() => {
          if (state.query.length <= 0) return;
          dispatch(
            fetchRepos({
              query: state.query,
              page: state.page,
              perPage: state.perPage,
            }),
          );
        }}
        disabled={state.loading}
        variant="contained"
        className="font-medium text-[15px] leading-[26px] tracking-[0.46px]">
        Искать
      </Button>
    </div>
  );
};
