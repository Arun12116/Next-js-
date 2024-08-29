const { createSlice, nanoid, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  users: [],
};

// const featchData=createAsyncThunk("userData",()=>{

    
// })

const userSlice = createSlice({
  name: "addUserSlice",
  initialState,
  reducers: {
    addUsers: (state, action) => {
      console.log("hello", action);

      const data = {
        id: nanoid(),
        name: action.payload,
      };
      state.users.push(data);
    },
    removeUser: (state, action) => {
      const deleteUser = state.users.filter(
        (items) => items.id !== action.payload
      );
      state.users = deleteUser;
    },

  },
});

export const { addUsers, removeUser } = userSlice.actions;
export default userSlice.reducer;
