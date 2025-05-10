// src/features/searchSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/**
 * Shape of our search‐page state in Redux.
 * We use `any` for results here to avoid needing a separate types file,
 * but you can replace `any` with a proper `Anime` interface once defined.
 */
interface SearchState {
  query: string                 // current search term
  page: number                  // current results page
  results: any[]                // array of anime results
  totalPages: number            // how many pages the API reports
  loading: boolean              // is a fetch in progress?
  error: string | null          // any error message from fetch
}

/**
 * The initial state before any search has run.
 */
const initialState: SearchState = {
  query: '',
  page: 1,
  results: [],
  totalPages: 1,
  loading: false,
  error: null,
}

/**
 * Redux slice for handling search state.
 */
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    /**
     * setQuery
     * Update the search term in state.
     */
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload
    },

    /**
     * setPage
     * Update the current page number in state.
     */
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },

    /**
     * fetchStart
     * Indicate that an API call is underway.
     */
    fetchStart(state) {
      state.loading = true
      state.error = null
    },

    /**
     * fetchSuccess
     * Save the fetched anime results and total pages.
     */
    fetchSuccess(
      state,
      action: PayloadAction<{
        results: any[]
        totalPages: number
      }>
    ) {
      state.loading = false
      state.results = action.payload.results
      state.totalPages = action.payload.totalPages
    },

    /**
     * fetchFailure
     * Record an error message when the API call fails.
     */
    fetchFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
  },
})

// Export actions for dispatching in components
export const {
  setQuery,
  setPage,
  fetchStart,
  fetchSuccess,
  fetchFailure,
} = searchSlice.actions

// Export the reducer to include in the store
export default searchSlice.reducer
