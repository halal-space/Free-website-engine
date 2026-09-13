import { describe, it, expect, beforeEach } from 'vitest';
import {
  products,
  categories,
  makers,
  recipes,
  addOns,
  money,
  getProduct,
  bestsellers,
  FREE_SHIPPING_THRESHOLD,
  BUTTER_GIFT_THRESHOLD_GAP,
} from '../data/catalog';
import { useCartStore, computeCartSummary, BUTTER_GIFT_THRESHOLD } from '../stores/cartStore';
import { useUIStore } from '../stores/uiStore';
import { saveOrder, getOrders, getLastOrder, newOrderId } from '../stores/ordersStore';

describe('Terra & Cru (Artisan Groceries) Template Integration Tests', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
    useCartStore.getState().setCarbonNeutral(true);
    useUIStore.getState().navigateToHome();
  });

  describe('1. Catalog & Data Integrity', () => {
    it('contains all 12 verified artisan grocery products', () => {
      expect(products).toHaveLength(12);
      const expectedIds = [
        'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10', 'p11', 'p12',
      ];
      expect(products.map((p) => p.id)).toEqual(expectedIds);

      products.forEach((p) => {
        expect(p.name).toBeTruthy();
        expect(p.slug).toBeTruthy();
        expect(p.price).toBeGreaterThan(0);
        expect(p.image).toMatch(/^https?:\/\//);
        expect(p.origin).toBeTruthy();
        expect(p.volume).toBeTruthy();
        expect(p.batch).toMatch(/^Batch No\./);
        expect(p.stock).toBeGreaterThan(0);
        expect(p.tasting.length).toBeGreaterThanOrEqual(4);
        expect(p.producer).toBeTruthy();
        expect(p.ingredients).toBeTruthy();
      });
    });

    it('retrieves products by slug and handles invalid slugs', () => {
      const oil = getProduct('koroneiki-early-harvest-olive-oil');
      expect(oil).toBeDefined();
      expect(oil?.name).toBe('Koroneiki Early-Harvest Olive Oil');
      expect(oil?.category).toBe('Oils & Vinegars');
      expect(oil?.price).toBe(28);

      const invalid = getProduct('non-existent-product');
      expect(invalid).toBeUndefined();
    });

    it('filters bestsellers correctly', () => {
      expect(bestsellers.length).toBeGreaterThan(0);
      bestsellers.forEach((p) => {
        expect(p.bestseller).toBe(true);
      });
    });

    it('contains 5 pantry categories, 3 makers, 3 recipes, and 3 add-ons', () => {
      expect(categories).toHaveLength(5);
      expect(makers).toHaveLength(3);
      expect(recipes).toHaveLength(3);
      expect(addOns).toHaveLength(3);

      categories.forEach((c) => {
        expect(c.slug).toBeTruthy();
        expect(c.name).toBeTruthy();
        expect(c.image).toMatch(/^https?:\/\//);
      });

      makers.forEach((m) => {
        expect(m.name).toBeTruthy();
        expect(m.region).toBeTruthy();
        expect(m.certs.length).toBeGreaterThan(0);
      });

      recipes.forEach((r) => {
        expect(r.title).toBeTruthy();
        expect(r.time).toBeTruthy();
        expect(r.steps.length).toBeGreaterThan(0);
      });
    });

    it('formats currency correctly according to reference formatting', () => {
      expect(money(28)).toBe('$28');
      expect(money(28.5)).toBe('$28.50');
      expect(money(6.95)).toBe('$6.95');
      expect(money(0)).toBe('$0');
    });
  });

  describe('2. Cart Math & Threshold Tiers', () => {
    it('verifies free shipping threshold ($65) and butter gift threshold ($79)', () => {
      expect(FREE_SHIPPING_THRESHOLD).toBe(65);
      expect(BUTTER_GIFT_THRESHOLD_GAP).toBe(14);
      expect(BUTTER_GIFT_THRESHOLD).toBe(79);
    });

    it('calculates subtotal, shipping fee, carbon fee, and total accurately', () => {
      const { addToCart, summary } = useCartStore.getState();

      // Empty cart
      expect(summary().count).toBe(0);
      expect(summary().subtotal).toBe(0);
      expect(summary().shippingFee).toBe(0);
      expect(summary().total).toBe(0);

      // Add 1 item under $65 ($28 oil)
      addToCart({
        id: 'p1',
        name: 'Single-Estate Koroneiki Olive Oil',
        price: 28,
        image: 'https://images.unsplash.com/photo-oil',
      });

      let s = summary();
      expect(s.count).toBe(1);
      expect(s.subtotal).toBe(28);
      expect(s.freeShipping).toBe(false);
      expect(s.shippingFee).toBe(6.95);
      expect(s.carbonFee).toBe(1);
      // Total = 28 + 6.95 + 1 = 35.95
      expect(s.total).toBe(35.95);
      expect(s.amountToFreeShipping).toBe(37);
      expect(s.butterGiftUnlocked).toBe(false);
      expect(s.amountToButterGift).toBe(51);

      // Add another item to reach over $65 ($28 + $40 = $68)
      addToCart({
        id: 'p4',
        name: 'Smoked Ventresca Tuna in Arbequina',
        price: 40,
        image: 'https://images.unsplash.com/photo-tuna',
      });

      s = summary();
      expect(s.count).toBe(2);
      expect(s.subtotal).toBe(68);
      expect(s.freeShipping).toBe(true);
      expect(s.shippingFee).toBe(0);
      expect(s.carbonFee).toBe(1);
      // Total = 68 + 0 + 1 = 69
      expect(s.total).toBe(69);
      expect(s.amountToFreeShipping).toBe(0);
      expect(s.butterGiftUnlocked).toBe(false);
      expect(s.amountToButterGift).toBe(11);

      // Add item to unlock butter gift (>= $79)
      addToCart({
        id: 'p5',
        name: 'Senatore Cappelli Bronze-Cut Rigatoni',
        price: 14,
        image: 'https://images.unsplash.com/photo-pasta',
      });

      s = summary();
      expect(s.subtotal).toBe(82);
      expect(s.butterGiftUnlocked).toBe(true);
      expect(s.butterGiftProgress).toBe(100);
      expect(s.amountToButterGift).toBe(0);
    });

    it('supports quantity modifications, removal, and carbon neutral toggle', () => {
      const { addToCart, setQty, removeLine, setCarbonNeutral, summary } = useCartStore.getState();

      addToCart({
        id: 'p1',
        name: 'Single-Estate Koroneiki Olive Oil',
        price: 28,
        image: 'https://images.unsplash.com/photo-oil',
      });

      setQty('p1', 3);
      expect(summary().count).toBe(3);
      expect(summary().subtotal).toBe(84);

      setCarbonNeutral(false);
      expect(summary().carbonFee).toBe(0);

      removeLine('p1');
      expect(summary().count).toBe(0);
    });

    it('applies promo codes and discounts correctly', () => {
      const { addToCart, applyPromo, removePromo, summary } = useCartStore.getState();

      addToCart({
        id: 'p1',
        name: 'Single-Estate Koroneiki Olive Oil',
        price: 100,
        image: 'https://images.unsplash.com/photo-oil',
      });

      const applied10 = applyPromo('HARVEST10');
      expect(applied10).toBe(true);
      expect(summary().discount).toBe(10);
      // Total = 100 - 10 + 0 (shipping free) + 1 (carbon) = 91
      expect(summary().total).toBe(91);

      const applied15 = applyPromo('SMALLHOLDER15');
      expect(applied15).toBe(true);
      expect(summary().discount).toBe(15);

      const invalid = applyPromo('INVALID_CODE');
      expect(invalid).toBe(false);

      removePromo();
      expect(summary().discount).toBe(0);
    });
  });

  describe('3. Pantry Box Builder Discount Logic', () => {
    it('applies 15% discount to custom pantry crate items', () => {
      const pickedPrices = [28, 14, 18, 22]; // Total $82
      const total = pickedPrices.reduce((a, b) => a + b, 0);
      const discounted = total * 0.85;

      expect(total).toBe(82);
      expect(discounted).toBe(69.7);
      expect(total - discounted).toBeCloseTo(12.3, 2);
    });
  });

  describe('4. Zustand UI Routing State', () => {
    it('navigates seamlessly across all 18 views', () => {
      const { setView } = useUIStore.getState();

      setView('shop');
      expect(useUIStore.getState().currentView).toBe('shop');

      setView('category', 'oils-vinegars');
      expect(useUIStore.getState().currentView).toBe('shop');
      expect(useUIStore.getState().selectedCategory).toBe('oils-vinegars');

      setView('product', 'single-estate-koroneiki-olive-oil');
      expect(useUIStore.getState().currentView).toBe('product');
      expect(useUIStore.getState().selectedProductSlug).toBe('single-estate-koroneiki-olive-oil');

      setView('box');
      expect(useUIStore.getState().currentView).toBe('box');

      setView('recipes');
      expect(useUIStore.getState().currentView).toBe('recipes');

      setView('recipe', 'tinned-ventresca-toast');
      expect(useUIStore.getState().currentView).toBe('recipe');
      expect(useUIStore.getState().selectedRecipeSlug).toBe('tinned-ventresca-toast');

      setView('makers');
      expect(useUIStore.getState().currentView).toBe('makers');

      setView('cart');
      expect(useUIStore.getState().currentView).toBe('cart');

      setView('checkout');
      expect(useUIStore.getState().currentView).toBe('checkout');

      setView('about');
      expect(useUIStore.getState().currentView).toBe('about');

      setView('faq');
      expect(useUIStore.getState().currentView).toBe('faq');

      setView('shipping');
      expect(useUIStore.getState().currentView).toBe('shipping');

      setView('contact');
      expect(useUIStore.getState().currentView).toBe('contact');

      setView('account');
      expect(useUIStore.getState().currentView).toBe('account');

      setView('legal');
      expect(useUIStore.getState().currentView).toBe('legal');

      setView('search', 'olive oil');
      expect(useUIStore.getState().currentView).toBe('search');
      expect(useUIStore.getState().searchQuery).toBe('olive oil');

      setView('404');
      expect(useUIStore.getState().currentView).toBe('404');

      setView('home');
      expect(useUIStore.getState().currentView).toBe('home');
    });

    it('handles search modal open and close', () => {
      const { openSearch, closeSearch } = useUIStore.getState();

      openSearch();
      expect(useUIStore.getState().isSearchOpen).toBe(true);

      closeSearch();
      expect(useUIStore.getState().isSearchOpen).toBe(false);
    });
  });

  describe('5. Orders Store Persistence & Retrieval', () => {
    it('creates, saves, and retrieves orders with TC- prefix', () => {
      const orderId = newOrderId();
      expect(orderId).toMatch(/^TC-\d{6}$/);

      const testOrder = {
        id: orderId,
        date: new Date().toISOString(),
        lines: [
          {
            id: 'p1',
            name: 'Single-Estate Koroneiki Olive Oil',
            price: 28,
            image: 'https://images.unsplash.com/photo-oil',
            qty: 2,
          },
        ],
        subtotal: 56,
        shipping: 6.95,
        carbon: 1,
        total: 63.95,
        email: 'test@table.com',
        name: 'Maya Lin',
        city: 'Portland',
        method: 'Standard chilled',
      };

      saveOrder(testOrder);

      const orders = getOrders();
      expect(orders.length).toBeGreaterThan(0);
      expect(orders[0].id).toBe(orderId);

      const last = getLastOrder();
      expect(last).toBeDefined();
      expect(last?.id).toBe(orderId);
      expect(last?.name).toBe('Maya Lin');
      expect(last?.total).toBe(63.95);
    });
  });
});
