import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {getItem} from "../../utils/localStorage";

// Define a type for the slice state
interface CartAddState {
    id: number,
    name: string,
    info: string,
    image: string,

}
interface CartRemoveState {
  id: number,
}

// Aca coloco los valores se va a trabajar como un array de objetos y en este caso se deja vacio
const initialState: CartAddState[] = getItem("cart") || []

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartAddState>) => {
            const {id} = action.payload
            if (
                state.length === 0 ||
                state.filter((item) => item.id === id).length === 0
            ) {
                state.push(action.payload)
            }
        },
        removeToCart: (state, action: PayloadAction<CartRemoveState>) => {
            const {id} = action.payload
            if (
                state.some((item) => item.id === id))
            {
                return state = state.filter((item) => item.id !== id)
            }
        },
    },
})

export const { addToCart, removeToCart  } = cartSlice.actions
