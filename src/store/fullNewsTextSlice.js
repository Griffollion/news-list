import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getNewsFullTexts = createAsyncThunk(
    '@@full-news-texts/get-news-full-text',
    async ({data,prompt} ) => {
        try {
            console.log('PROMPT', prompt)
            console.log('DATA', data)
            const res = await axios({
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                url: process.env.REACT_APP_API_V1_URL + "/parser/detail",
                data: {
                    data,
                    prompt
                }
            })
            return res.data
        } catch (e) {
            console.log(e)
        }
    })


const initialState = {
    newsFullTexts: [],
    loading: 'idle',
    error: null
}

export const fullNewsTextStore = createSlice({
    name: 'fullNewsTexts',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getNewsFullTexts.fulfilled, (state, action) => {
                state.newsFullTexts = action.payload?.data?.items
                state.loading = 'idle'
            })
            .addCase(getNewsFullTexts.pending, (state) => {
                state.loading = 'loading'
                state.error = null
            })
            .addCase(getNewsFullTexts.rejected, (state) => {
                state.loading = 'idle'
                state.error = "Не удалось получить полные тексты для новостей"
            })
    }
})

export const { } = fullNewsTextStore.actions

export default fullNewsTextStore.reducer