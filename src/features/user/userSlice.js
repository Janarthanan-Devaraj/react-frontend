import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { LOGIN_URL } from '../../utils/urls'
import { axiosHandler } from '../../utils/helper'


const initialState ={
    loading: false,
    user: {},
    error: {},
    status: false
}

export const loginUser = createAsyncThunk('user/loginUser', async (loginData, {rejectWithValue}) => {
    const res = await axiosHandler({
        method: "post",
        url: LOGIN_URL,
        data: loginData
    }).catch((err) => {
        console.log(err)
        return rejectWithValue(err.errors)
    })
    console.log(res.data.data)
    return res.data.data
})


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clear: state => {
            state.status = false
        }
    },
    extraReducers: {
        [loginUser.pending] : (state) => {
            state.loading = true
            state.status = false
        },
        [loginUser.fulfilled] : (state, action) => {
            state.loading = false
            state.user = action.payload
            state.error = {}
            state.status = true

            let authTokens = {
                refresh: state.user.refresh,
                access: state.user.access,
            }
            console.log(authTokens)
            localStorage.setItem('authTokens', JSON.stringify(authTokens))
        },
        [loginUser.rejected] : (state, action) => {
            state.loading = false
            state.user = {}
            state.error = action.payload
            state.status = false
        }
    }
})


export const { clear } = userSlice.actions
export default userSlice.reducer