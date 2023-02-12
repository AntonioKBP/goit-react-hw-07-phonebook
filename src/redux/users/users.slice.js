import { getContactsThunk } from './users.thunk';

const { createSlice } = require('@reduxjs/toolkit');
const { initState } = require('./users.init-state');

const phoneBookSlice = createSlice({
  name: 'users',
  initialState: initState,
  // reducers: {
  //   userAddAction: (state, { payload }) => {
  //     state.contacts = [payload, ...state.contacts];
  //   },
  //   userDeleteAction: (state, { payload }) => {
  //     state.contacts = state.contacts.filter(user => user.id !== payload);
  //   },
  //   userFilterAction: (state, { payload }) => {
  //     state.filter = payload;
  //   },
  // },
  extraReducers: {
    // [getContactsThunk.pending]: handlePending,
    // [getContactsThunk.rejected]: state => (state.contacts.isLoading = false),
    [getContactsThunk.fulfilled]: (state, { payload }) => {
      state.contacts.items = payload;
      state.contacts.isLoading = false;
    },
    // [getContactsThunk.fulfilled]: state => (state.contacts.isLoading = false),
  },
});

export const { userAddAction, userDeleteAction, userFilterAction } =
  phoneBookSlice.actions;

export const phoneBookReducer = phoneBookSlice.reducer;
