

//What state means: It’s the current slice of your Redux store before the update.
//What action means: It’s the object that was dispatched, containing a type and usually some data (payload).

//Actions are plain JavaScript objects.
// They always have a type (string), which tells the reducer “what happened”.
// They may have a payload (extra data), like a user object, error message, or id.

import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: undefined,
  user: null,
  loading: true,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
