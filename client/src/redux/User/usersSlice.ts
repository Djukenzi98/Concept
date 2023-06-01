import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import User from "../../types/User";

type UsersState = {
  loggedInUser: User | undefined;
};

const initialState: UsersState = {
  loggedInUser: undefined,
};

// FETCH
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (user: User, thunkAPI) => {
    const response = await fetch(
      `http://localhost:3001/users/username=${user.username}&password=${user.password}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    return data;
  }
);

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loggedInUser = action.payload;
    });
  },
});

export default usersSlice.reducer;
