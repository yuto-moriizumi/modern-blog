import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AppState } from "../../app/store";
import { csrClient } from "../../pages/_app";
import { User } from "../../types";
import { gql } from "@apollo/client";
import { Query } from "../../../../common/graphql";

export interface UserState {
  user: User | undefined;
  status: "idle" | "loading" | "failed";
}

const initialState: UserState = {
  user: undefined,
  status: "idle",
};

export const loginAsync = createAsyncThunk("user/login", async (id: number) => {
  const { data } = await csrClient.query<Query>({
    query: gql`
      query GetUser {
        user(id: ${id}) {
          id
          name
        }
      }
    `,
  });
  return data.user ?? undefined;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { logout } = userSlice.actions;

export const selectUser = (state: AppState) => state.user;

export default userSlice.reducer;
