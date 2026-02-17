import { createSlice } from "@reduxjs/toolkit";
import { listProductsThunk, createProductThunk } from "./thunks";

interface ProdutoState {
    list: any[];
    loading: boolean;
}

const initialState: ProdutoState = {
    list: [],
    loading: false,
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(listProductsThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(listProductsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(listProductsThunk.rejected, (state) => {
                state.loading = false;
            })
            .addCase(createProductThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(createProductThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createProductThunk.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default productSlice.reducer;
