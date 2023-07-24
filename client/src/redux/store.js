import { configureStore } from '@reduxjs/toolkit';
import { brandSlice } from './brandSlice';

const store = configureStore({
    reducer: {
        brand: brandSlice
    }
});

export default store