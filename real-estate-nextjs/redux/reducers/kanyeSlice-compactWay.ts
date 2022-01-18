import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { RootState } from '../../app/store';

export type kanyeState = {
  data: { quote: string };
  pending: boolean;
  error: boolean;
};

const initialState: kanyeState = {
  data: { quote: 'click that button' },
  pending: false,
  error: false,
};

// This action is what we will call using the dispatch in order to trigger the API call.
export const getKanyeQuote = createAsyncThunk('kanye/kanyeQuote', async () => { 
  const respons = await axios.get('https://api.kanye.rest/');
  return respons.data;
});

export const kanyeSlice = createSlice({
  name: 'kanye',
  initialState,
  reducers: {
  },
   extraReducers: (builder) => {
    builder
      .addCase(getKanyeQuote.pending, (state) => {
        state.pending = true;
      })
      .addCase(getKanyeQuote.fulfilled, (state, { payload }) => {
        // When the API call is successful and we get some data,the data becomes the `fulfilled` action payload
        state.pending = false;
        state.data = payload;
      })
      .addCase(getKanyeQuote.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export default kanyeSlice.reducer;
