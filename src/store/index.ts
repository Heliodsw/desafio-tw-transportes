import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { appSlice } from './app';
import { clientesSlice } from './clientes';
import productReducer from './produtos';

export const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        clients: clientesSlice.reducer,
        products: productReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export default store;
