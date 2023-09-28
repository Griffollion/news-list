import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";


export const getTgNews = createAsyncThunk(
  '@@news/get-tg-news',
  async (stub,{ rejectWithValue}) => {
    try {
      const res = await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        url: process.env.REACT_APP_API_V1_URL+'/get-tg-news',
        data: {}
      })
      return res.data?.items
    } catch (e) {
        if (!e.response) {
            throw e
        }
        return rejectWithValue(e.response.data)
    }
  })


const initialState = {
  tgNews: [],
  rewrittenNews: [],
  loading: 'loading',
  error: null
}

export const processedNewsStore = createSlice({
  name: 'processedNews',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
        .addCase(getTgNews.fulfilled, (state, action) => {
            state.tgNews = action.payload
            state.loading = 'idle'
        })
        .addCase(getTgNews.pending, (state) => {
            state.loading = 'loading'
            state.error = null
        })
        .addCase(getTgNews.rejected, (state, action) => {
            state.loading = 'idle'
            state.error = "Не удалось загрузить рерайтнутую новость"
            toast.dismiss();
            toast.error(action.payload?.error ? action.payload?.error: 'Не удалось загрузить рерайтнутую новость', {theme: "colored"});
        })
}
})

// Action creators are generated for each case reducer function
export const {} = processedNewsStore.actions

export default processedNewsStore.reducer