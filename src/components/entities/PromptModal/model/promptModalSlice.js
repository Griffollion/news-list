import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isActive: false
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
        }
    },
})

// Action creators are generated for each case reducer function
export const { showPromptModal, hidePromptModal } = promptModal.actions

export default promptModal.reducer