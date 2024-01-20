import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import ProductsSlice from "../store/pages/page.slice";


const rootReducer = combineReducers({
    ProductReducer: ProductsSlice,
});

export const store = configureStore({
    reducer: rootReducer,
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof rootReducer>> = useSelector;