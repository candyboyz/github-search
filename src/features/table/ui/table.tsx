"use client";
import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { ReposState, setParams } from "@/shared/store/slices/reposSlice";
import { AppDispatch } from "@/shared/store/repos";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Название",
    type: "string",
    align: "left",
    filterable: false,
    disableColumnMenu: true,
    resizable: false,
    flex: 50,
  },
  {
    field: "language",
    headerName: "Язык",
    type: "string",
    align: "left",
    filterable: false,
    disableColumnMenu: true,
    sortable: false,
    resizable: false,
    flex: 50,
  },
  {
    field: "forksCount",
    headerName: "Число форков",
    type: "number",
    align: "left",
    filterable: false,
    disableColumnMenu: true,
    resizable: false,
    flex: 50,
  },
  {
    field: "stargazersCount",
    headerName: "Число звезд",
    type: "number",
    align: "left",
    filterable: false,
    disableColumnMenu: true,
    resizable: false,
    flex: 50,
  },
  {
    field: "updatedAt",
    headerName: "Дата обновления",
    type: "date",
    align: "left",
    filterable: false,
    disableColumnMenu: true,
    resizable: false,
    flex: 50,
  },
];

export const Table = () => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state: { repos: ReposState }) => state.repos);
  const rows = React.useMemo(
    () =>
      state.items.map((item) => ({
        id: item.id,
        name: item.name,
        language: item.languages[0],
        forksCount: item.forksCount,
        stargazersCount: item.stargazersCount,
        updatedAt: new Date(item.updatedAt),
      })),
    [state],
  );

  return (
    <DataGrid
      disableColumnMenu
      disableColumnFilter
      disableColumnSelector
      autosizeOnMount
      hideFooterSelectedRowCount
      hideFooter
      rows={rows}
      columns={columns}
      showColumnVerticalBorder={false}
      onRowSelectionModelChange={(e) =>
        dispatch(setParams({ select: e as any as number[] }))
      }
    />
  );
};
