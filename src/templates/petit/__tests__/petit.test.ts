import { describe, it, expect, beforeEach } from 'vitest';
import { products } from '../data/products';
import { categories, curatedCollections } from '../data/categories';
import { storeReviews } from '../data/reviews';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { useUIStore } from '../stores/uiStore';

describe('Petit (Maison Petit) Template Data & State Stores', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
    useWishlistStore.getState().clearWishlist();
    useUIStore.getState().navigateToHome();
  });

  describe('Curated Data Integrity', () => {
    it('loads 12 complete products with required fields', () => {
      expect(products).toHaveLength(12);
      products.forEach((product) => {
        expect(product.id).toBeDefined();
        expect(product.name).toBeTruthy();
        expect(product.slug).toBeTruthy();
        expect(product.price).toBeGreaterThan(0);
        expect(product.category).toBeTruthy();
        expect(product.images.length).toBeGreaterThan(0);
        expect(product.colors.length).toBeGreaterThan(0);
        expect(product.features.length).toBeGreaterThan(0);
        expect(product.certifications.length).toBeGreaterThan(0);
        expect(product.reviews.length).toBeGreaterThan(0);
      });
    });

    it('loads 6 boutique categories and 5 curated collections', () => {
      expect(categories).toHaveLength(6);
      expect(curatedCollections).toHaveLength(5);
    });

    it('loads 4 store customer testimonials', () => {
      expect(storeReviews).toHaveLength(4);
      storeReviews.forEach((review) => {
        expect(review.author).toBeTruthy();
        expect(review.quote).toBeTruthy();
        expect(review.rating).toBe(5);
        expect(review.verified).toBe(true);
      });
    });
  });

  describe('Cart Store Calculations & Rules', () => {
    it('adds items and updates subtotal and quantity', () => {
      const cart = useCartStore.getState();
      const p1 = products[0]; // $48

      cart.addItem(p1, 2);
      expect(useCartStore.getState().getItemCount()).toBe(2);
      expect(useCartStore.getState().getSubtotal()).toBe(96);
    });

    it('calculates shipping correctly based on $75 threshold', () => {
      const cart = useCartStore.getState();
      const p1 = products[0]; // $48

      // Under $75 -> $9.50 shipping
      cart.addItem(p1, 1);
      expect(useCartStore.getState().getSubtotal()).toBe(48);
      expect(useCartStore.getState().getShippingCost()).toBe(9.5);
      expect(useCartStore.getState().getTotal()).toBe(57.5);

      const progress = useCartStore.getState().getProgressToFreeShipping();
      expect(progress.isFree).toBe(false);
      expect(progress.amountNeeded).toBe(27);

      // Add another -> $96 >= $75 -> $0 shipping
      cart.addItem(p1, 1);
      expect(useCartStore.getState().getSubtotal()).toBe(96);
      expect(useCartStore.getState().getShippingCost()).toBe(0);
      expect(useCartStore.getState().getTotal()).toBe(96);
      expect(useCartStore.getState().getProgressToFreeShipping().isFree).toBe(true);
    });

    it('applies and validates promotional voucher codes', () => {
      const cart = useCartStore.getState();
      const p1 = products[0]; // $48
      cart.addItem(p1, 2); // $96

      // Invalid code
      const invalidRes = cart.applyPromoCode('INVALID');
      expect(invalidRes.success).toBe(false);

      // Valid WELCOME10 (10% off)
      const valid10 = cart.applyPromoCode('WELCOME10');
      expect(valid10.success).toBe(true);
      expect(useCartStore.getState().getDiscountAmount()).toBeCloseTo(9.6);
      expect(useCartStore.getState().getTotal()).toBeCloseTo(86.4);

      // Valid MAISON15 (15% off)
      const valid15 = cart.applyPromoCode('MAISON15');
      expect(valid15.success).toBe(true);
      expect(useCartStore.getState().getDiscountAmount()).toBeCloseTo(14.4);
      expect(useCartStore.getState().getTotal()).toBeCloseTo(81.6);
    });
  });

  describe('Wishlist Store', () => {
    it('toggles products in and out of wishlist', () => {
      const wishlist = useWishlistStore.getState();
      const p = products[0];

      expect(wishlist.isInWishlist(p.id)).toBe(false);
      const added = wishlist.toggleItem(p);
      expect(added).toBe(true);
      expect(useWishlistStore.getState().isInWishlist(p.id)).toBe(true);
      expect(useWishlistStore.getState().getItemCount()).toBe(1);

      const removed = useWishlistStore.getState().toggleItem(p);
      expect(removed).toBe(false);
      expect(useWishlistStore.getState().isInWishlist(p.id)).toBe(false);
      expect(useWishlistStore.getState().getItemCount()).toBe(0);
    });
  });

  describe('UI Navigation Store', () => {
    it('handles in-app page transitions seamlessly', () => {
      const ui = useUIStore.getState();
      expect(ui.activePageView).toBe('home');

      ui.navigateToShop('baby-essentials', 'newest');
      expect(useUIStore.getState().activePageView).toBe('shop');
      expect(useUIStore.getState().selectedCategorySlug).toBe('baby-essentials');
      expect(useUIStore.getState().selectedSort).toBe('newest');

      ui.navigateToProduct('heirloom-organic-muslin-swaddle-blanket');
      expect(useUIStore.getState().activePageView).toBe('product');
      expect(useUIStore.getState().selectedProductSlug).toBe('heirloom-organic-muslin-swaddle-blanket');

      ui.navigateToAbout();
      expect(useUIStore.getState().activePageView).toBe('about');

      ui.navigateToHome();
      expect(useUIStore.getState().activePageView).toBe('home');
    });
  });
});
