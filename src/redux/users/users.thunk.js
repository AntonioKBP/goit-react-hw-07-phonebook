import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getContactsThunk = createAsyncThunk(
  'contacts/fetchAll',
  async () => {
    const { data } = await axios.get(
      'https://63e666537eef5b22338523c9.mockapi.io/api/contacts-list/contacts'
    );
    return data;
  }
);

// export const getContactsThunk = createAsyncThunk('contacts/fetchAll');
// export const getContactsThunk = createAsyncThunk('contacts/fetchAll');
