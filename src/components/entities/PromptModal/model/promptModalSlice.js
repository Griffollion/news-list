import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify";

export const getPrompts = createAsyncThunk(
    '@@prompt-modal/get-prompts',
    async (stub, {rejectWithValue}) => {
        try {
            const res = await axios({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: process.env.REACT_APP_API_V1_URL + '/get-prompts',
                data: {}
            })
            return res.data
        } catch (e) {
            if (!e.response) {
                throw e
            }
            return rejectWithValue(e.response.data)
        }
    })

export const savePrompt = createAsyncThunk(
    '@@prompt-modal/savePrompt',
    async ({text}, {rejectWithValue}) => {
        try {
            const res = await axios({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: process.env.REACT_APP_API_V1_URL + '/save-prompt',
                data: {
                    text: text
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

export const deletePrompt = createAsyncThunk(
    '@@prompt-modal/deletePrompt',
    async ({id}, {rejectWithValue}) => {
        try {
            const res = await axios({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                url: process.env.REACT_APP_API_V1_URL + '/delete-prompt',
                data: {
                    id: id
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
    prompts: [],
    loading: "idle",
    error: null
}

export const promptModal = createSlice({
    name: 'promptModal',
    initialState,
    reducers: {
        showPromptModal: (state) => {
            state.isActive = true
        },
        hidePromptModal: (state) => {
            state.isActive = false
        },
        updatePrompts:(state,action) => {
            state.prompts = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getPrompts.fulfilled, (state, action) => {
                state.prompts = action.payload
                state.loading = 'idle'
            })
            .addCase(getPrompts.pending, (state) => {
                state.loading = 'loading'
                state.error = null
            })
            .addCase(getPrompts.rejected, (state, action) => {
                state.loading = 'idle'
                state.error = action.payload?.error
                toast.dismiss();
                toast.error(action.payload?.error, {theme: "colored"});
            })
            .addCase(savePrompt.fulfilled, (state) => {
                state.loading = 'idle'
                toast.dismiss();
                toast.success('Промпт успешно сохранен', {theme: "colored"});
            })
            .addCase(savePrompt.pending, (state) => {
                state.loading = 'loading'
                state.error = null
            })
            .addCase(savePrompt.rejected, (state, action) => {
                state.loading = 'idle'
                state.error = action.payload?.error
                toast.dismiss();
                toast.error(action.payload?.error, {theme: "colored"});
            })
            .addCase(deletePrompt.fulfilled, (state) => {
                state.loading = 'idle'
                toast.dismiss();
                toast.success('Промпт успешно удален', {theme: "colored", position: "bottom-center"});
            })
            .addCase(deletePrompt.pending, (state) => {
                state.loading = 'loading'
                state.error = null
            })
            .addCase(deletePrompt.rejected, (state, action) => {
                state.loading = 'idle'
                state.error = action.payload?.error
                toast.dismiss();
                toast.error(action.payload?.error, {theme: "colored"});
            })
    }
})

// Action creators are generated for each case reducer function
export const {showPromptModal, hidePromptModal, updatePrompts} = promptModal.actions

export default promptModal.reducer