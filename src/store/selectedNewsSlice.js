import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
}

export const selectedNews = createSlice({
  name: 'selectedNews',
  initialState,
  reducers: {
    addNews: (state, action) => {
      if (!!state.data.find(i => i?.id === action.payload?.id)) {
        state.data = state.data.filter(i => i.id !== action.payload.id)
      } else {
        state.data = [...state.data, action.payload]
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addNews } = selectedNews.actions

export default selectedNews.reducer