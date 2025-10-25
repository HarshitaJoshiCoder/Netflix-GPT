import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGptSearch: false,
        MovieResults: null,
        MovieNames: null,
    },
    reducers: {
        toggleGptSearchView: (state, action) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addGptMovieResult: (state, action) => {
            const { movieNames, movieResults} = action.payload;

            state.MovieNames = movieNames;
            state.movieResults = movieResults;
        },
    },
})


export const { toggleGptSearchView, addGptMovieResult} = gptSlice.actions;
export default gptSlice.reducer;