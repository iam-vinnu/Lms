import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : "authSlice",
    initialState : {
        user : null,
        isAuthenticated : false ,
        loading : false
    } ,
    reducers:{
        userLoggedIn : (state,action)=>{
            state.user = action.payload.user
            state.isAuthenticated = true 
        },
        userLoggedOut : (state)=>{
            state.user = null ,
            state.isAuthenticated = false
        },
        setLoading:(state , action)=>{
            state.loading = action.payload;
        },

    }
});

export const {userLoggedIn , userLoggedOut} = authSlice.actions;
export default authSlice.reducer;