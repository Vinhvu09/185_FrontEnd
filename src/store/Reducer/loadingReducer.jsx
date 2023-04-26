import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    redirect: false,
};

const loadingReducer = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        showLoading() {
            return {
                loading: true
            };
        },
        hideLoading() {
            return {
                loading: false,
                redirect: true
            };
        },
        setRedirect(state) {
            return {
                ...state,
                redirect: false
            };
        }
    }
});

export const { showLoading, hideLoading, setRedirect } = loadingReducer.actions;
export default loadingReducer.reducer;