import { configureStore } from '@reduxjs/toolkit'
import selectedNewsReducer from '../components/features/selectedNewsSlice'
import newsStoreReducer from '../components/features/newsSlice'

export const store = configureStore({
  reducer: {
    selectedNews: selectedNewsReducer,
    newsStore: newsStoreReducer
  },
})