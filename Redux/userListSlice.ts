import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as apiUsers from './apiUsers'
export type User = {
    name: string
};

export type UserListState = {
    users: User[],
    loading: boolean,
    error: boolean
};

const initialState: UserListState= {
    users: [],
    loading: false,
    error: false
}

export const fetchUsers = createAsyncThunk<{users: User[]} >(
    'fetchUsers',
    async()=>{
        const response =  await apiUsers.fetchUsers();
        if (response.kind == 'success') {
            console.log('trace', response)
            return {
                users: response.Body ?? []
            };
        }
        else {
            throw'error fetch users'
        }
    }
)
const userList = createSlice({
    name: 'userList',
    initialState: initialState,
    reducers: {},
    extraReducers:(builder)=> {
        builder.addCase(fetchUsers.pending, (state)=>{
            state.loading = true;
            state.error = false
        }).addCase(fetchUsers.fulfilled, (state, action)=>{
            state.users= action.payload.users;
            state.loading= false;
        }).addCase(fetchUsers.rejected, (state)=> {
            state.error= true;
            state.loading= false
        })
    },
})
console.log(initialState.users)
export default userList.reducer