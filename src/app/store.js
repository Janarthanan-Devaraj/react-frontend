import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from '../features/auth/authSlice'
import userReducer from '../features/user/userSlice'

const store = configureStore({
    reducer: {
        authuser: authUserReducer,
        user: userReducer,

    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store