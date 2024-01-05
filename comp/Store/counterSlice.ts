import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './Store'

interface RoleState {
  userRole: string | null;
  token : String | null ;
}

// Define the initial state
const initialState: RoleState = {
  userRole: null,
  token : null
};

export const roleSlice = createSlice({
  name: 'role',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    Saverole: (state, action: PayloadAction<string | null>) => {
      state.userRole = action.payload
    },
    Savetoken :(state , action:PayloadAction<string | null>) =>{
            state.token = action.payload
    }
  }
})

export const { Saverole , Savetoken} = roleSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.role

export default roleSlice.reducer