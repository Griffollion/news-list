import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allNews: [],
  allNewsTmp: [],
  todaysNews: [],
  todaysNewsTmp: [],
  activeSource: 'all',
  activeTag: 'all',
}

export const newsStore = createSlice({
  name: 'news',
  initialState,
  reducers: {
    getTodaysNews: (state, action) => {
      state.todaysNews = action.payload
      state.todaysNewsTmp = action.payload
    },
    getAllNews: (state, action) => {
      state.allNews = action.payload
      state.allNewsTmp = action.payload
    },
    filterNewsBySource: (state, action) => {
      if (action.payload === 'all' && state.activeTag === 'all') {
        state.allNews = state.allNewsTmp
        state.todaysNews = state.todaysNewsTmp
      } else if (action.payload === 'all' && state.activeTag !== "all") {
        state.allNews = state.allNewsTmp.filter(i => i.tag === state.activeTag)
        state.todaysNews = state.todaysNewsTmp.filter(i => i.tag === state.activeTag)
      } else if (action.payload !== 'all' && state.activeTag === "all") {
        state.allNews = state.allNewsTmp.filter(i => i.source === action.payload)
        state.todaysNews = state.todaysNewsTmp.filter(i => i.source === action.payload)
      } else {
        state.allNews = state.allNewsTmp.filter(i => i.source === action.payload && i.tag === state.activeTag)
        state.todaysNews = state.todaysNewsTmp.filter(i => i.source === action.payload && i.tag === state.activeTag)
      }
    },
    filterNewsByTag: (state, action) => {
      if (action.payload === 'all' && state.activeSource === "all") {
        state.allNews = state.allNewsTmp
        state.todaysNews = state.todaysNewsTmp
      } else if (action.payload === 'all' && state.activeSource !== "all") {
        state.allNews = state.allNewsTmp.filter(i => i.source === state.activeSource)
        state.todaysNews = state.todaysNewsTmp.filter(i => i.source === state.activeSource)
      } else if (action.payload !== 'all' && state.activeSource === "all") {
        state.allNews = state.allNewsTmp.filter(i => i.tag === action.payload)
        state.todaysNews = state.todaysNewsTmp.filter(i => i.tag === action.payload)
      } else {
        state.allNews = state.allNewsTmp.filter(i => i.tag === action.payload && i.source === state.activeSource)
        state.todaysNews = state.todaysNewsTmp.filter(i => i.tag === action.payload && i.source === state.activeSource)
      }
    },
    setActiveSource: (state, action) => {
      state.activeSource = action.payload
    },
    setActiveTag: (state, action) => {
      state.activeTag = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getTodaysNews, getAllNews, filterNewsBySource, filterNewsByTag, setActiveSource, setActiveTag } = newsStore.actions

export default newsStore.reducer