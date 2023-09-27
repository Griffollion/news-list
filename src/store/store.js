import { configureStore } from '@reduxjs/toolkit'
import selectedNewsReducer from './selectedNewsSlice'
import newsStoreReducer from './newsSlice'
import processedNewsStoreReducer from './processedNewsSlice'
import fullNewsTextsReducer from './fullNewsTextSlice'
import promptModalReducer from 'components/entities/PromptModal/model/promptModalSlice'

export const store = configureStore({
  reducer: {
    selectedNews: selectedNewsReducer,
    newsStore: newsStoreReducer,
    processedNewsStore: processedNewsStoreReducer,
    fullNewsTextsStore: fullNewsTextsReducer,
    promptModalStore:promptModalReducer
  },
})