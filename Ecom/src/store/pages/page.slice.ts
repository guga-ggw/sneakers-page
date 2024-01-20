import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type State = {
    count: number;
    products: ProductI[];
    price : number,
    newProduct : number
}

type ProductI = {
    id: number;
    company: string;
    heading_txt: string;
    description: string;
    price: string;
    sale: string;
    original_price: string;
    images: string[];
}

const initialState: State = {
    count: 0,
    products: [],
    price : 0,
    newProduct : 0,
};

const ProductsSlice = createSlice({
    name: "ProductsSlice",
    initialState,
    reducers: {
        pushProduct: (state, action) => {
            const existingProductIndex = state.products.findIndex(product => product.id === action.payload.id);

            if (existingProductIndex !== -1) {
                state.products[existingProductIndex] = action.payload;
            } else {
                state.products = [...state.products, action.payload];
            }
        },
        setcountRedux: (state, action) => {
            state.count = state.count + action.payload;
        },
        deleteProduct: (state, action) => {
            state.count = 0,
            state.price = 0,
            
            state.products = state.products.filter((item) => item.id !== action.payload.id);
        },
        calculatePrice : (state) => {
            state.price = 125 * state.count
        },
        calculateNewProduct : (state, action) => {
            state.newProduct = state.newProduct + action.payload
        },
        deleteNewProduct : (state) => {
            state.newProduct = 0
        }
    },
});

export const { pushProduct,deleteNewProduct, calculatePrice,setcountRedux, calculateNewProduct, deleteProduct } = ProductsSlice.actions;

export default ProductsSlice.reducer;