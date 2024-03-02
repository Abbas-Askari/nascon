import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'


export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice
    },
  })
}

