import { configureStore } from '@reduxjs/toolkit'
import selectedNewsReducer from './selectedNewsSlice'
import newsStoreReducer from './newsSlice'
import processedNewsStoreReducer from './processedNewsSlice'
import fullNewsTextsReducer from './fullNewsTextSlice'

export const store = configureStore({
  reducer: {
    selectedNews: selectedNewsReducer,
    newsStore: newsStoreReducer,
    processedNewsStore: processedNewsStoreReducer,
    fullNewsTextsStore: fullNewsTextsReducer
  },
})