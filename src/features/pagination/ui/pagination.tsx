"use client";
import * as React from "react";
import TablePagination from "@mui/material/TablePagination";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRepos,
  setParams,
  type ReposState,
} from "@/shared/store/slices/reposSlice";
import { AppDispatch } from "@/shared/store/repos";

export const TablePaginations = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: { repos: ReposState }) => state.repos);

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    dispatch(setParams({ page: newPage + 1 }));

    if (state.query.length <= 0) return;

    dispatch(
      fetchRepos({
        query: state.query,
        perPage: state.perPage,
        page: newPage + 1,
      }),
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(
      setParams({
        page: 1,
        perPage: parseInt(event.target.value, 10),
        select: [],
      }),
    );

    if (state.query.length <= 0) return;

    dispatch(
      fetchRepos({
        query: state.query,
        perPage: parseInt(event.target.value, 10),
        page: state.page,
      }),
    );
  };

  return (
    <TablePagination
      component="div"
      count={state.totalCount}
      page={state.page - 1}
      onPageChange={handleChangePage}
      rowsPerPage={state.perPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};
