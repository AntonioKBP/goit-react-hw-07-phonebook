import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getContactsThunk = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        'https://63e666537eef5b22338523c9.mockapi.io/api/contacts-list/contacts'
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// export const getContactsThunk = createAsyncThunk(
//   'contacts/fetchAll',
//   async () => {
//     const { data } = await axios.get(
//       'https://63e666537eef5b22338523c9.mockapi.io/api/contacts-list/contacts'
//     );
//     throw Error();
//     return data;
//   }
// );
