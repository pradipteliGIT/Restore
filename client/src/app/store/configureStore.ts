import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import basketSlice from '../../features/basket/basketSlice';
import catalogSlice from '../../features/catalog/catalogSlice';
import accountSlice from '../../features/account/accountSlice';

export const store = configureStore({
  reducer: {
    basket: basketSlice,
    catalog: catalogSlice,
    account: accountSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
