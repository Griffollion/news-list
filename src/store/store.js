import { configureStore } from '@reduxjs/toolkit'
import selectedNewsReducer from './selectedNewsSlice'
import newsStoreReducer from './newsSlice'
import processedNewsStoreReducer from './processedNewsSlice'

export const store = configureStore({
  reducer: {
    selectedNews: selectedNewsReducer,
    newsStore: newsStoreReducer,
    processedNewsStore: processedNewsStoreReducer
  },
})