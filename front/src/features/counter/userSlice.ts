import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { AppState } from "../../app/store";
import { client } from "../../pages/_app";
import { User } from "../../types";

export interface UserState {
  user: User | undefined;
  status: "idle" | "loading" | "failed";
}

const initialState: UserState = {
  user: undefined,
  status: "idle",
};

export const loginAsync = createAsyncThunk("user/login", async (id: number) => {
  const { data } = await client.query<{ articles: Article[] }>({
    query: gql`
      query GetArticles {
        articles {
          id
          title
          content
          author {
            name
          }
        }
      }
    `,
  });
  return (await axios.get(process.env.NEXT_PUBLIC_API_URL + "/users/" + id))
    .data as User;
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
