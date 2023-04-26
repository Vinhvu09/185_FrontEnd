import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    missions: {}
};

const missionReducer = createSlice({
    name: 'mission',
    initialState,
    reducers: {
        fetchMissionList() { },
        getMissionList(state, action) {
            return {
                ...state,
                missions: {
                    ...action.payload
                }
            };
        }
    }
});


export const { fetchMissionList, getMissionList } = missionReducer.actions;
export default missionReducer.reducer;