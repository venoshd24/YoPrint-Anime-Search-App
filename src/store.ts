import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './features/searchSlice'

/**
 * Create the Redux store, adding our `search` slice.
 */
export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
})

// These types will help with TS in components:
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
