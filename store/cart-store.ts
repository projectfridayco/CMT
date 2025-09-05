import {create} from "zustand";
import {persist} from "zustand/middleware"

export interface CartItem{
    id: string;
    name: string;
    price: number;
    imageURL: string | { src: string };
    quantity: number;
    size: string;
    isGift: boolean;
}

interface CartStore{
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem : (id: string,size: string) => void;
    clearCart: () => void;
    removeWholeItem : (id: string, size: string) => void;
}

export const useCartStore = create<CartStore>()(persist((set) => ({
    items: [],
    addItem: (item) =>
        set((state) => {
            const existing = state.items.find((i) => i.id === item.id && i.size === item.size);
            if(existing){
                return{
                    items: state.items.map((i) => i.id === item.id && i.size === item.size ? {...i, quantity: i.quantity + item.quantity} : i)
                }
            }

            return {items: [...state.items, item]};
        }),
        

        removeWholeItem: (id,size) => set((state) => {
            return {
                items: state.items
                // .map((item) => 
                //     item.id === id ? {...item, quantity: 0} : item 
                //     )
                .filter((item) => !(item.id===id && item.size === size)),
        
            }
        }),
        removeItem: (id,size) => set((state) => {
            return {
                items: state.items
                .map((item) => 
                    item.id === id && item.size === size ? {...item, quantity: item.quantity - 1} : item 
                    )
                .filter((item) => item.quantity > 0),
        
            }
        }),
        clearCart: () => set((state) => {
            return {items: []}
        })
    
}),{name: "cart"}));