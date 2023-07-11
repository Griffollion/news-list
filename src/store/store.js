import { configureStore } from '@reduxjs/toolkit'
import selectedNewsReducer from '../components/features/selectedNewsSlice'

export const store = configureStore({
  reducer: {
    selectedNews: selectedNewsReducer,
  },
})