import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { SIGNUP_URL, SIGNUP_USER_ACADEMIC_URL, SIGNUP_USER_COMPANY_URL, SIGNUP_USER_PROFILE_URL } from '../../utils/urls'
import { axiosHandler } from '../../utils/helper'

const initialState = {
    loading: false,
    user: {},
    error: {},
    status: '',
}

export const signupUser = createAsyncThunk('authUser/signupUser', async (registerData, {rejectWithValue}) => {
    const res = await axiosHandler({
            method: "post",
            url: SIGNUP_URL,
            data: registerData
        }).catch((err) => {
            console.log(err)
            return rejectWithValue(err.errors)
        })

    return res.data.data
})

export const signupUserProfile = createAsyncThunk('authUser/signUpUserProfile', async (data, {rejectWithValue}) => {
    const res = await axiosHandler({
        method: "post",
        url: SIGNUP_USER_PROFILE_URL,
        data: data.registerData,
        token: data.access
    }).catch((err) => {
        console.log(err)
        return rejectWithValue(err.errors)
    })
    return res.data.data
})


export const signupUserAcademics = createAsyncThunk('authUser/signupUserAcademics',async (data, {rejectWithValue}) => {
    const res = await axiosHandler({
        method: "post",
        url: SIGNUP_USER_ACADEMIC_URL,
        data: data.registerData,
        token: data.access
    }).catch((err) => {
        console.log(err)
        return rejectWithValue(err.errors)
    })
    return res.data.data
})

export const signupUserCompany = createAsyncThunk('authUser/signupUserCompany ',async (data, {rejectWithValue}) => {
    const res = await axiosHandler({
        method: "post",
        url: SIGNUP_USER_COMPANY_URL ,
        data: data.registerData,
        token: data.access
    }).catch((err) => {
        console.log(err)
        return rejectWithValue(err.errors)
    })
    return res.data.data
})

const authUserSlice = createSlice({
    name: 'authUser',
    initialState,
    extraReducers: {
        [signupUser.pending] : (state, action) => {
            state.loading = true
            state.status = ''
        },
        [signupUser.fulfilled] : (state,action) => {
            state.loading = false
            state.user = action.payload
            state.error = {}
            state.status = 'user'

            let authTokens = {
                refresh: state.user.refresh,
                access: state.user.access
            }
            console.log(authTokens)
            localStorage.setItem('authTokens', JSON.stringify(authTokens))
        },
        [signupUser.rejected] : (state, action) => {
            state.loading = false
            state.user = {}
            state.error = action.payload
            state.status = ''
        },
        [signupUserProfile.pending] : (state, action) => {
            state.loading = true
            state.status = 'user'
        },
        [signupUserProfile.fulfilled] : (state,action) => {
            state.loading = false
            state.user = action.payload
            state.error = {}
            state.status = 'user-profile'
        },
        [signupUserProfile.rejected] : (state, action) => {
            state.loading = false
            state.user = {}
            state.error = action.payload
            state.status = 'user'
        },
        [signupUserAcademics.pending] : (state, action) => {
            state.loading = true
            state.status = 'user-profile'
        },
        [signupUserAcademics.fulfilled] : (state,action) => {
            state.loading = false
            state.user = action.payload
            state.error = {}
            state.status = 'user-academic'
        },
        [signupUserAcademics.rejected] : (state, action) => {
            state.loading = false
            state.user = {}
            state.error = action.payload
            state.status = 'user-profile'
        },
        [signupUserCompany.pending] : (state, action) => {
            state.loading = true
            state.status = 'user-academic'
        },
        [signupUserCompany.fulfilled] : (state,action) => {
            state.loading = false
            state.user = action.payload
            state.error = {}
            state.status = 'user-company'
        },
        [signupUserCompany.rejected] : (state, action) => {
            state.loading = false
            state.user = {}
            state.error = action.payload
            state.status = 'user-academic'
        }
    }
})

export default authUserSlice.reducer