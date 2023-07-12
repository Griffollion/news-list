import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allNews: [],
  todaysNews:[]
}

export const newsStore = createSlice({
  name: 'news',
  initialState,
  reducers: {
    getTodaysNews: (state, action) => {
        state.todaysNews = action.payload
    },
    getAllNews: (state, action) => {
        state.allNews = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getTodaysNews,getAllNews } = newsStore.actions

export default newsStore.reducer