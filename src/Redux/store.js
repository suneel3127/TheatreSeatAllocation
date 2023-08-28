import { configureStore } from '@reduxjs/toolkit';
import movieReducer from "./movieSlice"

const store = configureStore({
    reducer:{
        state:movieReducer
    }
})

export default store