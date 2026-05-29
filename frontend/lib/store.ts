import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create()(
  persist(
    (set) => ({
      cart: [],
      orders: [],
      toastMessage: null,
      
      addToCart: (item: any) => set((state: any) => {
        set({ toastMessage: `🔥 1 item added to cart` });
        setTimeout(() => set({ toastMessage: null }), 3000);
        const existing = state.cart.find((i: any) => i.id === item.id);
        if (existing) {
          return { cart: state.cart.map((i: any) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i) };
        }
        return { cart: [...state.cart, { ...item, quantity: 1 }] };
      }),

      completeOrder: (orderData: any) => {
        // Purely local logic - no cloud calls
        set((state: any) => ({
          orders: [orderData, ...state.orders],
          cart: []
        }));
      },

      updateQuantity: (id: number, type: 'inc' | 'dec') => set((state: any) => ({
        cart: state.cart.map((i: any) => {
          if (i.id === id) {
            const newQty = type === 'inc' ? i.quantity + 1 : i.quantity - 1;
            return { ...i, quantity: Math.max(1, newQty) };
          }
          return i;
        })
      })),

      removeFromCart: (id: number) => set((state: any) => ({
        cart: state.cart.filter((i: any) => i.id !== id)
      })),

      clearCart: () => set({ cart: [] }),
    }),
    { name: 'food-district-storage-v3' }
  )
);