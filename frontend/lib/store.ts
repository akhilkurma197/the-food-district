import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from './supabase';

interface CartStore {
  cart: any[];
  orders: any[];
  toastMessage: string | null;
  addToCart: (item: any) => void;
  completeOrder: (orderData: any) => Promise<void>;
  updateQuantity: (id: number, type: 'inc' | 'dec') => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      orders: [],
      toastMessage: null,
      
      addToCart: (item) => set((state) => {
        set({ toastMessage: `🔥 1 item added to cart` });
        setTimeout(() => set({ toastMessage: null }), 3000);
        const existing = state.cart.find((i) => i.id === item.id);
        if (existing) {
          return { cart: state.cart.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) };
        }
        return { cart: [...state.cart, { ...item, quantity: 1 }] };
      }),

      completeOrder: async (orderData) => {
        // This calls our "Fake" object, so it won't crash Vercel
        await supabase.from('orders').insert([orderData]);

        set((state) => ({
          orders: [orderData, ...state.orders],
          cart: []
        }));
      },

      updateQuantity: (id, type) => set((state) => ({
        cart: state.cart.map((i) => {
          if (i.id === id) {
            const newQty = type === 'inc' ? i.quantity + 1 : i.quantity - 1;
            return { ...i, quantity: Math.max(1, newQty) };
          }
          return i;
        })
      })),

      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter((i) => i.id !== id)
      })),

      clearCart: () => set({ cart: [] }),
    }),
    { name: 'food-district-data' }
  )
);