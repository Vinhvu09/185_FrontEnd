import { createSlice } from "@reduxjs/toolkit";
const initialState = ({
    relicsList: {
        count: '',
        data: []
    },
    relicsDetail: {},
    relicsRelative: []
});

export const relicsReducer = createSlice({
    name: 'relics',
    initialState,
    reducers: {
        fetchRelicsList() { },
        fetchRelicsDetail() { },
        fetchRelicsRelative() { },
        postRelics() { },
        deleteRelicsItemReducer() { },
        editRelicsItemReducer() { },
        getRelicsList(state, action) {
            return {
                ...state,
                relicsList: {
                    count: action.payload.count,
                    data: action.payload.results
                }
            };
        },
        getRelicsDetail(state, action) {
            return {
                ...state,
                relicsDetail: action.payload
            };
        },
        getRelicsRelative(state, action) {
            return {
                ...state,
                relicsRelative: action.payload
            };
        }
    },
});


export const { fetchRelicsList, getRelicsList, fetchRelicsDetail, getRelicsDetail, postRelics, deleteRelicsItemReducer, editRelicsItemReducer, fetchRelicsRelative, getRelicsRelative } = relicsReducer.actions;

export default relicsReducer.reducer;