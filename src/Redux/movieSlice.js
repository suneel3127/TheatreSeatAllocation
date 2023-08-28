import {createSlice} from  '@reduxjs/toolkit';



const movieSlice = createSlice({
    name:'Movie',
    initialState:{
        selectedShow:[],
        selectedSeats:[]
    },
    reducers:{
        updateSelectedShow:(state,{payload})=>{
            state.selectedShow=payload
        },
        updateSelectedSeats:(state,{payload})=>{
            state.selectedSeats=payload
        }
    },
})

export const {updateSelectedShow,updateSelectedSeats} = movieSlice.actions
export default movieSlice.reducer