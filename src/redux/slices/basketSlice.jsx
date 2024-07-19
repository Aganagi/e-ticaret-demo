import { createSlice } from "@reduxjs/toolkit";

const getBasketToStorage = () => {
  if (localStorage.getItem("basket")) {
    return JSON.parse(localStorage.getItem("basket"));
  }
  return [];
};

const initialState = {
  products: getBasketToStorage(),
  drawer: false,
  totalAmount: 0
};

const basketToStorage = (basket) => {
  localStorage.setItem("basket", JSON.stringify(basket));
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const findProduct = state.products && state.products.find((product)=>product.id === action.payload.id);
      if (findProduct) {
        const extractedProducts = state.products.filter((product) => product.id !== action.payload.id);
        findProduct.count += action.payload.count;
        state.products = [...extractedProducts,findProduct ];
        basketToStorage(state.products);
      }else{
        state.products = [...state.products, action.payload];
        basketToStorage(state.products);
      }
    },
    deleteProduct: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter((product) => product.id !== productId);
      basketToStorage(state.products);
    },
    setDrawer: (state)=>{
      state.drawer = !state.drawer;
    },
    calculateAmount: (state)=>{
      state.totalAmount = 0;
      state.products && state.products.map((product)=>{
        state.totalAmount += product.price * product.count;
      });
      state.totalAmount = Math.round(state.totalAmount * 100) / 100;
    }
  },
});
export const {addToBasket, deleteProduct, setDrawer, calculateAmount} = basketSlice.actions;

export default basketSlice.reducer;
