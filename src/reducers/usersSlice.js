import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import * as client from '../api/client';

const initialState = {
  entities: {},
  activeUser: {
    id: 1,
    username: 'kraighebert@gmail.com',
    password: 'password',
    firstName: 'Kraig',
    lastName: 'Hebert',
    isAdmin: true,
    hasCellPhone: true,
  },
};

// return next Available id
const getID = (usersList) =>
  usersList.length ? usersList[usersList.length - 1].id + 1 : 1;

// fetch list of users from db.json
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => await client.get('users')
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userLoggedIn(state, action) {
      const user = action.payload;
      state.activeUser = user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const newUsers = {};
      action.payload.forEach((user) => {
        newUsers[user.id] = user;
      });
      state.entities = newUsers;
    });
  },
});

export const {} = usersSlice.actions;

// selectors
export const selectUserEntities = (state) => state.users.entities;
export const selectActiveUser = (state) => state.users.activeUser;

export const selectUsers = createSelector(
  selectUserEntities,
  selectActiveUser,
  (users, user) => {
    if (user.isAdmin) {
      const userList = Object.values(users);
      return userList;
    } else return [user];
  }
);

export default usersSlice.reducer;
