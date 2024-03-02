"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (data, { dispatch, getState }) => {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND + "auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { ...data } }),
    });

    const json = await res.json();
    if (json.errors) return dispatch(setErrors(json.errors));

    dispatch(setErrors([]));
    dispatch(setUser(json.user));
    dispatch(setToken(json.token));
  }
);

export const signupAsync = createAsyncThunk(
  "auth/signup",
  async (data, { dispatch, getState }) => {
    const res = await fetch(process.env.NEXT_PUBLIC_BACKEND + "auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: { ...data } }),
    });

    const json = await res.json();
    console.log(json);
    if (json.errors) return dispatch(setErrors(json.errors));

    dispatch(setErrors([]));
    dispatch(setUser(json.user));
    dispatch(setToken(json.token));
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    errors: [],
  },
  reducers: {
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setErrors, setUser, setToken, logout } = authSlice.actions;

export default authSlice.reducer;
