'use client';

import React, { useState } from 'react';
import type { Product, ProductColor, ProductVariant } from '../types';
import { products, getProductBySlug, getProductsByCategory } from '../products';
import { useCartStore } from '../stores/cartStore';
import { useWishlistStore } from '../stores/wishlistStore';
import { useToastStore } from '../stores/toastStore';
import { useUIStore } from '../stores/uiStore';
import { ProductCard } from './ProductCard';
import {
  ShoppingBag,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  Check,
  ArrowRight,
  ArrowLeft,
  Zap,
  Star,
  ChevronRight,
  ZoomIn,
  Package,
  Layers,
  Sparkles,
  HelpCircle,
  ThumbsUp
} from 'lucide-react';

interface ProductDetailViewProps {
  accentColor?: string;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  accentColor = '#3b82f6',
}) => {
  const {
    selectedProductSlug,
    navigateToHome,
    navigateToShop,
    navigateToCheckout,
  } = useUIStore();

  const product = (selectedProductSlug && getProductBySlug(selectedProductSlug)) || products[0];

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'Default', hex: '#000' });
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(product.variants?.[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<number | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [helpfulReviews, setHelpfulReviews] = useState<Record<string, boolean>>({});

  // Reset states when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0] || { name: 'Default', hex: '#000' });
      setSelectedVariant(product.variants?.[0]);
      setSelectedImageIndex(0);
      setQuantity(1);
      setIsZoomed(false);
      setReviewFilter(null);
      setOpenFaqIndex(null);
    }
  }, [product?.id]);

  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { addToast } = useToastStore();

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Product Not Found</h2>
        <button
          onClick={() => navigateToShop()}
          className="mt-4 px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const originalPrice = selectedVariant?.originalPrice || product.originalPrice;
  const relatedProducts = getProductsByCategory(product.categorySlug).filter((p) => p.id !== product.id).slice(0, 3);

  const displayImages = selectedColor.image
    ? [selectedColor.image, ...product.images.filter((img) => img !== selectedColor.image)]
    : product.images;

  const currentImage = displayImages[selectedImageIndex] || displayImages[0] || product.images[0];

  const handleAddToCart = () => {
    addItem(product, selectedColor, selectedVariant, quantity);
    addToast({
      title: 'Allocation Reserved',
      description: `${product.name} (${selectedColor.name}) added to bag`,
      type: 'success',
    });
  };

  const handleBuyNow = () => {
    addItem(product, selectedColor, selectedVariant, quantity);
    navigateToCheckout();
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product.id, product.name);
  };

  const filteredReviews = reviewFilter === null
    ? product.reviews
    : product.reviews.filter((r) => Math.round(r.rating) === reviewFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fade-in text-[var(--text-primary)]">
      {/* Breadcrumbs Navigation */}
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-2 text-xs font-mono text-[var(--text-muted)]" aria-label="Breadcrumb">
          <button
            onClick={navigateToHome}
            className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <span>/</span>
          <button
            onClick={() => navigateToShop()}
            className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            Catalog
          </button>
          <span>/</span>
          <button
            onClick={() => navigateToShop(product.categorySlug)}
            className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            {product.category}
          </button>
          <span>/</span>
          <span className="text-[var(--text-primary)] font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        <button
          onClick={() => navigateToShop(product.categorySlug)}
          className="text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span>Back to {product.category}</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* Primary Hero Section: Gallery + Configurator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Product Gallery */}
        <div className="lg:col-span-7 sticky top-24 space-y-4">
          {/* Main Visual Display */}
          <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-2xl">
            <img
              src={currentImage}
              alt={product.name}
              className={`w-full h-full object-cover object-center transition-all duration-500 ${
                isZoomed ? 'scale-125 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            />

            {/* Badges Overlay */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
              {product.isNew && (
                <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-blue-600 text-white shadow-md">
                  New Release 2026
                </span>
              )}
              {product.discountPercent && (
                <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  -{product.discountPercent}% Allocation
                </span>
              )}
            </div>

            {/* Zoom Toggle */}
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:text-blue-400 transition-colors shadow-lg cursor-pointer"
              aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Thumbnails Row */}
          {displayImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {displayImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImageIndex(idx);
                    setIsZoomed(false);
                  }}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden bg-[var(--bg-secondary)] border-2 transition-all flex-shrink-0 cursor-pointer ${
                    selectedImageIndex === idx
                      ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md scale-105'
                      : 'border-[var(--border-subtle)] opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Configurator & Purchase Controls */}
        <div className="lg:col-span-5 space-y-6">
          {/* Brand, Category & Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                {product.category}
              </span>
              {product.isNew && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                  New Release
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--text-primary)]">
              {product.name}
            </h1>

            <p className="text-sm text-[var(--text-secondary)] font-medium leading-relaxed">
              {product.tagline}
            </p>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-3 pt-1">
              <div className="flex items-center text-amber-400">
                {'★'.repeat(5)}
              </div>
              <span className="text-xs font-mono font-semibold text-[var(--text-primary)]">
                {product.rating.toFixed(2)}
              </span>
              <span className="text-xs text-[var(--text-muted)]">
                ({product.reviewCount} Verified Client Reviews)
              </span>
            </div>
          </div>

          {/* Price Block */}
          <div className="flex items-baseline gap-3 p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[var(--text-primary)]">
              ${currentPrice.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-base font-mono line-through text-[var(--text-muted)]">
                ${originalPrice.toLocaleString()}
              </span>
            )}
            <span className="ml-auto text-xs font-mono text-emerald-500 font-semibold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> In Stock & Ready to Dispatch
            </span>
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                Finish: <strong className="text-[var(--text-primary)]">{selectedColor.name}</strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => {
                    setSelectedColor(color);
                    setSelectedImageIndex(0);
                  }}
                  className={`group flex items-center gap-2 px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                    selectedColor.name === color.name
                      ? 'border-blue-500 bg-blue-500/5 ring-1 ring-blue-500 shadow-sm'
                      : 'border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-medium)]'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-black/20 dark:border-white/20"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-xs font-medium text-[var(--text-primary)]">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Variant / Storage Selection */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)] block">
                Configuration / Edition
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedVariant?.id === variant.id
                        ? 'border-blue-500 bg-blue-500/5 ring-1 ring-blue-500 shadow-sm'
                        : 'border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-medium)]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-[var(--text-primary)]">
                      <span>{variant.name}</span>
                      <span className="font-mono">${variant.price.toLocaleString()}</span>
                    </div>
                    {variant.specsSummary && (
                      <p className="text-[11px] text-[var(--text-secondary)] mt-1">{variant.specsSummary}</p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-card)] overflow-hidden h-12">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 h-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-mono font-bold text-[var(--text-primary)]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 h-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Bag */}
              <button
                onClick={handleAddToCart}
                className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={handleWishlistToggle}
                className="h-12 w-12 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--border-medium)] flex items-center justify-center text-[var(--text-secondary)] hover:text-red-500 transition-colors cursor-pointer"
                aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>

            {/* Buy Now Direct */}
            <button
              onClick={handleBuyNow}
              className="w-full h-12 rounded-xl bg-[var(--text-primary)] text-[var(--text-inverse)] hover:opacity-90 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-opacity cursor-pointer"
            >
              <span>Buy Now · Direct Concierge Dispatch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] divide-y divide-[var(--border-subtle)] space-y-3">
            <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
              <Truck className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span>Complimentary White-Glove Courier Dispatch</span>
            </div>
            <div className="flex items-center gap-3 pt-3 text-xs text-[var(--text-secondary)]">
              <ShieldCheck className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span>2-Year Bespoke Warranty & Battery Health Guarantee</span>
            </div>
            <div className="flex items-center gap-3 pt-3 text-xs text-[var(--text-secondary)]">
              <RotateCcw className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span>30-Day Evaluation Period with Hassle-Free Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Architectural Narrative Description */}
      <div className="py-12 border-t border-[var(--border-subtle)] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-4">
          <span
            className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold block"
            style={{ color: accentColor }}
          >
            ENGINEERING NARRATIVE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Bespoke Craftsmanship & Acoustic Clarity
          </h2>
        </div>
        <div className="lg:col-span-7">
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-normal">
            {product.longDescription}
          </p>
        </div>
      </div>

      {/* Key Architectural Features */}
      <div className="py-12 border-t border-[var(--border-subtle)] space-y-8">
        <div className="space-y-2">
          <span
            className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold block"
            style={{ color: accentColor }}
          >
            CORE INNOVATIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Architectural Features
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {product.features.map((feature, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-4"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold font-mono">
                0{idx + 1}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">
                {feature.title}
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Specifications Table */}
      <div className="py-12 border-t border-[var(--border-subtle)] space-y-8">
        <div className="space-y-2">
          <span
            className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold block"
            style={{ color: accentColor }}
          >
            LABORATORY BENCHMARKS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Technical Specifications
          </h2>
        </div>

        <div className="rounded-3xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)] p-6 sm:p-10 divide-y divide-[var(--border-subtle)]">
          {product.technicalSpecs && product.technicalSpecs.length > 0 ? (
            product.technicalSpecs.map((group, gIdx) => (
              <div key={gIdx} className="py-6 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-4">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-blue-500">
                    {group.category}
                  </h3>
                </div>
                <div className="md:col-span-8 space-y-3">
                  {group.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="flex items-start justify-between text-xs py-1 border-b border-[var(--border-subtle)] last:border-0 gap-4"
                    >
                      <span className="text-[var(--text-secondary)] font-medium">{item.name}</span>
                      <span className="text-[var(--text-primary)] font-mono font-semibold text-right">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="space-y-3">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between text-xs py-2 border-b border-[var(--border-subtle)] last:border-0">
                  <span className="text-[var(--text-secondary)]">{key}</span>
                  <span className="text-[var(--text-primary)] font-mono font-bold">{val}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* What's In The Box */}
      <div className="py-12 border-t border-[var(--border-subtle)] space-y-8">
        <div className="space-y-2">
          <span
            className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold block"
            style={{ color: accentColor }}
          >
            UNBOXING CEREMONY
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            What's In The Box
          </h2>
        </div>

        <div className="p-8 rounded-3xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.inTheBox.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] text-xs text-[var(--text-primary)] font-medium"
              >
                <Check className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Client Assessments (Reviews) */}
      <div className="py-12 border-t border-[var(--border-subtle)] space-y-8">
        <div className="space-y-2">
          <span
            className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold block"
            style={{ color: accentColor }}
          >
            CLIENT ASSESSMENTS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Verified Reviews ({product.reviewCount})
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Summary Sidebar */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-6">
            <div className="text-center space-y-2">
              <span className="text-5xl font-black font-mono text-[var(--text-primary)]">
                {product.rating.toFixed(1)}
              </span>
              <div className="flex items-center justify-center text-amber-400 gap-1">
                {'★'.repeat(5)}
              </div>
              <p className="text-xs text-[var(--text-muted)]">
                Based on {product.reviewCount} certified laboratory evaluations
              </p>
            </div>

            {/* Rating Breakdown Bar Chart */}
            <div className="space-y-2 pt-4 border-t border-[var(--border-subtle)]">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = product.reviews.filter((r) => Math.round(r.rating) === stars).length;
                const percentage = product.reviews.length ? Math.round((count / product.reviews.length) * 100) : 0;
                return (
                  <button
                    key={stars}
                    onClick={() => setReviewFilter(reviewFilter === stars ? null : stars)}
                    className={`w-full flex items-center gap-3 text-xs py-1 text-left transition-opacity cursor-pointer ${
                      reviewFilter !== null && reviewFilter !== stars ? 'opacity-40' : 'opacity-100'
                    }`}
                  >
                    <span className="w-12 font-mono text-[var(--text-secondary)] flex items-center gap-1">
                      {stars} <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    </span>
                    <div className="flex-1 h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-8 text-right font-mono text-[var(--text-muted)]">{percentage}%</span>
                  </button>
                );
              })}
            </div>

            {reviewFilter !== null && (
              <button
                onClick={() => setReviewFilter(null)}
                className="w-full py-2 rounded-xl border border-[var(--border-subtle)] text-xs text-blue-500 hover:bg-[var(--bg-secondary)] cursor-pointer"
              >
                Show All Ratings
              </button>
            )}
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-8 space-y-4">
            {filteredReviews.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] text-xs text-[var(--text-muted)]">
                No reviews found for this rating filter.
              </div>
            ) : (
              filteredReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-6 rounded-2xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 font-bold flex items-center justify-center text-xs">
                        {rev.author.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[var(--text-primary)]">{rev.author}</span>
                          {rev.verified && (
                            <span className="inline-flex items-center gap-0.5 text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded-full">
                              <Check className="w-2.5 h-2.5" /> Verified
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-mono text-[var(--text-muted)]">{rev.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-amber-400 text-xs">
                      {'★'.repeat(Math.round(rev.rating))}
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-[var(--text-primary)]">{rev.title}</h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{rev.comment}</p>

                  <div className="flex items-center justify-between pt-2 text-[11px] text-[var(--text-muted)]">
                    <span>Acoustically Verified Client</span>
                    <button
                      onClick={() =>
                        setHelpfulReviews((prev) => ({
                          ...prev,
                          [rev.id]: !prev[rev.id],
                        }))
                      }
                      className={`flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors cursor-pointer ${
                        helpfulReviews[rev.id] ? 'text-blue-500' : ''
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>
                        Helpful ({rev.helpfulCount + (helpfulReviews[rev.id] ? 1 : 0)})
                      </span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="py-12 border-t border-[var(--border-subtle)] space-y-8">
        <div className="space-y-2">
          <span
            className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold block"
            style={{ color: accentColor }}
          >
            CLIENT CARE & INQUIRIES
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl space-y-3">
          {product.faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl luxury-card bg-[var(--bg-card)] border border-[var(--border-subtle)] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[var(--bg-secondary)]/50 transition-colors"
                >
                  <span className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <div className="p-1 rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)]/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Related Instruments */}
      {relatedProducts.length > 0 && (
        <div className="py-12 border-t border-[var(--border-subtle)] space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span
                className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold block mb-1"
                style={{ color: accentColor }}
              >
                COMPLEMENTARY HARMONICS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">
                Related Instruments
              </h2>
            </div>
            <button
              onClick={() => navigateToShop(product.categorySlug)}
              className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] hover:text-blue-500 transition-colors cursor-pointer"
            >
              View More in {product.category}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
