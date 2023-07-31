import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getTgNews = createAsyncThunk(
  '@@news/get-tg-news',
  async () => {
    try {
      const res = await axios({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        url: 'https://localhost:4443//get-tg-news',
        data: {}
      })
      return res.data?.items
    } catch (e) {
      console.log(e)
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
        .addCase(getTgNews.rejected, (state) => {
            state.loading = 'idle'
            state.error = "Не удалось получить новости для Telegram"
        })
}
})

// Action creators are generated for each case reducer function
export const {} = processedNewsStore.actions

export default processedNewsStore.reducer