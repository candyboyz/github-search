import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface ReposData {
  total_count: number;
  items: {
    id: number;
    name: string;
    owner: {
      id: number;
      login: string;
      avatar_url: string;
      url: string;
    };
    url: string;
    description: string;
    updatedAt: Date;
    forksCount: number;
    stargazersCount: number;
    languages: string[];
    license: {
      key: string;
      name: string;
      spdx_id: string;
      url: string;
      node_id: string;
    };
  }[];
}

export interface ReposState {
  items: ReposData["items"];
  query: string;
  select: number[];
  totalCount: number;
  page: number;
  perPage: number;
  loading: boolean;
  error: string | null;
}

const initialState: ReposState = {
  items: [],
  query: "",
  select: [],
  totalCount: 0,
  page: 1,
  perPage: 10,
  loading: false,
  error: null,
};

interface FetchReposArgs {
  query: string;
  page?: number;
  perPage?: number;
}

export const fetchRepos = createAsyncThunk(
  "repos/fetchRepos",
  async (
    { query, page = 1, perPage = 10 }: FetchReposArgs,
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(
        `/api/repos?query=${query}&page=${page}&per_page=${perPage}`,
      );
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.error);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const reposSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {
    setParams: (
      state,
      action: {
        payload: {
          page?: number;
          perPage?: number;
          query?: string;
          select?: number[];
        };
      },
    ) => {
      if (action.payload.page !== undefined) state.page = action.payload.page;
      if (action.payload.perPage !== undefined)
        state.perPage = action.payload.perPage;
      if (action.payload.query !== undefined)
        state.query = action.payload.query;
      if (action.payload.select) state.select = action.payload.select;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchRepos.fulfilled,
        (
          state,
          action: PayloadAction<{
            items: ReposData["items"];
            total_count: number;
          }>,
        ) => {
          state.items = action.payload.items;
          state.totalCount = action.payload.total_count;
          state.loading = false;
        },
      )
      //@ts-ignore
      .addCase(
        fetchRepos.rejected,
        (state, action: PayloadAction<string | null>) => {
          state.loading = false;
          state.error = action.payload || "Something went wrong";
        },
      );
  },
});

export default reposSlice.reducer;
export const { setParams } = reposSlice.actions;
