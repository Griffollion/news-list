import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";


export const getNewsFullTexts = createAsyncThunk(
    '@@full-news-texts/get-news-full-text',
    async ({data,prompt}, {rejectWithValue} ) => {
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
            if (!e.response) {
                throw e
            }

            return rejectWithValue(e.response.data)
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
                state.newsFullTexts = action.payload?.data
                state.loading = 'idle'
                toast.dismiss();
                toast.success('Новости успешно рерайтнуты 👌', {theme: "colored"});
            })
            .addCase(getNewsFullTexts.pending, (state) => {
                state.loading = 'loading'
                state.error = null
            })
            .addCase(getNewsFullTexts.rejected, (state, action) => {
                state.loading = 'idle'
                state.error = action.payload?.error
                toast.dismiss();
                toast.error(action.payload?.error, {theme: "colored"});
            })
    }
})

export const { } = fullNewsTextStore.actions

export default fullNewsTextStore.reducer