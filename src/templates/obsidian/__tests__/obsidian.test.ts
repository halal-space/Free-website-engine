import { describe, it, expect, beforeEach } from 'vitest';
import { products, brands, formatPrice, TYPE_LABELS } from '../data/products';
import { projects } from '../data/projects';
import { faqs } from '../data/faq';
import { testimonials, processSteps, credentials, serviceAreas } from '../data/site';
import { useUIStore } from '../stores/uiStore';
import { useCalculatorStore, calculateSavings } from '../stores/calculatorStore';

describe('Obsidian Solar (solarservice) Template Integration Tests', () => {
  beforeEach(() => {
    useUIStore.getState().navigateToHome();
    useUIStore.getState().setMobileMenuOpen(false);
    useCalculatorStore.setState({
      bill: 165,
      includeBattery: true,
      result: calculateSavings(165, true),
      lastQuoteSubmission: null,
    });
  });

  describe('1. Product Catalog & Data Integrity', () => {
    it('contains all 10 verified equipment items matching reference equipment', () => {
      expect(products).toHaveLength(10);
      const categories = new Set(products.map((p) => p.type));
      expect(categories.has('panel')).toBe(true);
      expect(categories.has('battery')).toBe(true);
      expect(categories.has('inverter')).toBe(true);
      expect(categories.has('ev')).toBe(true);

      products.forEach((product) => {
        expect(product.slug).toBeTruthy();
        expect(product.name).toBeTruthy();
        expect(product.brand).toBeTruthy();
        expect(product.price).toBeGreaterThan(0);
        expect(product.specs.length).toBeGreaterThan(0);
        expect(product.warranty).toBeTruthy();
        expect(product.image).toMatch(/^https?:\/\//);
      });
    });

    it('retrieves products by slug and verifies data properties', () => {
      const panel = products.find((p) => p.slug === 'obsidian-440-mono');
      expect(panel).toBeDefined();
      expect(panel?.name).toBe('Obsidian 440 Mono');
      expect(panel?.brand).toBe('Obsidian');
      expect(panel?.price).toBe(289);
      expect(panel?.wattage).toBe(440);
      expect(panel?.specs).toContain('440W output');

      const nonExistent = products.find((p) => p.slug === 'invalid-slug');
      expect(nonExistent).toBeUndefined();
    });

    it('formats price with thousands separators', () => {
      expect(formatPrice(289)).toBe('289');
      expect(formatPrice(1890)).toBe('1,890');
      expect(formatPrice(8900)).toBe('8,900');
    });

    it('verifies verified case studies with comprehensive project metrics', () => {
      expect(projects).toHaveLength(4);
      projects.forEach((proj) => {
        expect(proj.name).toBeTruthy();
        expect(proj.location).toBeTruthy();
        expect(proj.size).toMatch(/kW/);
        expect(proj.output).toMatch(/kWh\/yr/);
        expect(proj.billCut).toMatch(/−/);
        expect(proj.image).toMatch(/^https?:\/\//);
      });
    });

    it('contains all 10 FAQ questions with detailed engineering answers', () => {
      expect(faqs).toHaveLength(10);
      faqs.forEach((faq) => {
        expect(faq.q).toBeTruthy();
        expect(faq.a).toBeTruthy();
      });
    });

    it('verifies credentials, process steps, testimonials and service areas', () => {
      expect(credentials).toHaveLength(4);
      expect(processSteps).toHaveLength(4);
      expect(testimonials).toHaveLength(3);
      expect(serviceAreas.length).toBeGreaterThanOrEqual(4);
      expect(brands).toContain('Obsidian');
      expect(brands).toContain('Helios');
      expect(brands).toContain('Voltaic');
      expect(TYPE_LABELS.panel).toBe('Solar Panel');
      expect(TYPE_LABELS.battery).toBe('Battery Storage');
    });
  });

  describe('2. Energy Independence Savings Calculator Math', () => {
    it('calculates savings accurately with battery included (55% self-consumption)', () => {
      const result = calculateSavings(180, true);

      // Monthly bill £180 -> Annual bill £2,160 -> Annual kWh ~8816.32
      // 70% offset ~6171.43 kWh / 850 yield = ~7.26 kW -> rounded to 7.3 kW
      expect(result.kw).toBe(7.3);

      // Generation: 7.3 * 850 = 6,205 kWh
      expect(result.gen).toBe(6205);

      // Cost: 7.3 * 1050 + 8900 = 7665 + 8900 = £16,565
      expect(result.cost).toBe(16565);

      // Self-consumption: 6205 * 0.55 * 0.245 = 836.12
      // Export: 6205 * 0.45 * 0.07 = 195.46
      // Total Year 1 savings: ~£1,032
      expect(result.yr1).toBe(1032);

      // Payback: 16565 / 1032 = 16.1 years
      expect(result.payback).toBe(16.1);

      // 25-yr net return: 1032 * 25 - 16565 = 25800 - 16565 = £9,235
      expect(result.save25).toBe(9235);
    });

    it('calculates savings accurately without battery (35% self-consumption)', () => {
      const result = calculateSavings(180, false);

      expect(result.kw).toBe(7.3);
      expect(result.gen).toBe(6205);

      // Cost: 7.3 * 1050 + 0 = £7,665
      expect(result.cost).toBe(7665);

      // Self-consumption: 6205 * 0.35 * 0.245 = 532.08
      // Export: 6205 * 0.65 * 0.07 = 282.33
      // Total Year 1 savings: ~£814
      expect(result.yr1).toBe(814);

      // Payback: 7665 / 814 = 9.4 years
      expect(result.payback).toBe(9.4);

      // 25-yr net return: 814 * 25 - 7665 = 20350 - 7665 = £12,685
      expect(result.save25).toBe(12685);
    });

    it('clamps system size between min 3.0 kW and max 16.0 kW', () => {
      // Extremely low bill: £30/month
      const lowResult = calculateSavings(30, false);
      expect(lowResult.kw).toBe(3.0);
      expect(lowResult.gen).toBe(2550);

      // Extremely high bill: £800/month
      const highResult = calculateSavings(800, true);
      expect(highResult.kw).toBe(16.0);
      expect(highResult.gen).toBe(13600);
    });
  });

  describe('3. Zustand UI Routing & Modal State', () => {
    it('manages sub-page navigation cleanly', () => {
      const {
        navigateToHome,
        navigateToProducts,
        navigateToProduct,
        navigateToServices,
        navigateToProjects,
        navigateToAbout,
        navigateToQuote,
        navigateToFaq,
        navigateToPrivacy,
        navigateToTerms,
      } = useUIStore.getState();

      expect(useUIStore.getState().currentView).toBe('home');

      navigateToProducts();
      expect(useUIStore.getState().currentView).toBe('products');

      navigateToProduct('vault-13-battery');
      expect(useUIStore.getState().currentView).toBe('product');
      expect(useUIStore.getState().selectedProductSlug).toBe('vault-13-battery');

      navigateToServices();
      expect(useUIStore.getState().currentView).toBe('services');

      navigateToProjects();
      expect(useUIStore.getState().currentView).toBe('projects');

      navigateToAbout();
      expect(useUIStore.getState().currentView).toBe('about');

      navigateToFaq();
      expect(useUIStore.getState().currentView).toBe('faq');

      navigateToPrivacy();
      expect(useUIStore.getState().currentView).toBe('privacy');

      navigateToTerms();
      expect(useUIStore.getState().currentView).toBe('terms');

      navigateToQuote();
      expect(useUIStore.getState().currentView).toBe('quote');

      navigateToHome();
      expect(useUIStore.getState().currentView).toBe('home');
      expect(useUIStore.getState().selectedProductSlug).toBeNull();
    });

    it('toggles mobile menu drawer correctly', () => {
      const { toggleMobileMenu, setMobileMenuOpen } = useUIStore.getState();

      expect(useUIStore.getState().isMobileMenuOpen).toBe(false);

      toggleMobileMenu();
      expect(useUIStore.getState().isMobileMenuOpen).toBe(true);

      setMobileMenuOpen(false);
      expect(useUIStore.getState().isMobileMenuOpen).toBe(false);
    });

    it('handles toast notifications with add and dismiss', () => {
      const { showToast, removeToast } = useUIStore.getState();

      showToast('Quote request submitted', 'success');
      const toasts = useUIStore.getState().toasts;
      expect(toasts).toHaveLength(1);
      expect(toasts[0].message).toBe('Quote request submitted');
      expect(toasts[0].type).toBe('success');

      removeToast(toasts[0].id);
      expect(useUIStore.getState().toasts).toHaveLength(0);
    });

    it('handles quote prefill requests across views', () => {
      const { navigateToQuote } = useUIStore.getState();

      navigateToQuote({
        productSlug: 'vault-13-battery',
        plan: 'Residential Solar + Storage',
        message: 'Interested in a 7.3kW system with Vault 13.5',
      });

      expect(useUIStore.getState().currentView).toBe('quote');
      expect(useUIStore.getState().quotePrefill?.productSlug).toBe('vault-13-battery');
      expect(useUIStore.getState().quotePrefill?.plan).toBe('Residential Solar + Storage');
    });
  });

  describe('4. Calculator Store Quote Submission Flow', () => {
    it('submits a quote and produces a valid OS reference code', () => {
      const { submitQuote } = useCalculatorStore.getState();

      const ref = submitQuote({
        name: 'Eleanor Vance',
        email: 'eleanor.vance@example.co.uk',
        phone: '07700 900123',
        address: '14 Ironworks Lane, London EC2A 3BP',
        ptype: 'Detached house',
        bill: '£150 – £250',
        message: 'Interested in solar + battery install',
      });

      expect(ref).toMatch(/^OS-[A-Z0-9]{5}$/);
      const submission = useCalculatorStore.getState().lastQuoteSubmission;
      expect(submission).toBeDefined();
      expect(submission?.ref).toBe(ref);
      expect(submission?.data.name).toBe('Eleanor Vance');
      expect(submission?.data.address).toBe('14 Ironworks Lane, London EC2A 3BP');
    });

    it('updates calculator inputs dynamically', () => {
      const { setBill, setIncludeBattery } = useCalculatorStore.getState();

      setBill(320);
      expect(useCalculatorStore.getState().bill).toBe(320);
      expect(useCalculatorStore.getState().result.cost).toBeGreaterThan(16000);

      setIncludeBattery(false);
      expect(useCalculatorStore.getState().includeBattery).toBe(false);
      // Without battery, cost is lower (no £8,900 battery fee)
      expect(useCalculatorStore.getState().result.cost).toBeLessThan(16000);
    });
  });
});
