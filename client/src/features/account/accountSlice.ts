import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { User } from '../../app/models/user';
import { FieldValues } from 'react-hook-form';
import agent from '../../app/api/agent';
import { router } from '../../app/router/Router';
import { toast } from 'react-toastify';
import { setBasket } from '../basket/basketSlice';

interface AccountState {
  user: User | null;
}

const initialState: AccountState = {
  user: null,
};

export const signInUser = createAsyncThunk<User, FieldValues>(
  'account/signInUser',
  async (data, thunkAPI) => {
    try {
      const userDto = await agent.Account.login(data);
      const { basket, ...user } = userDto;
      if (basket) {
        thunkAPI.dispatch(setBasket(basket));
      }
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const fetchCurrentUser = createAsyncThunk<User>(
  'account/fetchCurrentUser',
  async (_, thunkAPI) => {
    //If we have already stored details then add them to user state
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
    try {
      const userDto = await agent.Account.fetchCurrentUser();
      const { basket, ...user } = userDto;
      if (basket) {
        thunkAPI.dispatch(setBasket(basket));
      }
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem('user')) return false;
    },
  }
);

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem('user');
      router.navigate('/');
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInUser.rejected, (_state, action) => {
      console.log(action.payload);
      throw action.payload;
    });
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.user = null;
      localStorage.removeItem('user');
      toast.error('Session expired please login again to continue');
      router.navigate('/');
    });
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),
      (state, action) => {
        state.user = action.payload;
      }
    );
  },
});

export default accountSlice.reducer;
export const { signOut, setUser } = accountSlice.actions;
