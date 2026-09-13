import { describe, it, expect, beforeEach } from 'vitest';
import { PRODUCTS, CATEGORIES, PROMOS, FREE_SHIPPING_THRESHOLD, productPrice } from '../data/products';
import { HERO, EDITORIAL, FEATURED_COLLECTION, INGREDIENTS, RITUAL, TESTIMONIALS, MANIFESTO, JOURNAL, ABOUT } from '../data/content';
import { useCartStore, computeCartSummary } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { useUIStore } from '../stores/uiStore';

describe('Solenne (SOLENNE — Luxury Skincare) Template Tests', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
    useWishlistStore.getState().clearWishlist();
    useUIStore.getState().navigateToHome();
  });

  describe('1. Data Integrity & Content Completeness', () => {
    it('loads 12 complete skincare products with all required attributes', () => {
      expect(PRODUCTS).toHaveLength(12);
      PRODUCTS.forEach((product) => {
        expect(product.slug).toBeTruthy();
        expect(product.name).toBeTruthy();
        expect(product.price).toBeGreaterThan(0);
        expect(product.category).toBeTruthy();
        expect(product.rating).toBeGreaterThanOrEqual(4.0);
        expect(product.sizes.length).toBeGreaterThan(0);
        expect(product.images).toHaveLength(2);
        expect(product.benefits.length).toBeGreaterThan(0);
        expect(product.heroIngredients.length).toBeGreaterThan(0);
        expect(product.inci).toBeTruthy();
        expect(product.skinTypes.length).toBeGreaterThan(0);
        expect(product.concern).toBeTruthy();
      });
    });

    it('loads 6 luxury skincare categories matching the reference', () => {
      expect(CATEGORIES).toHaveLength(6);
      const expectedIds = ['cleansers', 'serums', 'moisturizers', 'face-oils', 'masks', 'body-care'];
      expect(CATEGORIES.map((c) => c.id)).toEqual(expectedIds);
    });

    it('validates editorial and marketing content objects', () => {
      expect(HERO.title).toHaveLength(2);
      expect(EDITORIAL.paragraphs.length).toBeGreaterThanOrEqual(2);
      expect(FEATURED_COLLECTION.slugs).toHaveLength(3);
      expect(INGREDIENTS).toHaveLength(6);
      expect(RITUAL).toHaveLength(4);
      expect(TESTIMONIALS).toHaveLength(4);
      expect(MANIFESTO.points).toHaveLength(4);
      expect(JOURNAL).toHaveLength(3);
      expect(ABOUT.values).toHaveLength(4);
    });
  });

  describe('2. Cart Calculations, Multi-size & Promos', () => {
    it('computes subtotal and applies size modifiers correctly', () => {
      const p = PRODUCTS[0]; // Velour Cleansing Balm ($54 base, size 1 has +$22 modifier)
      const basePrice = productPrice(p, 0);
      const largePrice = productPrice(p, 1);

      expect(basePrice).toBe(54);
      expect(largePrice).toBe(76);

      const summary = computeCartSummary(
        [
          { slug: p.slug, sizeIndex: 0, qty: 1 },
          { slug: p.slug, sizeIndex: 1, qty: 1 },
        ],
        PRODUCTS,
        null
      );

      expect(summary.count).toBe(2);
      expect(summary.subtotal).toBe(130);
      expect(summary.total).toBe(130);
      expect(summary.freeShipping).toBe(true);
      expect(summary.shippingProgress).toBe(100);
    });

    it('computes free shipping progress based on $100 threshold', () => {
      const p = PRODUCTS[1]; // Botanica Gel Cleanser ($42)
      const summaryUnder = computeCartSummary(
        [{ slug: p.slug, sizeIndex: 0, qty: 1 }],
        PRODUCTS,
        null
      );

      expect(summaryUnder.subtotal).toBe(42);
      expect(summaryUnder.freeShipping).toBe(false);
      expect(summaryUnder.shippingProgress).toBe(42);

      const summaryOver = computeCartSummary(
        [{ slug: p.slug, sizeIndex: 0, qty: 3 }],
        PRODUCTS,
        null
      );

      expect(summaryOver.subtotal).toBe(126);
      expect(summaryOver.freeShipping).toBe(true);
      expect(summaryOver.shippingProgress).toBe(100);
    });

    it('applies promo codes RADIANT10 and SOLENNE15 correctly', () => {
      const cart = useCartStore.getState();
      expect(cart.applyPromo('invalid_code')).toBe(false);
      expect(useCartStore.getState().promoError).toBeTruthy();

      expect(cart.applyPromo('radiant10')).toBe(true);
      expect(useCartStore.getState().promoCode).toBe('RADIANT10');

      const p = PRODUCTS[0]; // $54
      const summary = computeCartSummary(
        [{ slug: p.slug, sizeIndex: 0, qty: 2 }], // $108 subtotal
        PRODUCTS,
        'RADIANT10' // 10% off
      );

      expect(summary.subtotal).toBe(108);
      expect(summary.discount).toBe(10.8);
      expect(summary.total).toBe(97.2);

      // Test 15% code
      const summary15 = computeCartSummary(
        [{ slug: p.slug, sizeIndex: 0, qty: 2 }],
        PRODUCTS,
        'SOLENNE15'
      );
      expect(summary15.discount).toBe(16.2);
      expect(summary15.total).toBe(91.8);
    });
  });

  describe('3. Wishlist Management', () => {
    it('toggles items and reflects in wishlist store', () => {
      const wishlist = useWishlistStore.getState();
      const slug = 'velour-cleansing-balm';

      expect(wishlist.isInWishlist(slug)).toBe(false);
      const added = wishlist.toggleWishlist(slug);
      expect(added).toBe(true);
      expect(useWishlistStore.getState().isInWishlist(slug)).toBe(true);
      expect(useWishlistStore.getState().slugs).toContain(slug);

      const removed = wishlist.toggleWishlist(slug);
      expect(removed).toBe(false);
      expect(useWishlistStore.getState().isInWishlist(slug)).toBe(false);
    });
  });

  describe('4. UI Navigation & Overlays State', () => {
    it('switches views correctly', () => {
      const ui = useUIStore.getState();

      ui.navigateToShop('serums', 'rating');
      expect(useUIStore.getState().activePageView).toBe('shop');
      expect(useUIStore.getState().selectedCategorySlug).toBe('serums');
      expect(useUIStore.getState().selectedSort).toBe('rating');

      ui.navigateToProduct('nocturne-retinol-elixir');
      expect(useUIStore.getState().activePageView).toBe('product');
      expect(useUIStore.getState().selectedProductSlug).toBe('nocturne-retinol-elixir');
      expect(useUIStore.getState().recentlyViewedSlugs).toContain('nocturne-retinol-elixir');

      ui.navigateToAbout();
      expect(useUIStore.getState().activePageView).toBe('about');

      ui.navigateToJournal();
      expect(useUIStore.getState().activePageView).toBe('journal');

      ui.navigateTo404();
      expect(useUIStore.getState().activePageView).toBe('404');

      ui.navigateToHome();
      expect(useUIStore.getState().activePageView).toBe('home');
    });

    it('manages quick view and search overlay modals', () => {
      const ui = useUIStore.getState();

      ui.openSearch();
      expect(useUIStore.getState().isSearchOpen).toBe(true);
      ui.closeSearch();
      expect(useUIStore.getState().isSearchOpen).toBe(false);

      ui.openQuickView('creme-de-lune');
      expect(useUIStore.getState().quickViewProductSlug).toBe('creme-de-lune');
      ui.closeQuickView();
      expect(useUIStore.getState().quickViewProductSlug).toBeNull();
    });

    it('enqueues and dismisses toast notifications', () => {
      const ui = useUIStore.getState();
      ui.showToast('Velour Cleansing Balm added to your bag.');
      expect(useUIStore.getState().toasts).toHaveLength(1);

      const toastId = useUIStore.getState().toasts[0].id;
      ui.dismissToast(toastId);
      expect(useUIStore.getState().toasts).toHaveLength(0);
    });
  });
});
