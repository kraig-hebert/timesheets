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

// save new user to db.json and update state.users.entities
export const saveNewUser = createAsyncThunk(
  'users/saveNewUser',
  async (user, { getState }) => {
    const state = getState();
    const newUser = {
      ...user,
      id: getID(Object.values(state.users.entities)),
    };
    const response = await client.post(newUser, 'users');
    if (response.status === 201) return newUser;
  }
);

// edit user in db and update state.users.entities
export const editUser = createAsyncThunk('users/editUser', async (user) => {
  const response = await client.patch(user, 'esuers');
  if (response.status === 200) return user;
});

// delete user in db and update state.users.entities
export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  const response = await client.remove(id, 'users');
  if (response.status === 200) return id;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userLoggedIn(state, action) {
      const user = action.payload;
      state.activeUser = user;
    },
    userLoggedOut(state) {
      state.activeUser = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        const newUsers = {};
        action.payload.forEach((user) => {
          newUsers[user.id] = user;
        });
        state.entities = newUsers;
      })
      .addCase(saveNewUser.fulfilled, (state, action) => {
        const user = action.payload;
        state.entities[user.id] = user;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const user = action.payload;
        state.entities[user.id] = user;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const id = action.payload;
        const newUsers = {};
        Object.values(state.entities).forEach((user) => {
          if (id != user.id) newUsers[user.id] = user;
        });
        state.entities = newUsers;
      });
  },
});

export const {} = usersSlice.actions;

// selectors
export const selectUserEntities = (state) => state.users.entities;
export const selectActiveUser = (state) => state.users.activeUser;

export const selectUnfilteredUsers = createSelector(
  selectUserEntities,
  (users) => Object.values(users)
);

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

export const { userLoggedIn, userLoggedOut } = usersSlice.actions;

export default usersSlice.reducer;
