import {createSlice} from '@reduxjs/toolkit'

const targetuserSlice = createSlice({
    name:"targetuser",
    initialState:null,
    reducers:{
        addTargetUser: (state,action)=>{
            return action.payload;
        },
        removeTargetUser:(state,action)=>{
            return null;
        }
    }
})

export const {addTargetUser,removeTargetUser} = targetuserSlice.actions
export default targetuserSlice.reducer