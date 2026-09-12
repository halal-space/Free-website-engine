import { create } from 'zustand';
import type { CartItem, Product, ProductColor, ProductVariant } from '../types';
import { useToastStore } from './toastStore';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  appliedPromo: string | null;
  promoDiscountPercent: number;
  giftPackaging: boolean;
  shippingMethod: 'standard' | 'express' | 'white-glove';
  
  // Actions
  addItem: (product: Product, color: ProductColor, variant?: ProductVariant, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  toggleGiftPackaging: () => void;
  setShippingMethod: (method: 'standard' | 'express' | 'white-glove') => void;
  
  // Calculations
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingCost: () => number;
  getGiftPackagingCost: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

const STORAGE_KEY = 'aether_cart_v1';

const getInitialItems = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const saveItems = (items: CartItem[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error('Error persisting cart:', e);
  }
};

export const useCartStore = create<CartState>((set, get) => ({
  items: getInitialItems(),
  isOpen: false,
  appliedPromo: null,
  promoDiscountPercent: 0,
  giftPackaging: false,
  shippingMethod: 'standard',

  addItem: (product, color, variant, quantity = 1) => {
    const variantId = variant ? variant.id : 'default';
    const itemId = `${product.id}-${color.name.toLowerCase().replace(/\s+/g, '-')}-${variantId}`;
    const price = variant ? variant.price : product.price;
    const originalPrice = variant?.originalPrice || product.originalPrice;
    const image = color.image || product.images[0];

    set((state) => {
      const existingIndex = state.items.findIndex((item) => item.id === itemId);
      let updatedItems: CartItem[];

      if (existingIndex > -1) {
        updatedItems = state.items.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: itemId,
          productId: product.id,
          slug: product.slug,
          name: product.name,
          brand: product.brand,
          price,
          originalPrice,
          image,
          color,
          variant,
          quantity
        };
        updatedItems = [...state.items, newItem];
      }

      saveItems(updatedItems);
      return { items: updatedItems, isOpen: true };
    });

    useToastStore.getState().addToast({
      title: 'Added to Shopping Bag',
      description: `${product.name} (${color.name})`,
      type: 'success'
    });
  },

  removeItem: (itemId) => {
    set((state) => {
      const itemToRemove = state.items.find((i) => i.id === itemId);
      const updatedItems = state.items.filter((i) => i.id !== itemId);
      saveItems(updatedItems);

      if (itemToRemove) {
        useToastStore.getState().addToast({
          title: 'Removed from Bag',
          description: itemToRemove.name,
          type: 'info'
        });
      }

      return { items: updatedItems };
    });
  },

  updateQuantity: (itemId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(itemId);
      return;
    }

    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      );
      saveItems(updatedItems);
      return { items: updatedItems };
    });
  },

  clearCart: () => {
    saveItems([]);
    set({ items: [], appliedPromo: null, promoDiscountPercent: 0, giftPackaging: false });
  },

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  applyPromo: (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'AETHER10' || cleanCode === 'LUXURY10') {
      set({ appliedPromo: cleanCode, promoDiscountPercent: 10 });
      useToastStore.getState().addToast({
        title: '10% Privilege Code Applied',
        description: 'Complimentary luxury discount activated.',
        type: 'success'
      });
      return { success: true, message: '10% privilege discount applied' };
    } else if (cleanCode === 'AETHER15' || cleanCode === 'VIP2026') {
      set({ appliedPromo: cleanCode, promoDiscountPercent: 15 });
      useToastStore.getState().addToast({
        title: '15% VIP Code Applied',
        description: 'Elite client discount activated.',
        type: 'success'
      });
      return { success: true, message: '15% VIP discount applied' };
    } else {
      useToastStore.getState().addToast({
        title: 'Invalid Privilege Code',
        description: 'Try code "AETHER10" or "VIP2026"',
        type: 'error'
      });
      return { success: false, message: 'Invalid code. Try "AETHER10"' };
    }
  },

  removePromo: () => {
    set({ appliedPromo: null, promoDiscountPercent: 0 });
    useToastStore.getState().addToast({
      title: 'Privilege Code Removed',
      type: 'info'
    });
  },

  toggleGiftPackaging: () => {
    set((state) => ({ giftPackaging: !state.giftPackaging }));
  },

  setShippingMethod: (method) => {
    set({ shippingMethod: method });
  },

  getSubtotal: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  getDiscountAmount: () => {
    const subtotal = get().getSubtotal();
    return Math.round((subtotal * get().promoDiscountPercent) / 100);
  },

  getShippingCost: () => {
    const subtotal = get().getSubtotal();
    const method = get().shippingMethod;
    if (subtotal === 0) return 0;
    
    if (method === 'white-glove') return 75;
    if (method === 'express') return 35;
    return subtotal >= 300 ? 0 : 25; // Free standard concierge shipping over $300
  },

  getGiftPackagingCost: () => {
    return get().giftPackaging ? 25 : 0;
  },

  getTotal: () => {
    const subtotal = get().getSubtotal();
    if (subtotal === 0) return 0;
    const discount = get().getDiscountAmount();
    const shipping = get().getShippingCost();
    const gift = get().getGiftPackagingCost();
    return Math.max(0, subtotal - discount + shipping + gift);
  },

  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  }
}));
